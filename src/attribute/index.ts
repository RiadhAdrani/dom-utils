const toggleAttributes = [
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
];

export const isToggleAttribute = (attribute: string) => {
    return toggleAttributes.includes(attribute.trim());
};

export const setAttribute = (attribute: string, value: string | boolean, element: Element) => {
    if (toggleAttributes.includes(attribute)) {
        element.toggleAttribute(attribute, (value as boolean) === true);
    } else {
        element.setAttribute(attribute, value as string);
    }
};

export const removeAttribute = (attribute: string, element: Element) => {
    if (toggleAttributes.includes(attribute)) {
        element.toggleAttribute(attribute, false);
    } else {
        element.removeAttribute(attribute);
    }
};
