import { Request, Response } from 'express';
import { Customer } from '../models/customer.model';
import { PrismaClient } from '@prisma/client';
import { checkCustomerExist } from '../components/checkCustomerExist';

const prisma = new PrismaClient();

export class CustomerController {
    private customerModel: Customer;

    constructor() {
        this.customerModel = new Customer();
    }

    async createCustomer(req: Request, res: Response): Promise<void> {
        try {
            const { name, email, tags } = req.body;

            const customerExist = await checkCustomerExist( name, email );
            if (customerExist) {
                res.status(405).json( "O cliente já é cadastrado." );
                return;
            } 

            const customertData = { name, email, tags };
            const customer = await this.customerModel.createCustomer(customertData);
            res.status(201).json(customer);
        } catch (error) {
            res.status(500).json({ error: `Erro ao criar: ${error}` });
        }
    }

    async updateCustomer(req: Request, res: Response): Promise<void> {
        try {
            const { name, email, tags } = req.body;
            const customerId = req.params.id;

            const customerExist = await this.customerModel.listCustomer(customerId);
            if (!customerExist) {
                res.status(404).json( "O cliente não foi encontrado." );
                return;
            } 

            const customertData = { name, email, tags };
            const customer = await this.customerModel.updateCustomer(customertData, customerId);
            res.status(200).json(customer);
        } catch (error) {
            res.status(500).json({ error: `Erro ao atualizar: ${error}` });
        }
    }

    async getAllCustomers(req: Request, res: Response): Promise<void> {
        try {
            const customers = await this.customerModel.listAllCustomers();
            res.status(200).json(customers);
        } catch (error) {
            res.status(500).json({ error: `Erro ao listar: ${error}` });
        }
    }

    async getCustomer(req: Request, res: Response): Promise<void> {
        try {
            const customerId = req.params.id;
            const customer = await this.customerModel.listCustomer(customerId);
            res.status(200).json(customer);
        } catch (error) {
            res.status(500).json({ error: `Erro ao listar: ${error}` });
        }
    }

    async deleteCustomer(req: Request, res: Response): Promise<void> {
        try {
            const customerId = req.params.id;
            await this.customerModel.deleteCustomer(customerId);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: `Erro ao deletar: ${error}` });
        }
    }

}