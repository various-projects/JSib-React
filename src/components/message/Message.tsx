import { MessageDto } from "../../models/message/messageDto";
import { Route } from "../../models/routing/route";
import { renderMarkup } from "../../features/markupParsing/markupParser";

type Props = {
    onMessageClick?: (route: Route) => void,
    onNumberClick?: (route: Route) => void,
    onPicClick: Function,
    onReplyClick: Function,
    getRefContent: (route: Route) => Promise<JSX.Element>,
    onGoOriginal?: (route: Route) => void,
    message: MessageDto,
    route: Route,
}

export const Message = (props: Props) => (
    <div onClick={() => props.onMessageClick?.(props.route)} className="message">
        <div className="messageHeader">
            #<a className="messageNumber" title="Go to message">{props.route.message}</a>
            left at <span className="messageDate">{props.message.date}</span>
            <a className="messageMail" href={props.message.email}><span className="messageName">{props.message.name}</span></a>
            <span className="messageTitle">{props.message.title}</span>
            {props.onGoOriginal && <a className="origThread" onClick={() => props.onGoOriginal?.(props.route)}>→original thread</a>}
            <a onClick={props.onReplyClick()} className="replyLink">→reply</a>
        </div>
        <a onClick={props.onPicClick()} href="#">
            <img className="messagePic" alt="Thumb" />
        </a>
        <span className="messageText">{renderMarkup(props.message.text, props.getRefContent, props.route)}</span>
    </div>
)