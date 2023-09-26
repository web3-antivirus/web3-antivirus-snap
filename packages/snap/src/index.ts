import { heading, panel, Panel } from "@metamask/snaps-ui";
import {
  getErrorPanel, getStandardPanel,
} from "./panels";
import { getTransactionAnalyze, renderLayoutFromSnapResponse } from "./w3a";
import { OnTransactionHandler } from "@metamask/snaps-types";

export const onTransaction: OnTransactionHandler = async ({
  transaction,
  chainId,
  transactionOrigin,
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