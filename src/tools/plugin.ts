import {Schema} from 'mongoose';

const { ObjectId } = Schema.Types;

export default (schema) => {
  schema.add({ modifiedBy: ObjectId });
  schema.add({ createdBy: ObjectId });
  schema.add({ createdAt: { type: Date, default: Date.now, required: true } });
  schema.add({ updatedAt: { type: Date, default: Date.now, required: true } });

  schema.pre('save', (next) => {
    this.updatedAt = Date.now();
    next();
  });
};
