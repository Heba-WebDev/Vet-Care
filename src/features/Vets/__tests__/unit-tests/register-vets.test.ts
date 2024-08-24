import { vi, it, describe, beforeEach, expect } from 'vitest';
import { VetMapper, VetsDatasourceImpl } from '../../infrastructure';
import { prismaMock } from '../../../../tests/mocks';
import { vetEntityUnveriviedMock, vetRegisterDtoMock } from '../mocks/vet.mock';
import { CustomError } from '../../../../domain';

describe('Vets registration', () => {
    let vetsDatasource: VetsDatasourceImpl;

    beforeEach(() => {
        vetsDatasource = new VetsDatasourceImpl(prismaMock);
        vi.clearAllMocks();
    });

    it('should register a new vet successfully', async () => {
        prismaMock.veterinarians.findFirst
            .mockReturnValueOnce(null) // No existing email
            .mockReturnValueOnce(null); // No existing phone number
        prismaMock.jobs.findFirst.mockReturnValue({
            title: vetEntityUnveriviedMock.job_title,
        });
        prismaMock.veterinarians.create.mockReturnValue(
            vetEntityUnveriviedMock,
        );
        VetMapper.vetEntityFromObject(vetEntityUnveriviedMock);

        const result = await vetsDatasource.register(vetRegisterDtoMock);
        expect(typeof result).toEqual('object');
        expect(result?.verified).toEqual(false);
        expect(result?.email).toEqual(vetRegisterDtoMock.email);
    });

    it('should return status code 400 if the email already exists', async () => {
        prismaMock.veterinarians.findFirst.mockReturnValueOnce(
            vetEntityUnveriviedMock,
        ); // email exsits
        await expect(
            vetsDatasource.register(vetRegisterDtoMock),
        ).rejects.toThrow(CustomError.badRequest('Provide a different email'));
    });

    it('should return status code 400 if the job title does not exist', async () => {
        prismaMock.veterinarians.findFirst.mockReturnValueOnce(null); // email doesn't exsit
        prismaMock.veterinarians.findFirst.mockReturnValueOnce(null); // phone number doesn't exsit
        prismaMock.jobs.findFirst.mockReturnValue(null); // job title doesn't exsit

        await expect(
            vetsDatasource.register(vetRegisterDtoMock),
        ).rejects.toThrow(
            CustomError.badRequest(
                'Provide a valid job title [Veterinarian, Asistant or Technician]',
            ),
        );
    });

    it('should return status code 400 if the phone number already exists', async () => {
        prismaMock.veterinarians.findFirst.mockReturnValueOnce(null); // email doesn't exsit
        prismaMock.veterinarians.findFirst.mockReturnValueOnce(
            vetEntityUnveriviedMock,
        ); // phone number exsits

        await expect(
            vetsDatasource.register(vetRegisterDtoMock),
        ).rejects.toThrow(
            CustomError.badRequest('Provide a different phone number'),
        );
    });
});
