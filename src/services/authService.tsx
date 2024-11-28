import authApi from '../apis/auth';
import * as types from '../apis/auth/types';

export const checkUser = async (data: types.CheckUserData) => {
  const res = await authApi.checkUser(data);
  return res?.data?.identity;
};
