import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt'

const prisma = new PrismaClient();

async function seed() {
    const counter = await prisma.counter.create({
        data: {
            name: 'MemberReg',
            number: 1
        }
    })

    const currentYear = new Date().getFullYear()
    const salt = await bcrypt.genSalt(Number(process.env.NEXT_PUBLIC_HASH_SALT))
    const newPassword = `new@${currentYear}`
    const hashPassword = bcrypt.hashSync(newPassword, salt)

    const user = await prisma.user.create({
        data: {
            regId: "",
            email: "admin@nia-kd.com",
            password: hashPassword,
            role: "ADMINISTRATOR"
        }
    })

    const formFields = await prisma.formDesign.createMany({
        data: [
            {
                name: 'firstName',
                label: 'First name',
                type: 'text',
                required: true
            },
            {
                name: 'lastName',
                label: 'Last name',
                type: 'text',
                required: true
            },
            {
                name: 'phoneNumber',
                label: 'Phone number',
                type: 'text',
                required: true
            },
            {
                name: 'gender',
                label: 'Gender',
                type: 'select',
                required: true
            },
            {
                name: 'email',
                label: 'Email address',
                type: 'email',
                required: true
            },
        ]
    })

    const membershipType = await prisma.membershipType.createMany({
        data: [
            {
                name: "Student"
            },
            {
                name: "Graduate"
            },
            {
                name: "Technologist"
            },
            {
                name: "Associate"
            },
            {
                name: "Full Member"
            },
            {
                name: "Fellow"
            }
        ]
    })

    console.log({ counter, user, formFields, membershipType })
}

// Run the seed function
seed().then(async () => {
    await prisma.$disconnect()
}).catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})