import express from 'express';
import { CustomerController } from '../controllers/customerController';

const customerRouter = express.Router();
const customerController = new CustomerController();

customerRouter.post('/create-customer', customerController.createCustomer.bind(customerController));
customerRouter.get('/customers', customerController.getAllCustomers.bind(customerController));
customerRouter.put('/update-customer/:id', customerController.updateCustomer.bind(customerController));
customerRouter.get('/customer/:id', customerController.getCustomer.bind(customerController));
customerRouter.delete('/delete-customer/:id', customerController.deleteCustomer.bind(customerController));

export default customerRouter;