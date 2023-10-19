import { SnapResponseDTO } from './interfaces';
import type { Json } from '@metamask/utils';
import { API_URL_TRANSACTION_ANALYZE } from './constants';
import { SnapApiError } from './errors';

export const getTransactionAnalyze = async (
  transaction: { [key: string]: Json },
  chainId: string,
  transactionOrigin?: string,
): Promise<SnapResponseDTO | null> => {
  const url = API_URL_TRANSACTION_ANALYZE;
  const timeZoneOffset = String(new Date().getTimezoneOffset());
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "X-Timezone-Offset": timeZoneOffset,
    },
    body: JSON.stringify({ transaction, chainId, transactionOrigin })
  });
  
  if (response.ok) {
    const result = (await response.json()) as SnapResponseDTO;
    return result;
  } 
  throw new SnapApiError('Api error has occurred');
};
