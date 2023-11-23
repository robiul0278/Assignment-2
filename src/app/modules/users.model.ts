import { Schema, model } from 'mongoose';
import { Address, Name, User, Orders } from './users/users.interface';

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

const OrderSchema = new Schema<Orders>([
  {
    productName: { type: String },
    price: { type: Number },
    quantity: { type: Number },
  }
]);

const OrderDataSchema = new Schema<User>({
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

export const userModel = model<User>('Users', OrderDataSchema);
