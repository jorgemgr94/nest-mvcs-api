import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete
} from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Pet } from './schemas/pet.schema';

@Controller('api/v1/pets')
export class PetsController {
	constructor(private readonly petsService: PetsService) {}

	@Get()
	async findAll(): Promise<Pet[]> {
		return this.petsService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.petsService.findOne(id);
	}

	@Post()
	create(@Body() createPetDto: CreatePetDto) {
		return this.petsService.create(createPetDto);
	}

	@Delete(':id')
	delete(@Param('id') id: string) {
		return this.petsService.delete(id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updatePetDto: UpdatePetDto) {
		return this.petsService.update(id, updatePetDto);
	}
}
