import { IP_ADDRESS } from "#network";
import { config } from "dotenv";

config();

export const serverConfiguration = {
    PORT: process.env.PORT,
    ip: IP_ADDRESS || "localhost"
};