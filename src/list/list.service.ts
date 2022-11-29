import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { List } from './entities/list.entity';
import { findAllQueryInterface } from './interfaces';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List) private readonly list: Repository<List>,
  ) {}

  // 新建
  create(createListDto: CreateListDto) {
    const data = new List();
    data.name = createListDto.name;
    data.desc = createListDto.desc;
    return this.list.save(data);
  }

  // 查询
  async findAll(query: findAllQueryInterface) {
    const data = await this.list.find({
      where: {
        name: Like(`%${query.keyWord}%`),
      },
      // 为 id 倒叙
      order: {
        id: 'DESC',
      },
      // 分页
      skip: (query.page - 1) * query.pageSize,
      take: query.pageSize,
    });
    const total = await this.list.count({
      where: {
        name: Like(`%${query.keyWord}%`),
      },
    });
    return {
      data,
      total,
    };
  }

  // 更新
  update(id: number, updateListDto: UpdateListDto) {
    return this.list.update(id, updateListDto);
  }

  // 删除
  remove(id: number) {
    return this.list.delete(id);
  }
}
