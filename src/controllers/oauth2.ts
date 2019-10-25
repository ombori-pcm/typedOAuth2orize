import oauth2orize from "oauth2orize";
import Trainer from "../models/trainer";
import Client from "../models/client";
import Token from "../models/token";
import Code from "../models/code";
import { uid } from "../utils/common";

// Create OAuth 2.0 server
const server = oauth2orize.createServer();

// Register serialialization function
server.serializeClient((client, callback) => {
    return callback(null, client._id);
});

// Register deserialization function
server.deserializeClient((id, callback) => {
    Client.findOne({ _id: id }, (err, client) => {
        if (err) { return callback(err); }
        return callback(null, client);
    });
});

// Register authorization code grant type
server.grant(oauth2orize.grant.code((client, redirectUri, user, ares, callback) => {
    // Create a new authorization code
    const code = new Code({
        value: uid(16),
        clientId: client._id,
        redirectUri,
        trainerId: user._id
    });

    // Save the auth code and check for errors
    code.save((err) => {
        if (err) { return callback(err); }

        callback(null, code.value);
    });
}));

// Exchange authorization codes for access tokens
server.exchange(oauth2orize.exchange.code((client, code, redirectUri, callback) => {
    Code.findOne({ value: code }, (codeErr, authCode) => {
        if (codeErr) { return callback(codeErr); }
        if (authCode === undefined) { return callback(null, false); }
        if (client._id.toString() !== authCode.clientId) { return callback(null, false); }
        if (redirectUri !== authCode.redirectUri) { return callback(null, false); }

        // Delete auth code now that it has been used
        authCode.remove((removeErr) => {
        if (removeErr) { return callback(removeErr); }

        // Create a new access token
        const newToken = new Token({
            value: uid(256),
            clientId: authCode.clientId,
            trainerId: authCode.trainerId
        });

        // Save the access token and check for errors
        newToken.save((saveErr) => {
            if (saveErr) { return callback(saveErr); }

            callback(null, newToken.value);
        });
        });
    });
}));

// User authorization endpoint
export const authorization = [
    server.authorization((clientId, redirectUri, callback) => {

        Client.findOne({ id: clientId }, (err, client) => {
            if (err) { return callback(err); }
            return callback(null, client, redirectUri);
        });
    }),
    (req, res) => {
        res.render("dialog", { transactionID: req.oauth2.transactionID, trainer: req.user, client: req.oauth2.client });
    }
];

// User decision endpoint
export const decision = [
    server.decision()
];

// Application client token exchange endpoint
export const token = [
    server.token(),
    server.errorHandler()
];
