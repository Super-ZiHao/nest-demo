import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'chris',
      password: 'secret',
    },
    {
      userId: 3,
      username: 'maria',
      password: 'guess',
    },
    {
      userId: 4,
      username: '1',
      password: '2',
    },
  ];

  // 因为这边一般是通过 数据库 搜索用户，所以是异步的
  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
