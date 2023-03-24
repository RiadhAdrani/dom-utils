import { describe, it, expect } from "vitest";
import convert from "./convertAttributeToDomProperty";

describe("convertAttributeToDomProperty", () => {
  it.each([
    ["class", "className"],
    ["accesskey", "accessKey"],
    ["autocapitalize", "autoCapitalize"],
    ["contenteditable", "contentEditable"],
    ["contextmenu", "contextMenu"],
    ["playsinline", "playsInline"],
    ["spellcheck", "spellCheck"],
    ["tabindex", "tabIndex"],
    ["noshade", "noShade"],
    ["hreflang", "hrefLang"],
    ["referrerpolicy", "referrerPolicy"],
    ["datetime", "dateTime"],
    ["autoplay", "autoPlay"],
    ["crossorigin", "crossOrigin"],
    ["ismap", "isMap"],
    ["usemap", "useMap"],
    ["srclang", "srcLang"],
    ["allowfullscreen", "allowFullScreen"],
    ["allowpaymentrequest", "allowPaymentRequest"],
    ["srcdoc", "srcDoc"],
    ["colspan", "colSpan"],
    ["rowspan", "rowSpan"],
    ["autofocus", "autoFocus"],
    ["formaction", "formAction"],
    ["formenctype", "formEncType"],
    ["formmethod", "formMethod"],
    ["formnovalidate", "formNoValidate"],
    ["formtarget", "formTarget"],
    ["acceptcharset", "acceptCharset"],
    ["autocomplete", "autoComplete"],
    ["novalidate", "noValidate"],
    ["dirname", "dirName"],
    ["maxlength", "maxLength"],
    ["readonly", "readOnly"],
    ["minlength", "minLength"],
  ])("should convert attributes existing in htmlToDom map : (%s) -> (%s)", (attr, res) => {
    expect(convert(attr)).toBe(res);
  });

  it.each([
    ["hello-world", "helloWorld"],
    ["accent-height", "accentHeight"],
    ["units-per-em", "unitsPerEm"],
    ["x:link-arcrole", "xLinkArcrole"],
    ["yChannelSelector", "yChannelSelector"],
  ])("should return camel-cased attribute if non existing", (attr, res) => {
    expect(convert(attr)).toBe(res);
  });
});
