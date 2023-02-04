import { Route } from "../../models/routing/route";
import { basicTags } from "./markupTags";
import * as MessageRef from "../../components/MessageRef";

/**
 * Converts message markup (≈ basic wakaba-mark/markdown) into HTML tags.
 * @param markup Markup text
 * @returns HTML markup with markup converted to tags.
 */
const markupToHtml = (markup: string) =>
    Object
        .entries(basicTags)
        .reduce(
            (markup, [_, rule]) =>
                markup.replaceAll(rule.regex, rule.replacement),
            markup)
        .replaceAll(MessageRef.markupRegex, MessageRef.matchToTag);

const simpleTags = new Set(Object.keys(basicTags));

/**
 * Takes an HTML Node and converts it and all of its [allowed] child nodes into React elements.
 * @param node HTML Node to convert
 * @param getRefContent Returns what should be shown on message reference expand.
 * @param baseRoute Route to the current message, needed for message references that could be either relative to the message's original thread and board.
 * @param idx For children arrays we use this as React 'key'.
 * @returns Resulting React element.
 */
const nodeToReactElement = (node: Node, getRefContent: (route: Route) => Promise<JSX.Element>, baseRoute: Route, idx?: number) => {
    const tagName = node.nodeName.toLowerCase();

    if (simpleTags.has(tagName)){
        const TagName = tagName as keyof JSX.IntrinsicElements;
        return <TagName key={idx}>{[...node.childNodes].map((val, idx) => nodeToReactElement(val, getRefContent, baseRoute, idx))}</TagName>;
    }

    if(tagName === MessageRef.tagName)
        return MessageRef.nodeToReactElement(node as HTMLElement, getRefContent, baseRoute);

    return (node.nodeType === 1)
        ? node.textContent || ""
        : (node as HTMLElement).outerHTML;
};

/**
 * Renders message's markup into a React element.
 * @param markup Message text markup.
 * @param getRefContent Returns what should be shown on message reference expand.
 * @param baseRoute Route to the current message, needed for message references that could be either relative to the message's original thread and board.
 * @param idx For children arrays we use this as React 'key'.
 * @returns Resulting React element.
 */
export const renderMarkup = (markup: string, getRefContent: (route: Route) => Promise<JSX.Element>, baseRoute: Route): string | JSX.Element => {
    const html = markupToHtml(markup);
    const container = document.createElement("div");
    container.innerHTML = html;

    return nodeToReactElement(container, getRefContent, baseRoute);
}