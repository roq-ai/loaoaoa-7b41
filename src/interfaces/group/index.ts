import { MembershipInterface } from 'interfaces/membership';
import { PaymentInterface } from 'interfaces/payment';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface GroupInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  membership?: MembershipInterface[];
  payment?: PaymentInterface[];
  user?: UserInterface;
  _count?: {
    membership?: number;
    payment?: number;
  };
}

export interface GroupGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
