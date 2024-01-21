import { PrismaClient } from '@prisma/client';

interface TagData {
    name:   string;
}

export class Tag {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async createTag(tagData: TagData): Promise<any> {
        try {
            const tag = await this.prisma.tag.create({
                data: {
                ...tagData,
                },
            });
            return tag;
        } catch (error) {
            throw new Error(`Erro ao criar: ${error}`);
        }
    }

    async updateTag(tagData: TagData, tagId: string): Promise<any> {
        try {
            const tag = await this.prisma.tag.update({
                data: {
                    ...tagData,
                },
                where: {
                    id: tagId,
                },
            });
            return tag;
        } catch (error) {
            throw new Error(`Erro ao criar: ${error}`);
        }
    }

    async listAllTags(): Promise<any[]> {
        try {
            const tags = await this.prisma.tag.findMany();
            return tags;
        } catch (error) {
            throw new Error(`Erro ao listar: ${error}`);
        }
    }

    async listTag(tagId: string): Promise<any | null> {
        try {
            const tag = await this.prisma.tag.findUnique({
                where: {
                    id: tagId,
                }
            });
            return tag ? [tag] : [];
        } catch (error) {
            throw new Error(`Erro ao listar: ${error}`);
        }
    }

    async deleteTag(tagId: string): Promise<void> {
        try {
            await this.prisma.tag.delete({
                where: {
                    id: tagId,
                },
            });
        } catch (error) {
            throw new Error(`Erro ao deletar: ${error}`);
        }
    }

    async disconnect(): Promise<void> {
        await this.prisma.$disconnect();
    }
}