import axios from 'axios';
import queryString from 'query-string';
import { GroupInterface, GroupGetQueryInterface } from 'interfaces/group';
import { GetQueryInterface } from '../../interfaces';

export const getGroups = async (query?: GroupGetQueryInterface) => {
  const response = await axios.get(`/api/groups${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createGroup = async (group: GroupInterface) => {
  const response = await axios.post('/api/groups', group);
  return response.data;
};

export const updateGroupById = async (id: string, group: GroupInterface) => {
  const response = await axios.put(`/api/groups/${id}`, group);
  return response.data;
};

export const getGroupById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/groups/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteGroupById = async (id: string) => {
  const response = await axios.delete(`/api/groups/${id}`);
  return response.data;
};
