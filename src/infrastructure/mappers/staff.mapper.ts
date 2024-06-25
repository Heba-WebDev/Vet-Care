import { CustomError, StaffEntity } from "../../domain";


export class StaffMapper {

    static staffEntityFromObject(object: {[key: string]: any}) {
        const {
        id, name, email, password,
        job_title, phone_number
        } = object;

        if (!id) throw CustomError.badRequest('Bad request');
        return Promise.resolve(new StaffEntity(
            id,
            name,
            job_title,
            'Staff',
            email,
            password,
            phone_number,
            false
        ))
    }
}