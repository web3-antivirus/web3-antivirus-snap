import { SnapResponseDTO } from './interfaces';
import type { Json } from '@metamask/utils';

export const getTransactionAnalyze = async (
  transaction: { [key: string]: Json },
  chainId: string,
  transactionOrigin?: string,
): Promise<SnapResponseDTO> => {
  const url = 'https://api.web3antivirus.io/api/v1/snap/analyze/transaction';
  const timeZoneOffset = String(new Date().getTimezoneOffset());
  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "X-Timezone-Offset": timeZoneOffset,
    },
    body: JSON.stringify({transaction, chainId, transactionOrigin })
  });
  return (await resp.json()) as SnapResponseDTO;
};
