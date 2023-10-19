import { heading, panel, Panel } from "@metamask/snaps-ui";
import { getApiErrorPanel, getErrorPanel, getRenderErrorPanel, getStandardPanel } from "./panels";
import { getTransactionAnalyze, renderLayoutFromSnapResponse, SnapApiError, SnapRenderError } from "./w3a";
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
      };
    }

    const panelData = renderLayoutFromSnapResponse(analyze.items);

    return {
      content: panel(panelData),
    };
  } catch (error) {
    if (error instanceof SnapApiError) {
      return { content: getApiErrorPanel() };
    }

    if (error instanceof SnapRenderError) {
      return { content: getRenderErrorPanel() };
    }

    return {
      content: getErrorPanel(),
    };
  }
};
