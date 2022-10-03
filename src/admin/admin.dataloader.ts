import * as DataLoader from 'dataloader';
import { Injectable } from '@nestjs/common';
import { NestDataLoader } from 'nestjs-dataloader';
import { User } from 'src/schema/user.schema';
import { AdminService } from './admin.service';
import {  } from 'src/schema/book.schema';
import { BookOutPut, UserOutPut } from './entities/admin.output';

@Injectable()
export class UserLoader implements NestDataLoader<string, User> {
  constructor(private readonly adminService: AdminService) { }
  
  generateDataLoader(): DataLoader<string, UserOutPut> {
    return new DataLoader<string, UserOutPut>(async (keys): Promise<UserOutPut[]> => {
      const users = await this.adminService.getUserByIds(keys)
      const books = await this.adminService.findBookUserBorrow(keys)
      return keys.map((key): UserOutPut => {
          let user: User;
          for(let i = 0; i < users.length; i++) {
            if(users[i].id === key) {
              user = users[i];
              break;
            }
          }
          let borrowBook: BookOutPut[] = []
          if(user) {
            for(let i = 0 ; i < books.length ; i++) {
              if(books[i].userborrow === key) {
                borrowBook.push({
                  id: books[i].id,
                  name: books[i].name
                })
              }
            } 
            return {
              username: user.username,
              firstname: user.firstname,
              lastname: user.lastname,
              phone: user.phone,
              borrowBook: borrowBook
            }
          }
          return null
      })

    })
  }
}


