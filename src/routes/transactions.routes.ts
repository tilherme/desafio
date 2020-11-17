/* eslint-disable prettier/prettier */
import  multer from 'multer';
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { request, response, Router } from 'express';
import {getCustomRepository, } from 'typeorm';

 // eslint-disable-next-line @typescript-eslint/no-unused-vars
 import TransactionsRepository from '../repositories/TransactionsRepository';
 import CreateTransactionService from '../services/CreateTransactionService';
import DeleteTransactionService from '../services/DeleteTransactionService';
import ImportTransactionsService from '../services/ImportTransactionsService';
import uploadConfig from '../config/upload';

const upload = multer(uploadConfig); 

const transactionsRouter = Router();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
transactionsRouter.get('/', async (request, response) => {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const transactions = await transactionsRepository.find();
    const balance = await transactionsRepository.getBalance()

    return response.json({transactions, balance});
});

transactionsRouter.post('/', async (request, response) => {
  const {title, value, type, category} = request.body;

  const createTransaction = new CreateTransactionService();
  
  const transaction = await createTransaction.execute({
    title,
     value, 
     type,
    category,
    });
  
  return response.json(transaction);
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
transactionsRouter.delete('/:id', async (request, response) => {
  const {id} = request.params;
  
  const deleteTransaction = new DeleteTransactionService();
  
  await deleteTransaction.execute(id);

  return response.status(204).send()
});

transactionsRouter.post('/import', upload.single('file'),
async (request, response) => {
  const importTransactions = new ImportTransactionsService();

  const transactions = await importTransactions.execute(request.file.path);

  return response.json(transactions);

  
});

export default transactionsRouter;
