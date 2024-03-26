import jwt, { JwtPayload } from "jsonwebtoken";

const generateJwt = async (payload: JwtPayload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY as string, {
        expiresIn: process.env.JWT_REFRESH_EXPIRATION,
    });
    return token;
}


export { generateJwt }
