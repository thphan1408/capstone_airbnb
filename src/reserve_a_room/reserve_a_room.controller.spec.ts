import { Test, TestingModule } from '@nestjs/testing';
import { ReserveARoomController } from './reserve_a_room.controller';
import { ReserveARoomService } from './reserve_a_room.service';

describe('ReserveARoomController', () => {
  let controller: ReserveARoomController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReserveARoomController],
      providers: [ReserveARoomService],
    }).compile();

    controller = module.get<ReserveARoomController>(ReserveARoomController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
