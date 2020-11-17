/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
/* eslint-disable spaced-comment */
/* eslint-disable prettier/prettier */
import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
public async getBalance(): Promise<Balance> {
    const transactions = await this.find();

    const {income, outcome} = transactions.reduce((accumulator, transaction) =>{
      switch (transaction.type) {
        case "income":
          // eslint-disable-next-line no-param-reassign
          accumulator.income += Number(transaction.value);
          break;
          
          case "outcome":
            // eslint-disable-next-line no-param-reassign
            accumulator.outcome += Number(transaction.value);
            break;

            default:
              break;         

      }
      return accumulator;
    },
    {
      income:0,
      outcome:0,
      total:0,
    },
    ); 
      const total = income - outcome;
      return {income , outcome, total};
  }
}

export default TransactionsRepository;
