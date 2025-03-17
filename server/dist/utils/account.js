"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterAccountInputData = void 0;
const account_1 = require("../types/account");
const filterAccountInputData = (account) => {
    const supportedProps = Object.keys(account_1.ZAccountInput.shape);
    return supportedProps.reduce((acc, prop) => {
        if (account.hasOwnProperty(prop)) {
            acc[prop] = account[prop];
        }
        return acc;
    }, {});
};
exports.filterAccountInputData = filterAccountInputData;
