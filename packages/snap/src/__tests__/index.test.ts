/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { NotificationType, installSnap } from "@metamask/snaps-jest";
import { expect } from "@jest/globals";
import { heading, panel } from "@metamask/snaps-ui";
import { assert } from "@metamask/utils";
import { getErrorPanel, getStandardPanel } from "../panels";
import { OkResponseMock } from "./mocks";

import { API_URL_TRANSACTION_ANALYZE } from "../w3a";

const ETH_MAINNET_CHAIN_ID = "eip155:1";

describe("onTransaction", () => {
  it("should show Error Component on request error", async () => {
    const snap = await installSnap();

    const { unmock } = await snap.mock({
      url: API_URL_TRANSACTION_ANALYZE,
      response: {
        status: 400,
        body: JSON.stringify({}),
        contentType: "application/json",
      },
    });

    const response = await snap.sendTransaction({
      chainId: ETH_MAINNET_CHAIN_ID,
    });

    const expected = getErrorPanel();

    expect(response).toRender(expected);
    unmock();
  });

  it("should show Standard panel on empty response", async () => {
    const snap = await installSnap();

    const { unmock } = await snap.mock({
      url: API_URL_TRANSACTION_ANALYZE,
      response: {
        status: 200,
        body: JSON.stringify({}),
        contentType: "application/json",
      },
    });

    const response = await snap.sendTransaction({
      chainId: ETH_MAINNET_CHAIN_ID,
    });

    const expected = getStandardPanel();

    expect(response).toRender(expected);
    unmock();
  });

  it("show base response with heading from backend", async () => {
    const snap = await installSnap();

    const { unmock } = await snap.mock({
      url: API_URL_TRANSACTION_ANALYZE,
      response: {
        status: 200,
        body: JSON.stringify(OkResponseMock),
        contentType: "application/json",
      },
    });

    const response = await snap.sendTransaction({
      chainId: ETH_MAINNET_CHAIN_ID,
    });

    const expected = panel([heading("Test data")]);

    expect(response).toRender(expected);
    unmock();
  });
});
