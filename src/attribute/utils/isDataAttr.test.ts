import { describe, it, expect } from "vitest";
import is from "./isDataAttr";

describe("isDataAttribute", () => {
  it.each([["data-title"], ["data-my-attr"]])("should affirm attribute (%s)", (attr) => {
    expect(is(attr)).toBe(true);
  });

  it.each([["class"], ["dataTitle"], ["dataMy-attr"]])(
    "should reject badly formatted attribute (%s)",
    (attr) => {
      expect(is(attr)).toBe(false);
    }
  );
});
