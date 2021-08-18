export const getPosition = function getPosition(pos, params, dom, rect, size) {
    return {
        top: pos[1] - size.contentSize[1] - 10,
        left: pos[0] - size.contentSize[0] / 2
    };
};
