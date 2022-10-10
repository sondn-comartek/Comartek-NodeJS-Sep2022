import * as dayjs from "dayjs";
import { Migration } from "../migrations.command";

const bookData = [
  {
    bookName: "The great Gatsby",
    categoryId: "63366d9e295b2c37281eaaf9",
    chapter: 1,
    totalPage: 697,
    imageUrl: ["/home/phuctran125/Comartek/lecture10,11/Comartek-NodeJS-Sep2022/public/images/the_great_gastby_ftur.webp"],
    totalBook: 8,
    availableBook: 8,
    createdAt: dayjs().unix(),
    updatedAt: dayjs().unix()
  },
  {
    bookName: "Harry Potter and Philosopher's stone",
    categoryId: "63366fab8968afc2cb0ff4f0",
    chapter: 1,
    totalPage: 897,
    imageUrl: ["/home/phuctran125/Comartek/lecture10,11/Comartek-NodeJS-Sep2022/public/images/harry-potter-chapter-1.webp"],
    totalBook: 10,
    availableBook: 10,
    createdAt: dayjs().unix(),
    updatedAt: dayjs().unix()
  },
  {
    bookName: "Harry Potter and The chamber of Secrets",
    categoryId: "63366fab8968afc2cb0ff4f0",
    chapter: 2,
    totalPage: 486,
    imageUrl: ["/home/phuctran125/Comartek/lecture10,11/Comartek-NodeJS-Sep2022/public/images/harry-potter-chapter-2.webp"],
    totalBook: 12,
    availableBook: 12,
    createdAt: dayjs().unix(),
    updatedAt: dayjs().unix()
  },
  {
    bookName: "Harry Potter and The prisoner of Azkaban",
    categoryId: "63366fab8968afc2cb0ff4f0",
    chapter: 3,
    totalPage: 1056,
    imageUrl: ["/home/phuctran125/Comartek/lecture10,11/Comartek-NodeJS-Sep2022/public/images/harry-potter-chapter-3.webp"],
    totalBook: 15,
    availableBook: 15,
    createdAt: dayjs().unix(),
    updatedAt: dayjs().unix()
  },
  {
    bookName: "Harry Potter and The Goblet of Fire",
    categoryId: "63366fab8968afc2cb0ff4f0",
    chapter: 4,
    totalPage: 562,
    imageUrl: ["/home/phuctran125/Comartek/lecture10,11/Comartek-NodeJS-Sep2022/public/images/harry-potter-chapter-4.webp"],
    totalBook: 9,
    availableBook: 9,
    createdAt: dayjs().unix(),
    updatedAt: dayjs().unix()
  },
  {
    bookName: "Harry Potter and The Order of The Phoenix",
    categoryId: "63366fab8968afc2cb0ff4f0",
    chapter: 5,
    totalPage: 987,
    imageUrl: ["/home/phuctran125/Comartek/lecture10,11/Comartek-NodeJS-Sep2022/public/images/harry-potter-chapter-5.webp"],
    totalBook: 10,
    availableBook: 10,
    createdAt: dayjs().unix(),
    updatedAt: dayjs().unix()
  },
  {
    bookName: "Harry Potter and The Half-blood prince",
    categoryId: "63366fab8968afc2cb0ff4f0",
    chapter: 6,
    totalPage: 627,
    imageUrl: ["/home/phuctran125/Comartek/lecture10,11/Comartek-NodeJS-Sep2022/public/images/harry-potter-chapter-6.webp"],
    totalBook: 11,
    availableBook: 11,
    createdAt: dayjs().unix(),
    updatedAt: dayjs().unix()
  },
  {
    bookName: "Discrete Mathematics and Its Applications",
    categoryId: "633e41c0701ece5bda69f333",
    chapter: 1,
    totalPage: 268,
    imageUrl: ["/home/phuctran125/Comartek/lecture10,11/Comartek-NodeJS-Sep2022/public/images/discrete-math.webp"],
    totalBook: 20,
    availableBook: 20,
    createdAt: dayjs().unix(),
    updatedAt: dayjs().unix()
  },
  {
    bookName: "Programming Perl",
    categoryId: "633e41c0701ece5bda69f333",
    chapter: 1,
    totalPage: 180,
    imageUrl: ["/home/phuctran125/Comartek/lecture10,11/Comartek-NodeJS-Sep2022/public/images/perl.webp"],
    totalBook: 12,
    availableBook: 12,
    createdAt: dayjs().unix(),
    updatedAt: dayjs().unix()
  },
  {
    bookName: "Data Analytics For Beginners",
    categoryId: "633e41c0701ece5bda69f333",
    chapter: 1,
    totalPage: 225,
    imageUrl: ["/home/phuctran125/Comartek/lecture10,11/Comartek-NodeJS-Sep2022/public/images/data-analytic.webp"],
    totalBook: 9,
    availableBook: 9,
    createdAt: dayjs().unix(),
    updatedAt: dayjs().unix()
  },
  {
    bookName: "The Chaos Machine: The Inside Story of How Social Media Rewired Our Minds and Our World",
    categoryId: "633e41c0701ece5bda69f333",
    chapter: 1,
    totalPage: 567,
    imageUrl: ["/home/phuctran125/Comartek/lecture10,11/Comartek-NodeJS-Sep2022/public/images/the-chaos-machine.webp"],
    totalBook: 8,
    availableBook: 8,
    createdAt: dayjs().unix(),
    updatedAt: dayjs().unix()
  },
]

export const name = 'generate_book';
export const up = async (migration: Migration) => {
  console.log('migrate generate_book: 1665021992323-generate_book');
  await migration.bookModel.insertMany(bookData, function(error, docs) {
    if (error) console.log(error);
    console.log(docs);
  });
};
