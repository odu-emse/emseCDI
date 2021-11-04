"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dir = void 0;
const fs_1 = __importDefault(require("fs"));
const dir = () => {
    try {
        // @ts-ignore
        let arr = [];
        fs_1.default.readdir(`${__dirname}/../assets/modules`, (err, files) => {
            if (err) {
                console.error(err);
                return null;
            }
            else {
                files.forEach((file) => {
                    arr.push(file);
                });
                return arr;
            }
        });
        return arr;
    }
    catch (e) {
        console.error(e);
        return null;
    }
};
exports.dir = dir;
