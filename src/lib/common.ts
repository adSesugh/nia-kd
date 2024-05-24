import S3 from 'aws-sdk/clients/s3';
import jwt from 'jsonwebtoken'

export enum Role {
    MEMBER = "MEMBER",
    ADMINISTRATOR = "ADMINISTRATOR"
}

export const membershipType = [
    {
        id: "Student",
        name: "Student"
    },
    {
        id: "Graduate",
        name: "Graduate"
    },
    {
        id: "Technologist",
        name: "Technologist"
    },
    {
        id: "Associate",
        name: "Associate"
    },
    {
        id: "Full Member",
        name: "Full Member"
    },
    {
        id: "Fellow",
        name: "Fellow"
    }
]

export const modelStatus = [
    {
        id: 'draft',
        name: "Draft"
    },
    {
        id: 'published',
        name: 'Published'
    }
]

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
    const token = jwt.sign({ userId }, 'secret', { expiresIn: '30m' });
    return token;
};

export function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// export const convertGuidToInt = (id: any) => {
//     // parse accountId into Uint8Array[16] variable
//     let parsedUuid = uuid.parse(id);

//     // convert to integer - see answers to https://stackoverflow.com/q/39346517/2860309
//     let buffer = Buffer.from(parsedUuid);
//     console.log(`parsed uuid converted to buffer`);
//     let result = buffer.readUInt32BE(0);
//     console.log(`buffer converted to integer ${result} successfully`);

//     return result;
// }