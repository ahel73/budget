import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CategoryService } from 'src/category/category.service';
import { TransactionService } from 'src/transaction/transaction.service';

@Injectable()
export class AuthorGuard implements CanActivate {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly categoryService: CategoryService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log('request.params', request.params);
    const { id, type } = request.params;
    console.log('id', id, 'type', type);

    let entity;

    switch (type) {
      case 'transaction':
        entity = await this.transactionService.findOne(id);
        console.log('transaction entity', entity);
        break;
      case 'category':
        entity = await this.categoryService.findOne(id);
        console.log('category entity', entity);
        break;
      default:
        console.log('Нет запрашиваемой категории!!!!');
        throw new NotFoundException(`Нет запрашиваемой категории`);
    }

    const user = request.user;
    console.log('user', user);

    if (entity && user && entity.user.id === user.id) {
      return true;
    }

    throw new BadRequestException(`Вы не имеете право на совершение этих действий`);
  }
}
