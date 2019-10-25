export const uid = (length: number) => {
    const buf = [];
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charlen = chars.length;

    for (let i = 0; i < length; ++i) {
      buf.push(chars[getRandomInt(0, charlen - 1)]);
    }

    return buf.join("");
  };

const getRandomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
