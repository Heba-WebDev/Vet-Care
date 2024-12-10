-- CreateTable
CREATE TABLE "WorkingHours" (
    "id" TEXT NOT NULL,
    "vet_id" TEXT NOT NULL,
    "day_id" INTEGER NOT NULL,
    "start_time" TIME NOT NULL,
    "end_time" TIME NOT NULL,
    "break_start_time" TIME NOT NULL,
    "break_end_time" TIME NOT NULL,

    CONSTRAINT "WorkingHours_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WorkingHours" ADD CONSTRAINT "WorkingHours_vet_id_fkey" FOREIGN KEY ("vet_id") REFERENCES "Veterinarians"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkingHours" ADD CONSTRAINT "WorkingHours_day_id_fkey" FOREIGN KEY ("day_id") REFERENCES "WorkingDays"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
