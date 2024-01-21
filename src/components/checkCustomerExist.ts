import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function checkCustomerExist(name: string, email: string): Promise<boolean> {
    try {
        const customerExist = await prisma.customer.findFirst({
            where: { name, email },
        });

        return !!customerExist;
    } catch (error) {
        throw new Error("Erro ao verificar existência.");
    }
}