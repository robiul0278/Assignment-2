import { z } from 'zod';

const UserValidationSchema = z.object({
  userId: z.number().positive('UserId must be a positive number'),
  username: z.string().min(3, 'username must be 3 characters'),
  password: z.string().min(6, 'password must be 6 characters'),
  fullName: z.object({
    firstName: z.string(),
    lastName: z.string(),
  }),
  age: z.number().positive('Age must be a positive number'),
  email: z.string().email('Invalid email address'),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: z.object({
    street: z.string(),
    city: z.string(),
    country: z.string(),
  }),
  orders: z
    .array(
      z.object({
        productName: z.string(),
        price: z.number().positive('Price must be a positive number'),
        quantity: z.number().positive('Quantity must be a positive number'),
      }),
    )
    .optional(),
});


export default UserValidationSchema;
