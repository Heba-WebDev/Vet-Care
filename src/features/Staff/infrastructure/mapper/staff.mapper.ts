import { CustomError } from '../../../../domain';
import { StaffEntity } from '../../domain/entities';

export class StaffMapper {
    static staffEntityFromObject(staffEntity: StaffEntity) {
        const {
            id,
            name,
            job_title,
            permission_type,
            email,
            phone_number,
            verified,
        } = staffEntity;

        if (!id) throw CustomError.badRequest('Missing id');
        if (!name) throw CustomError.badRequest('Missing name');
        if (!job_title) throw CustomError.badRequest('Missing job_title');
        if (!permission_type)
            throw CustomError.badRequest('Missing permission_type');
        if (!email) throw CustomError.badRequest('Missing email');
        if (!phone_number) throw CustomError.badRequest('Missing phone_number');
        if (typeof verified !== 'boolean')
            throw CustomError.badRequest('Missing verified');

        return new StaffEntity(
            id,
            name,
            job_title,
            permission_type,
            email,
            phone_number,
            verified,
        );
    }
}
