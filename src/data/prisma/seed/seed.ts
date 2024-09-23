import { PrismaClient, Animal, Permission, Gender, Day } from '@prisma/client';
import { Title } from '../enums';
import { logger } from '../../../infrastructure';
import { bcryptAdapter } from '../../../config';

class Seeder {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async seed() {
    // Animal
    const animalCount = await this.prisma.animals.count();
    if (animalCount === 0) {
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
        await this.prisma.animals.create({
          data: animal,
        });
      }
      logger.info('Animals table has been seeded successfully.');
    } else {
      logger.info('Animals table already contains data.');
    }

    // Permissions
    const permissionCount = await this.prisma.permissions.count();
    if (permissionCount === 0) {
      const permissionTypes = [{ type: Permission.Staff }, { type: Permission.Admin }];

      for (const permission of permissionTypes) {
        await this.prisma.permissions.create({
          data: permission,
        });
      }
      logger.info('Permissions table has been seeded successfully.');
    } else {
      logger.info('Permissions table already contains data.');
    }

    // Jobs
    const jobsCount = await this.prisma.jobs.count();
    if (jobsCount === 0) {
      const jobTitles = [
        { title: Title.Receptionist },
        { title: Title.HR },
        { title: Title.Manager },
        { title: Title.Veterinarian },
        { title: Title.Asistant },
        { title: Title.Technician },
      ];

      for (const job of jobTitles) {
        await this.prisma.jobs.create({
          data: job,
        });
      }
      logger.info('Jobs table has been seeded successfully.');
    } else {
      logger.info('Jobs table already contains data.');
    }

    // Staff
    const staffCount = await this.prisma.staff.count();
    if (staffCount === 0) {
      const staffMembers = [
        {
          name: 'Heba',
          job_title: Title.HR,
          permission_type: Permission.Admin,
          email: 'heba@gmail.com',
          password: await bcryptAdapter.hash(process.env.SEEDING_PASSWORD as string),
          phone_number: '1234567890',
          verified: true,
        },
      ];

      for (const staff of staffMembers) {
        await this.prisma.staff.create({
          data: staff,
        });
      }
      logger.info('Staff table has been seeded successfully.');
    } else {
      logger.info('Staff table already contains data.');
    }

    // Vets
    const vetsCount = await this.prisma.veterinarians.count();
    if (vetsCount === 0) {
      const vetsMembers = [
        {
          id: 'c010abec-9334-46fd-a345-7b93b0b59f1f',
          name: 'Jane',
          job_title: Title.Veterinarian,
          permission_type: Permission.Staff,
          email: 'jane.smith@example.com',
          password: await bcryptAdapter.hash(process.env.SEEDING_PASSWORD as string),
          phone_number: '0987654321',
          verified: true,
        },
      ];

      for (const vet of vetsMembers) {
        await this.prisma.veterinarians.create({
          data: vet,
        });
      }
      logger.info('Veterinarians table has been seeded successfully.');
    } else {
      logger.info('Veterinarians table already contains data.');
    }

    // Owners
    const ownersCount = await this.prisma.owners.count();
    if (ownersCount === 0) {
      const owners = [
        {
          id: '80ba2423-baed-42d8-bf6d-ad4b98b2e5c0',
          name: 'Charles',
          email: 'charles@example.com',
          phone_number: '37899426',
        },
      ];

      for (const owner of owners) {
        await this.prisma.owners.create({
          data: owner,
        });
      }
      logger.info('Owners table has been seeded successfully.');
    } else {
      logger.info('Owners table already contains data.');
    }

    // Pets
    const petsCount = await this.prisma.pets.count();
    if (petsCount === 0) {
      const owner = await this.prisma.owners.findFirst();
      if (!owner) {
        logger.error('No owners found. Cannot seed Pets.');
        return;
      }

      const pets = [
        {
          name: 'Negrito',
          gender: Gender.Male,
          animal_id: 1,
          owner_id: owner.id,
        },
      ];

      try {
        for (const pet of pets) {
          await this.prisma.pets.create({
            data: pet,
          });
        }
        logger.info('Pets table has been seeded successfully.');
      } catch (error) {
        logger.error('Error seeding Pets table:', error);
      }
    } else {
      logger.info('Pets table already contains data.');
    }

    // Services
    const servicesCount = await this.prisma.services.count();
    if (servicesCount === 0) {
      const services = [
        { type: 'Boarding', price: 35 },
        { type: 'Dental Care', price: 125 },
        { type: 'Emergency and Critical Care', price: 160 },
        { type: 'Nutritional Counseling', price: 25 },
        { type: 'Surgery', price: 380 },
        { type: 'Vaccinations', price: 70 },
      ];
      for (const service of services) {
        await this.prisma.services.create({
          data: {
            type: service.type,
            price: service.price,
          },
        });
      }
      logger.info('Jobs table has been seeded successfully.');
    } else {
      logger.info('Services table already contains data.');
    }

    // Working Days
    const workingDaysCount = await this.prisma.workingDays.count();
    if (workingDaysCount === 0) {
      const days = [
        { name: Day.Monday },
        { name: Day.Tuesday },
        { name: Day.Wednesday },
        { name: Day.Thursday },
        { name: Day.Friday },
        { name: Day.Saturday },
        { name: Day.Sunday },
      ];
      for (const day of days) {
        await this.prisma.workingDays.create({
          data: {
            day: day.name,
          },
        });
      }
    } else {
      logger.info('Working Days table already contains data.');
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
