import { PrismaClient } from '@prisma/client';

interface CustomerData {
    name:   string;
    email:  string;
    tags?: string[];
}

export class Customer {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async createCustomer(customerData: CustomerData): Promise<any> {
        try {
            const customer = await this.prisma.customer.create({
                data: {
                    ...customerData,
                    Tags: {
                        create: customerData.tags?.map((tag) => ({ name: tag })) || [],
                    },
                },
            });
            return customer;
        } catch (error) {
            throw new Error(`Erro ao criar: ${error}`);
        }
    }

    async updateCustomer(customerData: CustomerData, customerId: string): Promise<any> {
        try {
            const customer = await this.prisma.customer.update({
                data: {
                    ...customerData,
                    Tags: {
                        create: customerData.tags?.map((tag) => ({ name: tag })) || [],
                    },
                },
                where: {
                    id: customerId,
                },
            });
            return customer;
        } catch (error) {
            throw new Error(`Erro ao criar: ${error}`);
        }
    }

    async listAllCustomers(): Promise<any[]> {
        try {
            const customers = await this.prisma.customer.findMany({
                include: {
                    Tags: true, 
                },
            });
            return customers;
        } catch (error) {
            throw new Error(`Erro ao listar: ${error}`);
        }
    }

    async listCustomer(customerId: string): Promise<any | null> {
        try {
            const customer = await this.prisma.customer.findUnique({
                where: {
                    id: customerId,
                },
                include: {
                    Tags: true, 
                },
            });
            return customer ? [customer] : [];
        } catch (error) {
            throw new Error(`Erro ao listar: ${error}`);
        }
    }

    async deleteCustomer(customerId: string): Promise<void> {
        try {
            await this.prisma.customer.delete({
                where: {
                    id: customerId,
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