import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { List } from './entities/list.entity';

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
  findAll(query: { keyWord: string }) {
    return this.list.find({
      where: {
        name: Like(`%${query.keyWord}%`),
      },
    });
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
