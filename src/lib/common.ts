import S3 from 'aws-sdk/clients/s3';
import jwt from 'jsonwebtoken'

export enum Role {
    MEMBER = "MEMBER",
    ADMINISTRATOR = "ADMINISTRATOR"
}

export const getUserIdFromToken = (token: string) => {
    if (!token) {
        return null;
    }

    try {
        const extractToken = token.split(" ")[1]
        const secret = process.env.NEXT_PUBLIC_JWT_SECRET as string
        const decodedToken: any = jwt.verify(extractToken, secret);
        return decodedToken.userId;
    } catch (error) {
        return null;
    }
};

export const authenticateUser = (userId: string) => {
    const token = jwt.sign({ userId }, 'secret', { expiresIn: '3m' });
    return token;
};