import { SCAN_URL } from '../constants/enpoints';

export const scanAddressLink = (address: string) => {
  return `${SCAN_URL}/address/${address}`;
};
