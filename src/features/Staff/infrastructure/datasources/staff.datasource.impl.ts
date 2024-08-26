import { Prisma, PrismaClient } from '@prisma/client';
import { prisma } from '../../../../data';
import { bcryptAdapter } from '../../../../config';
import { CustomError } from '../../../../domain';
import {
  StaffDatasource,
  // DTOs
  LoginStaffDto,
  RegisterStaffDto,
  VerifyStaffDto,
  DeleteStaffDto,
  GetAllStaffDto,
  UpdateStaffDto,
  // Entities
  StaffEntity,
  FormerStaffEntity,
} from '../../domain';
import { StaffMapper } from '../mapper';
import { logger } from '../../../../infrastructure';

export class StaffDatasourceImpl implements StaffDatasource {
  private readonly _prisma: PrismaClient;
  constructor(orm: PrismaClient = prisma) {
    this._prisma = orm;
  }
  async register(staffDto: RegisterStaffDto): Promise<StaffEntity | null> {
    const { name, email, password, phone_number, job_title } = staffDto;
    try {
      const exists = await this._prisma.staff.findFirst({ where: { email } });
      if (exists) throw CustomError.badRequest('Provide a different email');
      const job = await this._prisma.jobs.findFirst({ where: { title: job_title } });
      if (!job)
        throw CustomError.badRequest('Provide a valid job title [Receptionist, HR, or Manager]');
      const phoneExists = await this._prisma.staff.findFirst({ where: { phone_number } });
      if (phoneExists) throw CustomError.badRequest('Provide a different phone number');
      const hashedPassword = bcryptAdapter.hash(password);

      const staff = await this._prisma.staff.create({
        data: {
          name,
          email,
          password: hashedPassword,
          phone_number,
          job_title,
        },
      });
      return StaffMapper.staffEntityFromObject(staff);
    } catch (error) {
      logger.error(error);
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServerError();
    }
  }

  async login(staffDto: LoginStaffDto): Promise<StaffEntity | null> {
    const { email, password } = staffDto;
    try {
      const exists = await this._prisma.staff.findFirst({ where: { email } });
      if (!exists) throw CustomError.badRequest('Invalid credentials');
      if (!exists.verified) throw CustomError.unauthorized('Account has to be verified');
      const passwordMatch = bcryptAdapter.compare(password, exists.password!);
      if (!passwordMatch) throw CustomError.badRequest('Invalid credentials');
      const staff = await this._prisma.staff.findFirst({
        where: {
          email,
        },
      });
      return StaffMapper.staffEntityFromObject(staff!);
    } catch (error) {
      logger.error(error);
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServerError();
    }
  }

  async verify(staffDto: VerifyStaffDto): Promise<StaffEntity | null> {
    const { email } = staffDto;
    try {
      const exists = await this._prisma.staff.findFirst({ where: { email } });
      if (!exists) throw CustomError.badRequest('Invalid credentionals');
      if (exists.verified) throw CustomError.badRequest('Staff member already verified');
      const staff = await this._prisma.staff.update({
        data: { verified: true },
        where: { email },
      });
      return StaffMapper.staffEntityFromObject(staff!);
    } catch (error) {
      logger.error(error);
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServerError();
    }
  }

  async delete(staffDto: DeleteStaffDto): Promise<StaffEntity | null> {
    const { id, exit_reason } = staffDto;
    return this._prisma
      .$transaction(async (prisma) => {
        const staff = await prisma.staff.findFirst({ where: { id } });
        if (!staff) throw CustomError.badRequest('Invalid credentials');
        // Only verified staff are moved to the formerStaff table
        if (staff.verified) {
          const formerStaff = new FormerStaffEntity(
            staff.id,
            staff.name,
            staff.email,
            staff.phone_number,
            staff.job_title,
            new Date(),
            exit_reason,
          );

          await prisma.formerStaff.create({
            data: formerStaff,
          });
        }
        // verified and unverified accounts can be safely deleted
        await prisma.staff.delete({ where: { id } });

        return StaffMapper.staffEntityFromObject(staff!);
      })
      .catch((error) => {
        logger.error(error);
        if (error instanceof CustomError) throw error;
        throw CustomError.internalServerError();
      });
  }

  async getAll(staffDto: GetAllStaffDto): Promise<StaffEntity[] | null> {
    try {
      const offset = (staffDto.page! - 1) * staffDto.limit!;
      const staff = await this._prisma.staff.findMany({
        skip: offset,
        take: staffDto.limit,
      });
      return staff;
    } catch (error) {
      logger.error(error);
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServerError();
    }
  }

  async getAllFormer(staffDto: GetAllStaffDto): Promise<FormerStaffEntity[] | null> {
    const offset = (staffDto.page! - 1) * staffDto.limit!;
    const { limit } = staffDto;
    try {
      const staff = await this._prisma.formerStaff.findMany({
        skip: offset,
        take: limit,
      });
      return staff;
    } catch (error) {
      logger.error(error);
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServerError();
    }
  }

  async update(staffDto: UpdateStaffDto): Promise<StaffEntity | null> {
    const { id, email, password, phone_number } = staffDto;
    try {
      const exists = await this._prisma.staff.findFirst({ where: { id } });
      if (!exists) throw CustomError.badRequest('Invalid credentials');
      if (!exists.verified) throw CustomError.unauthorized('Account has to be verified');

      /*
            StaffUpdateInput ensures that you only update fields that exist in
            the Staff model and that the values you provide are of the correct type.
            Rerelated records can be updated as well.
            */
      const data: Prisma.StaffUpdateInput = {};

      if (email) data.email = email;
      if (phone_number) data.phone_number = phone_number;
      if (password) {
        data.password = await bcryptAdapter.hash(password);
      }

      // Only update if there's something to update
      if (Object.keys(data).length > 0) {
        await this._prisma.staff.update({
          data,
          where: { id },
        });
      }

      const staff = await this._prisma.staff.findFirst({ where: { id } });
      return StaffMapper.staffEntityFromObject(staff!);
    } catch (error) {
      logger.error(error);
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServerError();
    }
  }
}
