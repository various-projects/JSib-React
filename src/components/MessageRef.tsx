import { Route } from "../models/routing/route";
import { useState } from "react";
import { completeMessageReference } from "../features/routing/routing";

type Props = {
    link: string,
    getMessageContent: (route: Route) => Promise<JSX.Element>,
    baseRoute: Route,
}

export const tagName = "ref";
export const markupRegex = />>((\w+\/|)(\d+\/|)\d+)/g;
export const matchToTag = (...match: string[]) => `<ref target=${match[1]}>${match[0]}</ref>`;

const loadingPlaceholder = <div>Loading…</div>;

export const MessageRef = (props: Props) => {
    const linkRoute = completeMessageReference(props.link, props.baseRoute);
    const [isExpanded, setIsExpanded] = useState(false);
    const [message, setMessage] = useState<JSX.Element | null>(null);

    const onClick = async (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        const messageContent = message || await props.getMessageContent(linkRoute);
        setMessage(messageContent);
        setIsExpanded(!isExpanded);
    }

    return (
        <>
            <a
                onClick={onClick}
                className="msg_ref"
                href={`#${linkRoute.uri}`}
            >
                {`>>${props.link}`}
            </a>
            {isExpanded && (message || loadingPlaceholder)}
        </>)
        ;
}


export const nodeToReactElement = (node: HTMLElement, getMessageContent: (route: Route) => Promise<JSX.Element>, baseRoute: Route) =>
    <MessageRef link={node.getAttribute("target") || ""} baseRoute={baseRoute} getMessageContent={getMessageContent} />