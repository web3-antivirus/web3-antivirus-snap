import { heading, panel } from "@metamask/snaps-ui";
import { onTransaction } from "../";
import { getApiErrorPanel, getErrorPanel, getRenderErrorPanel, getStandardPanel } from "./panels";
import { installSnap } from "@metamask/snaps-jest";
import { expect, jest } from "@jest/globals";

import { API_URL_TRANSACTION_ANALYZE, NODE_TYPE, SnapApiError, SnapRenderError } from "./w3a";

import * as api from "./w3a/api";
import * as utils from "./w3a/utils"; 

const ETH_MAINNET_CHAIN_ID = "eip155:1";

export const OkResponseMock = {
  items: [{ node: "heading", data: "Test data" }],
};

const mockTransaction = {
  chainId: "eip155:10",
  transaction: { from: "", to: "" },
};

describe("onTransaction interceptor", () => {
  it("should show Standard panel on empty response", async () => {
    const snap = await installSnap();

    const { unmock } = await snap.mock({
      url: API_URL_TRANSACTION_ANALYZE,
      response: {
        status: 200,
        body: JSON.stringify({}),
        contentType: "application/json",
        headers: {
          "Access-Control-Allow-Headers": "*",
        },
      },
    });

    const response = await snap.sendTransaction({
      chainId: ETH_MAINNET_CHAIN_ID,
    });

    const expected = getStandardPanel();

    expect(response).toRender(expected);
    await unmock();
  });

  it("show base response with heading from backend", async () => {
    const snap = await installSnap();

    const { unmock } = await snap.mock({
      url: API_URL_TRANSACTION_ANALYZE,
      response: {
        status: 200,
        body: JSON.stringify(OkResponseMock),
        contentType: "application/json",
        headers: {
          "Access-Control-Allow-Headers": "*",
        },
      },
    });

    const response = await snap.sendTransaction({
      chainId: ETH_MAINNET_CHAIN_ID,
    });

    const expected = panel([heading("Test data")]);

    expect(response).toRender(expected);
    await unmock();
  });
});

describe("onTransaction function", () => {
  it("should show Empty Component on empty analyze result", async () => {
    jest.spyOn(api, "getTransactionAnalyze").mockResolvedValueOnce(null);
    const result = await onTransaction(mockTransaction);

    expect(result).toEqual({ content: getStandardPanel() });
  });

  it("should show Error Component on fetch failed", async () => {
    jest.spyOn(api, "getTransactionAnalyze").mockImplementationOnce(() => {
      throw new Error('f');
    });
    const result = await onTransaction(mockTransaction);

    expect(result).toEqual({ content: getErrorPanel() });
  });

  it("should show Api Error Component on api request failed", async () => {
    jest.spyOn(api, "getTransactionAnalyze").mockImplementationOnce(() => {
      throw new SnapApiError('');
    });
    const result = await onTransaction(mockTransaction);

    expect(result).toEqual({ content: getApiErrorPanel() });
  });

  it("should show Render Error Component on api request failed", async () => {
    jest.spyOn(utils, "renderLayoutFromSnapResponse").mockImplementationOnce(() => {
      throw new SnapRenderError('');
    });
    const result = await onTransaction(mockTransaction);

    expect(result).toEqual({ content: getRenderErrorPanel() });
  });

  it("should show data from response", async () => {
    jest.spyOn(api, "getTransactionAnalyze").mockResolvedValueOnce({
      items: [{ node: NODE_TYPE.HEADING, data: "Test data" }],
    });
    const result = await onTransaction(mockTransaction);

    expect(result).toEqual({ content: panel([heading("Test data")]) });
  });
});
