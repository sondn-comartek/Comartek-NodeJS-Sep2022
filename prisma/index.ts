import { Prisma, PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { Role } from 'src/modules/user/enums/roles.enum';
const prisma = new PrismaClient();

async function main() {
  // Connect the client
  await prisma.$connect();
  // ... you will write your Prisma Client queries here
  const allBooks = await prisma.users.create({
    data: {
      v: 0,
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: 0,
      createdAt: '1970-01-01T00:00:00.000Z',
      updatedAt: '1970-01-01T00:00:00.000Z',
    },
  });
  console.log(allBooks);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
