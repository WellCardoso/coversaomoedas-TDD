import {BadRequestException, Injectable} from '@nestjs/common';
import {ExchangeInputType} from "./types/exchange-input.type";

export class CurrenciesService {
  async getCurrency(currency: string): Promise<any> {}
}

@Injectable()
export class ExchangeService {
  constructor(private currenciesService: CurrenciesService) {}

  async convertAmount({ from, to, amount }: ExchangeInputType): Promise<any> {
      if(!from || !to || !amount) {
        throw new BadRequestException();
      }

      try {
          const currencyFrom = this.currenciesService.getCurrency(from);
          const currencyTo = this.currenciesService.getCurrency(to);

         // return { amount: currencyFrom.value / currencyTo.value} * amount };
      }
      catch(error) {
          throw new Error(error)
      }
  }
}
