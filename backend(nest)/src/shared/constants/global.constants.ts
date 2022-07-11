import * as dotenv from "dotenv";
dotenv.config();

export const PORT = Number(process.env.PORT);
export const API_PREFIX = 'api';
export const JWT_SECRET = process.env.JWT_SECRET_KEY;
