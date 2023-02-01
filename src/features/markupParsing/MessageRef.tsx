import { Route } from "../../models/routing/route";
import { completeMessageReference } from "../routing/routing";

type Props = {
    link: string,
    onRefClick: (route: Route) => void,
    baseRoute: Route,
}

export const tagName = "ref";
export const markupRegex = />>((\w+\/|)(\d+\/|)\d+)/g;
export const matchToTag = (...match: string[]) => `<ref target=${match[1]}>${match[0]}</ref>`;

export const MessageRef = (props: Props) => {
    const linkRoute = completeMessageReference(props.link, props.baseRoute);
    return (
        <a
            onClick={(e) => { e.stopPropagation(); e.preventDefault(); props.onRefClick(linkRoute) }}
            className="msg_ref"
            href={`#${linkRoute.uri}`}
        >
            {`>>${props.link}`}
        </a >)
        ;
}


export const nodeToReactElement = (node: HTMLElement, onRefClick: (route: Route) => void, baseRoute: Route) =>
    <MessageRef link={node.getAttribute("target") || ""} baseRoute={baseRoute} onRefClick={onRefClick} />