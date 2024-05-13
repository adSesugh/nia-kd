import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function seed() {
    const counter = await prisma.counter.create({
        data: {
            name: 'MemberReg',
            number: 1
        }
    })
    console.log({ counter })
}

// Run the seed function
seed().then(async () => {
    await prisma.$disconnect()
}).catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})