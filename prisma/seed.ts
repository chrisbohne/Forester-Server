import { PrismaClient } from '.prisma/client';
import { users, trees } from '../data';

const prisma = new PrismaClient();

async function main() {
  for (const user of users) {
    await prisma.user.create({ data: user });
  }
  for (const tree of trees) {
    await prisma.tree.create({ data: tree });
  }
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
