import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async create(createTransactionDto: CreateTransactionDto, id: number) {
    const newTransaction = {
      title: createTransactionDto.title,
      amount: createTransactionDto.amount,
      type: createTransactionDto.type,
      user: { id },
      category: { id: +createTransactionDto.category },
    };

    if (!newTransaction) {
      throw new BadRequestException(`Не удалось создать тразакцию`);
    }

    return await this.transactionRepository.save(newTransaction);
  }

  async findAll(id: number) {
    const transactions = await this.transactionRepository.find({
      where: {
        user: { id },
      },
      order: {
        createdAt: 'DESC',
      },
    });
    return transactions;
  }

  async findOne(id: number) {
    const transaction = await this.transactionRepository.find({
      where: {
        user: { id },
      },
      relations: {
        user: true,
        category: true,
      },
    });

    if (!transaction.length) {
      throw new NotFoundException('запрашиваемой транзакции не существует');
    }

    return transaction;
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    const transaction = await this.transactionRepository.find({
      where: {
        user: { id },
      },
    });

    if (!transaction) {
      throw new NotFoundException('запрашиваемой транзакции не существует');
    }
    return await this.transactionRepository.update(id, updateTransactionDto);
  }

  async remove(id: number) {
    const transaction = await this.transactionRepository.find({
      where: {
        user: { id },
      },
    });

    if (!transaction) {
      throw new NotFoundException('запрашиваемой транзакции не существует');
    }
    return await this.transactionRepository.delete(id);
  }

  async findAllWithPagination(id: number, page = 1, limit = 2) {
    return await this.transactionRepository.find({
      where: {
        user: { id },
      },
      relations: {
        user: true,
        category: true,
      },
      order: {
        createdAt: 'DESC',
      },
      take: limit,
      skip: (page - 1) * limit,
    });
  }
}
