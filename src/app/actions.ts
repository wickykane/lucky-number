import axios from 'axios';
import { FinalizeCustomerWinnerParams } from './types';

export const API_URL = process.env.REACT_APP_API_URL || '';

export function getActiveEvent() {
  return axios.get(`${API_URL}event/current-active`).then((res: any) => {
    return res.data;
  });
}

export function getLuckyCustomer(prizeId: number) {
  return axios
    .get(`${API_URL}prize/${prizeId}/lucky-customer`)
    .then((res: any) => {
      return res.data;
    });
}

export function finalizeLuckyCustomer(params: FinalizeCustomerWinnerParams) {
  return axios
    .post(`${API_URL}prize/finalize-winner`, params)
    .then((res: any) => {
      return res.data;
    });
}
