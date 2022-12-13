import jwt from "jsonwebtoken";

const SECRET = process.env.SECRET || "changme";

export function singJwt(data: object) {
  return jwt.sign(data, SECRET);
}

export function verify<T>(token: string) {
  return jwt.verify(token, SECRET) as T;
}
