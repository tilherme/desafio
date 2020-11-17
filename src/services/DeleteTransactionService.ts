/* eslint-disable prettier/prettier */
import {getCustomRepository} from 'typeorm';

import AppError from '../errors/AppError';

 // eslint-disable-next-line @typescript-eslint/no-unused-vars
 import Transaction from '../models/Transaction';

  // eslint-disable-next-line import/newline-after-import
  import TransactionsRepository from '../repositories/TransactionsRepository'
class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const transaction = await transactionsRepository.findOne(id);

    if(!transaction) {
      throw new AppError('Transaction does not exist')
    }

   await transactionsRepository.remove(transaction);
  }
}

export default DeleteTransactionService;
