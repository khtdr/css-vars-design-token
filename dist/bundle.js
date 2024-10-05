/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"));
	else if(typeof define === 'function' && define.amd)
		define("CssVars", ["React"], factory);
	else if(typeof exports === 'object')
		exports["CssVars"] = factory(require("React"));
	else
		root["CssVars"] = factory(root["React"]);
})(this, (__WEBPACK_EXTERNAL_MODULE_react__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./css-vars-design-token.tsx":
/*!***********************************!*\
  !*** ./css-vars-design-token.tsx ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    var desc = Object.getOwnPropertyDescriptor(m, k);\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\n      desc = { enumerable: true, get: function() { return m[k]; } };\n    }\n    Object.defineProperty(o, k2, desc);\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n    __setModuleDefault(result, mod);\n    return result;\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.CssVarsProvider = exports.useCssTheme = exports.useDesignToken = void 0;\nexports.toCssVars = toCssVars;\nconst React = __importStar(__webpack_require__(/*! react */ \"react\"));\nconst CssVarsContext = React.createContext({});\nconst useDesignToken = () => {\n    const context = React.useContext(CssVarsContext);\n    if (!context) {\n        throw new Error('useDesignToken must be used within a CssVarsProvider');\n    }\n    return context.token;\n};\nexports.useDesignToken = useDesignToken;\nconst useCssTheme = () => {\n    const context = React.useContext(CssVarsContext);\n    if (!context) {\n        throw new Error('useCssTheme must be used within a CssVarsProvider');\n    }\n    const setTheme = React.useCallback((theme) => {\n        if (theme === 'auto') {\n            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;\n            context.setTheme(prefersDark ? 'dark' : 'light');\n        }\n        else {\n            context.setTheme(theme);\n        }\n    }, [context.setTheme]);\n    const toggle = React.useCallback(() => {\n        setTheme(context.theme === 'dark' ? 'light' : 'dark');\n    }, [context.theme, setTheme]);\n    return { theme: context.theme, setTheme, toggle };\n};\nexports.useCssTheme = useCssTheme;\nconst CssVarsProvider = ({ children, themes, style, }) => {\n    const [theme, setTheme] = React.useState(Object.keys(themes)[0]);\n    const token = themes[theme] || themes[Object.keys(themes)[0]];\n    const value = { themes, token, theme, setTheme };\n    return (React.createElement(CssVarsContext.Provider, { value: value },\n        React.createElement(\"div\", { style: Object.assign(Object.assign({ height: 'inherit', width: 'inherit' }, toCssVars(token)), style) }, children)));\n};\nexports.CssVarsProvider = CssVarsProvider;\nfunction toCssVars(obj, parentKey = '-') {\n    return Object.keys(obj).reduce((acc, key) => {\n        const prefixedKey = parentKey ? `${parentKey}-${key}` : key;\n        if (typeof obj[key] === 'object') {\n            Object.assign(acc, toCssVars(obj[key], prefixedKey));\n        }\n        else {\n            acc[prefixedKey] = obj[key];\n        }\n        return acc;\n    }, {});\n}\n\n\n//# sourceURL=webpack://CssVars/./css-vars-design-token.tsx?");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_react__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./css-vars-design-token.tsx");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});