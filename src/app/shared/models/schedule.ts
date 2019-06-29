import { User } from './user';
import { MODELS } from '../../../theme/pt'
export class Schedule{
  date: Date = new Date();
  checkIn: Boolean = false;
  isPaidOut: Boolean = false;
  paidOut: number = 0;
  paymentMethod: string = MODELS.PAYMENT_METHOD.cash;
  price: number = 0;
  status: string = MODELS.SCHEDULE.availabel;
  user?: User;
}