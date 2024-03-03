import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });

  it('should call AppService.check', () => {
    const checkSpy = jest.spyOn(appController, 'check');
    appController.check();
    expect(checkSpy).toHaveBeenCalled();
  });

  it('should return a status and data', () => {
    const result = appController.check();
    expect(result.status).toBeDefined();
    expect(result.data).toBeDefined();
  });

  it('should return a status of 200', () => {
    const result = appController.check();
    expect(result.status).toBe(200);
    expect(result.data).toBe('OK');
  });
});
