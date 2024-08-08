import { payload } from "../../../../interfaces";
import { RegisterVetsDto } from "../dtos";
export type SignToken = (payload: payload, duration?: string) => Promise<string | null>;


// Use cases
export interface RegisterVetsUseCase {
    execute( registerVets: RegisterVetsDto): Promise<any>;
}
