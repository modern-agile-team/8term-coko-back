import { Injectable } from '@nestjs/common';
import { CreateUserChallengeDto } from './dto/create-user-challenge.dto';
import { UpdateUserChallengeDto } from './dto/update-user-challenge.dto';

@Injectable()
export class UserChallengeService {
  findAllByPageAndLimit() {
    return `This action returns all userChallenge`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userChallenge`;
  }

  create(createUserChallengeDto: CreateUserChallengeDto) {
    return 'This action adds a new userChallenge';
  }

  update(id: number, updateUserChallengeDto: UpdateUserChallengeDto) {
    return `This action updates a #${id} userChallenge`;
  }
}
