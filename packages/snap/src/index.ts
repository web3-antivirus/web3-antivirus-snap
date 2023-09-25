import { heading, panel, Panel } from "@metamask/snaps-ui";
import {
  getErrorPanel, getStandardPanel,
} from "./panels";
import { getTransactionAnalyze, renderLayoutFromSnapResponse } from "./w3a";
import type { Json } from "@metamask/utils";

export const onTransaction = async ({
  transaction,
  chainId,
  transactionOrigin,
}: {
  transaction: { [key: string]: Json };
  chainId: string;
  transactionOrigin?: string;
}): Promise<{ content: Panel }> => {
  try {
    const analyze = await getTransactionAnalyze(
      transaction,
      chainId,
      transactionOrigin
    );

    if (!analyze?.items?.length) {
      return {
        content: getStandardPanel(),
      }
    }
    const panelData = renderLayoutFromSnapResponse(analyze.items);

    return {
      content: panel(panelData),
    };
  } catch (error) {
    return {
      content: getErrorPanel(),
    };
  }
};