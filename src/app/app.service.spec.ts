import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should check method in service', () => {
    expect(service.check).toBeDefined();
  });

  it('should return a status and data when check is called', () => {
    const result = service.check();
    expect(result.status).toBeDefined();
    expect(result.data).toBeDefined();
  });
});
