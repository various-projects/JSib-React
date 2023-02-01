import { makeComplete, Route } from "../../models/routing/route";

const uriParseRegex = /^((\w+)\/?(\/(\d+)|))\/?(\/(\d+)|)?$/;

export const completeMessageReference = (stringPath: string, completionData: Route) => {
    if (!uriParseRegex.test(stringPath)) {
        throw new Error(`Unparsable ref: ${stringPath}`);
    }

    let parts = stringPath.split("/");

    const parsedRoute = {
        message: parts.pop(),
        thread: parts.pop(),
        board: parts.pop(),
    };

    return makeComplete({
        message: (parsedRoute.message && parseInt(parsedRoute.message)) as undefined | number,
        thread: (parsedRoute.thread && parseInt(parsedRoute.thread)) as undefined | number,
        board: parsedRoute.board,
    }, completionData);
};