import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    DATABASE_URL: get('DATABASE_URL').required().asString(),
    JWT_SECRET_KEY: get('JWT_SECRET_KEY').required().asString(),
    JWT_REFRESH_EXPIRATION: get('JWT_REFRESH_EXPIRATION').required().asString(),
    HOST: get('HOST').required().asString(),
    EMAIL_USER: get('EMAIL_USER').required().asString(),
    EMAIL_PASS: get('EMAIL_PASS').required().asString(),
    STRIPE_SECRET_KEY: get('STRIPE_SECRET_KEY').required().asString(),
    STRIPE_PUBLIC_KEY: get('STRIPE_PUBLIC_KEY').required().asString(),
    STRIPE_ENDPOINT_SECRET: get('STRIPE_ENDPOINT_SECRET').required().asString(),
};
