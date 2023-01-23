import { DataSource, Repository } from "typeorm";

import { Injectable } from "@nestjs/common";

import { User } from "./user.entity";

@Injectable()
export class UserService {
  private userRepo: Repository<User>;

  constructor(readonly dataSource: DataSource) {
    this.userRepo = this.dataSource.getTreeRepository(User);
    this.initRepo();
  }

  async initRepo() {
    const list = this.userRepo.create([
      { firstName: 'Val', lastName: 'Neekman', email: 'val@neekman.com' },
      { firstName: 'Mike', lastName: 'Tyson', email: 'mike@tyson.com' },
    ]);
    const newList = await this.userRepo.save(list);
    console.log('Created', newList);
    this.findAll();
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepo.find();
    console.log('Fetched', users);
    return users;
  }
}
