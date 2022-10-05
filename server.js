const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const userCreated = await prisma.user.create({
    data: {
      name: 'Chris',
      email: 'Chris@prisma.io',
      posts: {
        create: { title: 'Hello from Chris' },
      },
      profile: {
        create: { bio: 'I like sports' },
      },
    },
  });
  console.log(userCreated);

  const post = await prisma.post.update({
    where: { id: 3 },
    data: { published: true },
  });
  console.log(post);

  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  });

  console.dir(allUsers, { depth: null });
}

main()
  .then(async () => {
    await prisma.$disconnect;
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
