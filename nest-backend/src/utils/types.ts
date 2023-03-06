import { Types } from 'mongoose';

export type UserResponse = {
  _id: Types.ObjectId;
  username: string;
};

export type JwtPayload = {
  sub: Types.ObjectId;
  username: string;
};
