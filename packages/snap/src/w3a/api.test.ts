import * as api from "./api";
import { SnapApiError } from "./";
import { NODE_TYPE } from "./interfaces";

const mockTransaction = {
  chainId: "eip155:10",
  transaction: { from: "", to: "" },
};

describe("API Request", () => {
  it("should throw error on failed fetch", async () => {
    jest
      .spyOn(global, "fetch")
      .mockResolvedValueOnce({ status: 400, ok: false } as Response);

    const apiCall = async () => {
      await api.getTransactionAnalyze(
        mockTransaction.transaction,
        mockTransaction.chainId
      );
    };

    expect(apiCall).rejects.toThrow();
  });

  it("should return data on success fetch", async () => {
    const panelsItems = [{ node: NODE_TYPE.HEADING, data: "Test data" }];

    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      status: 200,
      ok: true,
      json: () => Promise.resolve(panelsItems),
    } as Response);

    const result = await api.getTransactionAnalyze(
      mockTransaction.transaction,
      mockTransaction.chainId
    );

    expect(result).toEqual(panelsItems);
  });
});
