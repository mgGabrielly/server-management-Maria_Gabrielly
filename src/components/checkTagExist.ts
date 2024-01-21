import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function checkTagExist(name: string): Promise<boolean> {
    try {
        const tagExist = await prisma.tag.findFirst({
            where: { name },
        });

        return !!tagExist;
    } catch (error) {
        throw new Error("Erro ao verificar existência.");
    }
}