"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dir = void 0;
// @ts-ignore
const fs_1 = __importDefault(require("fs"));
//
const dir = () => {
    fs_1.default.readdir(`${__dirname}/../assets/modules`, (err, files) => {
        console.log('dir');
        if (err)
            console.log(err);
        else {
            console.log('\nCurrent directory filenames:');
            files.forEach((file) => {
                console.log(file);
            });
        }
    });
};
exports.dir = dir;
console.log('here');
