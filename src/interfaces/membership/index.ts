import { UserInterface } from 'interfaces/user';
import { GroupInterface } from 'interfaces/group';
import { GetQueryInterface } from 'interfaces';

export interface MembershipInterface {
  id?: string;
  user_id?: string;
  group_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  group?: GroupInterface;
  _count?: {};
}

export interface MembershipGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  group_id?: string;
}
