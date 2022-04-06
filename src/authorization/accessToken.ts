import { sign } from "jsonwebtoken";
import { User } from "../entity/User";

export const createAccessToken = (user: User) =>
  sign({ userId: user.id }, process.env.SECRET!, {
    expiresIn: "15m",
  });
