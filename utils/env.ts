import dotenv from "dotenv";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const envPaths = [
  path.resolve(__dirname, "../.github/.env"),
  path.resolve(__dirname, "../.env"),
];
const fileEnvironment: Record<string, string> = {};

for (const envPath of envPaths) {
  if (existsSync(envPath)) {
    Object.assign(fileEnvironment, dotenv.parse(readFileSync(envPath)));
  }
}

function requiredEnvironmentVariable(name: string): string {
  // Windows defines USERNAME for the OS account, so prefer the configured test user.
  const value =
    name === "USERNAME"
      ? process.env.PLAYWRIGHT_USERNAME?.trim() ?? fileEnvironment[name]?.trim()
      : process.env[name]?.trim() ?? fileEnvironment[name]?.trim();
  if (!value) {
    const overrideHint =
      name === "USERNAME" ? " or set PLAYWRIGHT_USERNAME" : "";
    throw new Error(
      `Missing required environment variable "${name}". Define it in .env or .github/.env${overrideHint}.`,
    );
  }
  return value;
}

const baseURL = requiredEnvironmentVariable("BASE_URL");
let parsedBaseURL: URL;

try {
  parsedBaseURL = new URL(baseURL);
} catch {
  throw new Error('Environment variable "BASE_URL" must be a valid URL.');
}

if (parsedBaseURL.protocol !== "http:" && parsedBaseURL.protocol !== "https:") {
  throw new Error(
    'Environment variable "BASE_URL" must use the http or https protocol.',
  );
}

export const environment = {
  baseURL,
  username: requiredEnvironmentVariable("USERNAME"),
  password: requiredEnvironmentVariable("PASSWORD"),
};
