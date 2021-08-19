import {Dropdown} from "bootstrap";

export const getPosition = function getPosition(pos, params, dom, rect, size) {
    return {
        top: pos[1] - size.contentSize[1] - 10,
        left: pos[0] - size.contentSize[0] / 2
    };
};

export const initDropDown = () => {
    const dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
    dropdownElementList.map(function (dropdownToggleEl) {
        return new Dropdown(dropdownToggleEl)
    });
}