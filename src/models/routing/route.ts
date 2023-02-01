import { PathType } from "./pathType";
import { RouteDto } from "./routeDto";

export type Route = RouteDto & {
    /** Full URI path to object as string. Appropriate to use as a link to it. */
    uri: string,
    /** Path type — what kind of object it is pointing to. */
    type: PathType,
}

const getUri = (path: RouteDto) => {
    let parts = [];
    path.board !== undefined && parts.push(path.board);
    path.thread !== undefined && parts.push(path.thread);
    path.message !== undefined && parts.push(path.message);
    return parts.join("/");
}

const GetThreadId = (route: Route) => `${route.board}/${route.thread}`;

const getRouteType = (route: RouteDto): PathType => {
    if (route.type !== undefined) {
        return route.type;
    }

    if (route.message) {
        return PathType.message;
    }

    if (route.thread) {
        return PathType.thread;
    }

    if (route.board) {
        return PathType.board;
    }

    return PathType.invalid;
}

export const makeComplete = (cripple: Readonly<Partial<Route>>, donor: Route): Route => mapFromDto({
    message: cripple.message || donor.message,
    thread: cripple.thread || donor.thread,
    board: cripple.board || donor.board,
    type: Math.max(cripple.type || 0, donor.type)
});

export const mapFromDto = (dto: RouteDto): Route => ({
    ...dto,
    type: getRouteType(dto),
    uri: getUri(dto)
});