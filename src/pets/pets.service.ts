import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePetDto } from './dto/create-pet.dto';
import { Model } from 'mongoose';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Pet, PetDocument } from './schemas/pet.schema';

@Injectable()
export class PetsService {
	constructor(
		@InjectModel(Pet.name) private readonly petModel: Model<PetDocument>
	) {}

	async findAll(): Promise<Pet[]> {
		return this.petModel.find();
	}

	async findOne(id: string): Promise<Pet> {
		const pet = await this.petModel.findById(id);
		if (!pet) throw new NotFoundException(id);
		return pet;
	}

	async create(createPetDto: CreatePetDto): Promise<Pet> {
		const createdPet = await this.petModel.create(createPetDto);
		return createdPet;
	}

	async delete(id: string) {
		const deletedPet = await this.petModel.findByIdAndRemove(id);
		if (!deletedPet) throw new NotFoundException(id);
		return deletedPet;
	}

	async update(id: string, updatePetDto: UpdatePetDto) {
		const updatedPet = await this.petModel.findByIdAndUpdate(id, updatePetDto);
		if (!updatedPet) throw new NotFoundException(id);
		return updatedPet;
	}
}
