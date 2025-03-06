import { Injectable } from '@nestjs/common';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';

@Injectable()
export class GlobalHelperService {
  getServerThaiDate(): string {
    return format(new Date(), 'dd MMMM yyyy H:m:s', { locale: th });
  }
}
