import {
    RegisterVetsDto,
    VerifyVetDto,
    UpdateVetsDto,
    LoginVetsDto,
    DeleteVetsDto,
    GetAllVetsDto,
} from '../../domain';
import {
    registerSchema,
    verifySchema,
    DeleteSchema,
    loginSchema,
    updateSchema,
    getAllSchema,
} from './joi-schemas';

export class VetsInputValidation {
    register(vetsDto: RegisterVetsDto): string | null {
        const { error } = registerSchema.validate(vetsDto);
        if (error) return error.message;
        return null;
    }

    verify(vetsDto: VerifyVetDto): string | null {
        const { error } = verifySchema.validate(vetsDto);
        if (error) return error.message;
        return null;
    }
    login(vetsDto: LoginVetsDto): string | null {
        const { error } = loginSchema.validate(vetsDto);
        if (error) return error.message;
        return null;
    }

    update(vetsDto: UpdateVetsDto): string | null {
        const { error } = updateSchema.validate(vetsDto);
        if (error) return error.message;
        return null;
    }

    delete(vetsDto: DeleteVetsDto): string | null {
        const { error } = DeleteSchema.validate(vetsDto);
        if (error) return error.message;
        return null;
    }

    getAll(vetsDto: GetAllVetsDto): string | null {
        const { error } = getAllSchema.validate(vetsDto);
        if (error) return error.message;
        return null;
    }
}
