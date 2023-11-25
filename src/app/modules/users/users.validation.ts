import Joi from 'joi';

const NameSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
});

const AddressSchema = Joi.object({
  street: Joi.string(),
  city: Joi.string(),
  country: Joi.string(),
});

const OrderSchema = Joi.object({
  productName: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
});

const UserValidationSchema = Joi.object({
  userId: Joi.number(),
  username: Joi.string(),
  password: Joi.string(),
  fullName: NameSchema,
  age: Joi.number(),
  email: Joi.string().email(),
  isActive: Joi.boolean(),
  hobbies: Joi.array().items(Joi.string()).required(),
  address: AddressSchema,
  orders: Joi.array().items(OrderSchema),
});

export default UserValidationSchema;
