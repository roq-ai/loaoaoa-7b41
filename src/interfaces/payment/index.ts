import { GroupInterface } from 'interfaces/group';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface PaymentInterface {
  id?: string;
  amount: number;
  group_id?: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  group?: GroupInterface;
  user?: UserInterface;
  _count?: {};
}

export interface PaymentGetQueryInterface extends GetQueryInterface {
  id?: string;
  group_id?: string;
  user_id?: string;
}
