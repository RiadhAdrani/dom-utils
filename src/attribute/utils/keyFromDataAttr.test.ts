import { describe, it, expect } from "vitest";
import from from "./keyFromDataAttr";

describe("isDataAttribute", () => {
  it.each([
    ["data-title", "title"],
    ["data-my-attr", "myAttr"],
    ["data-ns:svg", "nsSvg"],
  ])("should convert (%s) to data key (%s)", (attr, res) => {
    expect(from(attr)).toBe(res);
  });

  it("should return undefined when attribute is not of data", () => {
    expect(from("data:ns")).toBe(undefined);
  });
});
