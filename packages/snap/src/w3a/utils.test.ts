import { divider, heading } from "@metamask/snaps-ui";
import { NODE_TYPE } from "./interfaces";
import { renderLayoutFromSnapResponse } from "./utils";

describe("render Layout From Snap Response", () => {
  it("should return empty array on unknown component", async () => {
    const mockResponse = [{ node: "fakeNode", data: "Test data" }];
    // @ts-ignore
    const layout = renderLayoutFromSnapResponse(mockResponse);
    expect(layout).toEqual([]);
  });

  it("should return data correctly", async () => {
    const mockResponse = [{ node: NODE_TYPE.HEADING, data: "Test data" }];
    const layout = renderLayoutFromSnapResponse(mockResponse);
    expect(layout).toEqual([heading("Test data")]);
  });

  it("should return panel with no data without text", async () => {
    const mockResponse = [{ node: NODE_TYPE.DIVIDER }];
    const layout = renderLayoutFromSnapResponse(mockResponse);
    expect(layout).toEqual([divider()]);
  });
});
