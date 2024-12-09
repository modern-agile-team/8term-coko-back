import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePartDto } from './dto/create-part.dto';
import { PartsRepository } from './parts.repository';
import { SectionsService } from 'src/sections/sections.service';
import { QuizzesRepository } from 'src/quizzes/quizzes.repository';

@Injectable()
export class PartsService {
  constructor(
    private readonly sectionsService: SectionsService,
    private readonly partsRepository: PartsRepository,
    private readonly quizzesRepository: QuizzesRepository,
  ) {}
  async findOne(id: number) {
    const part = await this.partsRepository.findOnePartById(id);

    if (!part) {
      throw new NotFoundException();
    }

    return part;
  }

  async findAll() {
    return this.partsRepository.findAllPart();
  }

  async create(body: CreatePartDto) {
    const { sectionId, name } = body;

    await this.sectionsService.findOne(sectionId);

    const part = await this.partsRepository.findOnePartByName(name);

    if (part) {
      throw new ConflictException('part의 이름은 유니크 해야합니다.');
    }

    return this.partsRepository.createPartById(body);
  }

  async remove(id: number) {
    const part = await this.partsRepository.findOnePartById(id);

    if (!part) {
      throw new NotFoundException();
    }

    const quiz = await this.quizzesRepository.findOneByPartId(id);

    if (quiz) {
      throw new ConflictException('파트를 참조하고 있는 문제가 있음');
    }

    return this.partsRepository.deletePartById(id);
  }
}
