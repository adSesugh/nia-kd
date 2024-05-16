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
    console.log({ counter })

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
}

// Run the seed function
seed().then(async () => {
    await prisma.$disconnect()
}).catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})