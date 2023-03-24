import { describe, it, expect } from "vitest";
import is from "./isNativeToggleableAttribute";

describe("isDataAttribute", () => {
  it.each([
    "contenteditable",
    "autofocus",
    "autoplay",
    "allowfullscreen",
    "allowpaymentreques",
    "checked",
    "controls",
    "compact",
    "disabled",
    "hidden",
    "ismap",
    "loop",
    "multiple",
    "muted",
    "open",
    "playsinline",
    "readonly",
    "required",
    "selected",
    "async",
    "defer",
  ])("should check if (%s) is toggleable => true", (attr) => {
    expect(is(attr)).toBe(true);
  });

  it.each(["class", "style", "id"])("should check if (%s) is toggleable => false", (attr) => {
    expect(is(attr)).toBe(false);
  });
});
