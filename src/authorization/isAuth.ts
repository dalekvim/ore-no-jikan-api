import { verify } from "jsonwebtoken";
import { Payload } from "./type/Payload";

// Expects authorization in the format: bearer AUTH_TOKEN

export const isAuth = (authorization: string): Payload => {
  try {
    const token = authorization!.split(" ")[1];
    const payload = verify(token, process.env.SECRET!);
    return payload as Payload;
  } catch {
    throw new Error("Not Authenticated.");
  }
};
