-- CreateEnum
CREATE TYPE "Permission" AS ENUM ('Staff', 'Admin');

-- CreateEnum
CREATE TYPE "Title" AS ENUM ('Receptionist', 'HR', 'Manager', 'Veterinarian', 'Asistant', 'Technician');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Paid', 'Unpaid');

-- CreateEnum
CREATE TYPE "Method" AS ENUM ('Cash', 'Online');

-- CreateEnum
CREATE TYPE "Animal" AS ENUM ('Cat', 'Dog', 'Horse', 'Bird', 'Snake', 'Lizard', 'Hamster', 'Rat', 'Rabbit');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female');

-- CreateTable
CREATE TABLE "Staff" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "job_title" TEXT NOT NULL,
    "permission_type" "Permission" NOT NULL DEFAULT 'Staff',
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Veterinarians" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "job_title" TEXT NOT NULL,
    "permission_type" "Permission" NOT NULL DEFAULT 'Staff',
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Veterinarians_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Owners" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,

    CONSTRAINT "Owners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "Animal" NOT NULL,
    "gender" "Gender" NOT NULL,
    "owner_id" TEXT NOT NULL,

    CONSTRAINT "Pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Animals" (
    "id" SERIAL NOT NULL,
    "type" "Animal" NOT NULL,

    CONSTRAINT "Animals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Jobs" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permissions" (
    "id" SERIAL NOT NULL,
    "type" "Permission" NOT NULL,

    CONSTRAINT "Permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointments" (
    "id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "vet_id" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,
    "pet_id" TEXT NOT NULL,
    "service_type" TEXT NOT NULL,

    CONSTRAINT "Appointments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Services" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transactions" (
    "id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "pet_id" TEXT NOT NULL,
    "service_name" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "payment_method" "Method" NOT NULL,
    "payment_id" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Unpaid',
    "cancelled" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notifications" (
    "id" TEXT NOT NULL,
    "appointment_id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PublicHolidays" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "date" TEXT NOT NULL,

    CONSTRAINT "PublicHolidays_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormerStaff" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "job_title" TEXT NOT NULL,
    "exit_date" TIMESTAMP(3) NOT NULL,
    "exit_reason" TEXT NOT NULL,

    CONSTRAINT "FormerStaff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormerVets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "job_title" TEXT NOT NULL,
    "exit_date" TIMESTAMP(3) NOT NULL,
    "exit_reason" TEXT NOT NULL,

    CONSTRAINT "FormerVets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Staff_email_key" ON "Staff"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Veterinarians_email_key" ON "Veterinarians"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Animals_type_key" ON "Animals"("type");

-- CreateIndex
CREATE UNIQUE INDEX "Jobs_title_key" ON "Jobs"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Permissions_type_key" ON "Permissions"("type");

-- CreateIndex
CREATE UNIQUE INDEX "Services_type_key" ON "Services"("type");

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_job_title_fkey" FOREIGN KEY ("job_title") REFERENCES "Jobs"("title") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_permission_type_fkey" FOREIGN KEY ("permission_type") REFERENCES "Permissions"("type") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Veterinarians" ADD CONSTRAINT "Veterinarians_job_title_fkey" FOREIGN KEY ("job_title") REFERENCES "Jobs"("title") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Veterinarians" ADD CONSTRAINT "Veterinarians_permission_type_fkey" FOREIGN KEY ("permission_type") REFERENCES "Permissions"("type") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pets" ADD CONSTRAINT "Pets_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "Owners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointments" ADD CONSTRAINT "Appointments_vet_id_fkey" FOREIGN KEY ("vet_id") REFERENCES "Veterinarians"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointments" ADD CONSTRAINT "Appointments_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "Owners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointments" ADD CONSTRAINT "Appointments_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "Pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointments" ADD CONSTRAINT "Appointments_service_type_fkey" FOREIGN KEY ("service_type") REFERENCES "Services"("type") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Owners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "Pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_service_name_fkey" FOREIGN KEY ("service_name") REFERENCES "Services"("type") ON DELETE RESTRICT ON UPDATE CASCADE;
