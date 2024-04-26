import S3 from 'aws-sdk/clients/s3';
import jwt from 'jsonwebtoken'

export const getUserIdFromToken = (token: string) => {
    if (!token) {
        return null;
    }

    try {
        const secret = process.env.NEXT_PUBLIC_JWT_SECRET as string
        const decodedToken: any = jwt.verify(token, secret);
        return decodedToken.userId;
    } catch (error) {
        return "Invalid token!";
    }
};

export const authenticateUser = (userId: string) => {
    const token = jwt.sign({ userId }, 'secret', { expiresIn: '7 days' });
    return token;
};