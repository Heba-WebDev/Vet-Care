import { PrismaClient, Animal } from '@prisma/client';
import { logger } from '../../../infrastructure';

class Seeder {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async seed() {
    const animalTypes: { type: Animal }[] = [
      { type: Animal.Cat },
      { type: Animal.Dog },
      { type: Animal.Horse },
      { type: Animal.Bird },
      { type: Animal.Snake },
      { type: Animal.Lizard },
      { type: Animal.Hamster },
      { type: Animal.Rat },
      { type: Animal.Rabbit },
    ];

    for (const animal of animalTypes) {
      await this.prisma.animals.upsert({
        where: { type: animal.type as Animal },
        update: {},
        create: animal,
      });
    }

    logger.info('Data has been seeded successfully.');
  }
}

const prisma = new PrismaClient();
const seeder = new Seeder(prisma);

seeder
  .seed()
  .catch((e) => {
    logger.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
