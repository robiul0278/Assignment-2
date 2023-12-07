import { Schema, model } from 'mongoose';
import { Address, Name, User, Orders } from './users/users.interface';
import config from '../config';
import bcrypt from 'bcrypt'

const NameSchema = new Schema<Name>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});


const AddressSchema = new Schema<Address>({
  street: { type: String },
  city: { type: String },
  country: { type: String },
});

const OrderSchema = new Schema<Orders>(
  {
    productName: { type: String },
    price: { type: Number },
    quantity: { type: Number },
  }
);

const userSchema = new Schema<User>({
  userId: { type: Number },
  username: { type: String },
  password: { type: String },
  fullName: NameSchema,
  age: { type: Number },
  email: { type: String },
  isActive: { type: Boolean },
  hobbies: {
    type: [String],
    required: true,
  },
  address: AddressSchema,
  orders: [OrderSchema],
});


userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

export const userModel = model<User>('Users', userSchema);
