"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStructure = void 0;
const fast_glob_1 = __importDefault(require("fast-glob"));
const path_1 = require("path");
const getStructure = (source, filter, flag) => {
    let structure = [];
    const stream = fast_glob_1.default.sync([source], {
        dot: false,
        onlyFiles: filter.files,
        markDirectories: false,
        onlyDirectories: filter.dir,
        deep: filter.depth,
        absolute: false,
    });
    stream.map((file) => {
        let asset;
        if (flag === 'rsc' || flag === 'exe') {
            asset = (0, path_1.parse)(file);
            structure.push(asset.base);
        }
        else {
            asset = (0, path_1.parse)(file);
            structure.push(asset.name);
        }
    });
    return structure;
};
exports.getStructure = getStructure;
