export const isOnEventName = (name: string): boolean => {
    if (typeof name !== "string") return false;

    const onEventRegex = /on[a-z]{1,}/;

    if (!onEventRegex.test(name)) {
        return false;
    }

    return true;
};

export const setEvent = (onEventName: string, callback: (e: Event) => void, element: Element) => {
    if (element instanceof Element === false) return;
    if (typeof callback !== "function") return;

    if (!isOnEventName(onEventName)) {
        return;
    }

    (element as Record<string, any>)[onEventName] = callback;
};

export const removeEvent = (onEventName: string, element: Element) => {
    if (element instanceof Element === false) return;

    if (!isOnEventName(onEventName)) {
        return;
    }

    (element as any)[onEventName] = null;
};
