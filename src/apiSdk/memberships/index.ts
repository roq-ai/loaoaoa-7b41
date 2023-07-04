import axios from 'axios';
import queryString from 'query-string';
import { MembershipInterface, MembershipGetQueryInterface } from 'interfaces/membership';
import { GetQueryInterface } from '../../interfaces';

export const getMemberships = async (query?: MembershipGetQueryInterface) => {
  const response = await axios.get(`/api/memberships${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createMembership = async (membership: MembershipInterface) => {
  const response = await axios.post('/api/memberships', membership);
  return response.data;
};

export const updateMembershipById = async (id: string, membership: MembershipInterface) => {
  const response = await axios.put(`/api/memberships/${id}`, membership);
  return response.data;
};

export const getMembershipById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/memberships/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteMembershipById = async (id: string) => {
  const response = await axios.delete(`/api/memberships/${id}`);
  return response.data;
};
