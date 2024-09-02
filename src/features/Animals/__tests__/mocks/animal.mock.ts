import { AddAnimalsDto, AnimalEntity } from "../../domain";
import { Animal } from "@prisma/client";

export const addAnimalDtoMock: AddAnimalsDto = {
  type: Animal.Bird,
  isSupported: true
};

export const animalMock: AnimalEntity = {
    type: Animal.Bird,
    isSupported: true,
    isDeleted: false,
};