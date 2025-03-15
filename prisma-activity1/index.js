const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // 1. Create an Account and Profile together
  const newAccount = await prisma.account.create({
    data: {
      email: "Iniackie118@gmail.com",
      password: "password123",
      profile: {
        create: {
          firstName: "Iniackie Franz",
          lastName: "Sumandal",
          bio: "This is Iniackie Franz",
        },
      },
    },
    include: {
      profile: true,
    },
  });

  console.log("Created Account with Profile:", newAccount);

  // 2. Add Modules to an Existing Account
  const addedModule = await prisma.module.create({
    data: {
      moduleName: "Module 101",
      description: "Introduction to Modules",
      accountId: newAccount.id,
    },
  });

  console.log("Added Module:", addedModule);

  // 3. Retrieve Accounts with Profiles and Modules
  const accounts = await prisma.account.findMany({
    include: {
      profile: true,
      modules: true,
    },
  });

  console.log(
    "All Accounts with Profiles and Modules:",
    JSON.stringify(accounts, null, 2)
  );
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
