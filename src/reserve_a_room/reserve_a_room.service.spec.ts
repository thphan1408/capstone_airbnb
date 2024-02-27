import { Test, TestingModule } from '@nestjs/testing';
import { ReserveARoomService } from './reserve_a_room.service';

describe('ReserveARoomService', () => {
  let service: ReserveARoomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReserveARoomService],
    }).compile();

    service = module.get<ReserveARoomService>(ReserveARoomService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
