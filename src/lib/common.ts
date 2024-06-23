
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

export const membershipGroup = ['Associate', 'Fellow', 'Full Member', 'Graduate', 'Student',  'Technologist']

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
    const token = jwt.sign({ userId }, 'secret', { expiresIn: '120m' });
    return token;
};

export function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function combineDateTime(dateString: string, timeString: string) {
    const date = new Date(dateString);
    const [hours, minutes] = timeString.split(':').map(Number);

    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    date.setMilliseconds(0);

    return date.toISOString();
}
