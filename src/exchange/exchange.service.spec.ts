import { Test, TestingModule } from '@nestjs/testing';
import { CurrenciesService, ExchangeService } from './exchange.service';
import {BadRequestException} from "@nestjs/common";



describe('ExchangeService', () => {
  let service: ExchangeService;
  let currenciesService: ExchangeService;

  beforeEach(async () => {
    const  currenciesServiceMock =  {
      getCurrency: jest.fn()
    }
    
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExchangeService, {
        provide: CurrenciesService, useFactory: () => currenciesServiceMock
      }],
    }).compile();

    service = module.get<ExchangeService>(ExchangeService);
 });

  it('should be defined', () => {
    expect(service).toBeDefined();
  })

  it('should be throw if called with invalid params', async () => {
      await expect(service.convertAmount({ from: '', to:'', amount: 0 })
      ).rejects.toThrow(new BadRequestException());
  })

  it('should be throw if called with valid params', async () => {
      await expect(service.convertAmount({ from: 'USD', to:'BRL', amount: 1 })
      ).resolves.not.toThrow();
  })

  it('should be called getCurrency twice', async () => {
    await service.convertAmount({ from: 'USD', to:'BRL', amount: 1 })
    await expect(currenciesService.getCurrency).toBeCalledTimes(2)
  })
});