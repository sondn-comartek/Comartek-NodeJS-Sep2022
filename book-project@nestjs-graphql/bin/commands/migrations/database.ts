import { v4 } from 'uuid'

import { genCode } from 'src/ultils'
export const database = {
   userData: [
      {
         userid: v4(),
         username: 'dung1',
         hash: '$argon2id$v=19$m=4096,t=3,p=1$t4RU6yVWx+p5wZfAZxP5tQ$i+3nOgpPp/EMtii3jPGZYmx5fn8Rr/rPvOfYyVUk7UY',
         role: 'superadmin',
         email: 'dung1@gmail.com',
      },
      {
         userid: v4(),
         username: 'dung2',
         hash: '$argon2id$v=19$m=4096,t=3,p=1$t4RU6yVWx+p5wZfAZxP5tQ$i+3nOgpPp/EMtii3jPGZYmx5fn8Rr/rPvOfYyVUk7UY',
         role: 'superadmin',
         email: 'dung2@gmail.com',
      },
   ],
   bookData: [
      {
         bookid: v4(),
         title: 'Harry potter',
         code: genCode('Harry potter 1'),
         categories: ['anime', 'action', 'cute'],
         part: 1,
         page_count: 200,
         count_avaiable: 10,
      },
      {
         bookid: v4(),
         title: 'THE GOD FATHER',
         code: genCode('THE GOD FATHER 1'),
         categories: ['anime', 'action', 'cute', 'meme'],
         part: 1,
         page_count: 200,
         count_avaiable: 10,
      },
      {
         bookid: v4(),
         title: 'Bat tre dong xanh',
         code: genCode('Bat tre dong xanh 1'),
         categories: ['anime', 'action', 'fun'],
         part: 1,
         page_count: 200,
         count_avaiable: 10,
      },
      {
         bookid: v4(),
         title: 'Ong gia va bien ca',
         code: genCode('Ong gia va bien ca 1'),
         categories: ['anime', 'action', 'gangster'],
         part: 1,
         page_count: 200,
         count_avaiable: 10,
      },
   ],
   categoryData: [
      {
         name: 'anime',
         code: genCode('anime'),
      },
      {
         name: 'action',
         code: genCode('action'),
      },
      {
         name: 'gangster',
         code: genCode('gangster'),
      },
      {
         name: 'fun',
         code: genCode('fun'),
      },
      {
         name: 'cute',
         code: genCode('cute'),
      },
      {
         name: 'meme',
         code: genCode('meme'),
      },
   ],
}
