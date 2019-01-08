/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./store */ \"./src/store.tsx\");\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_store__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _service_block__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./service-block */ \"./src/service-block.tsx\");\n/* harmony import */ var _service_location_service_channel_block__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./service-location-service-channel-block */ \"./src/service-location-service-channel-block.tsx\");\n\n\n\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "./src/search-input.tsx":
/*!******************************!*\
  !*** ./src/search-input.tsx ***!
  \******************************/
/*! exports provided: SearchInput */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SearchInput\", function() { return SearchInput; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\nvar __ = wp.i18n.__;\n/**\n * Search input component\n */\nvar SearchInput = /** @class */ (function (_super) {\n    __extends(SearchInput, _super);\n    /**\n     * Constructor\n     *\n     * @param props props\n     */\n    function SearchInput(props) {\n        var _this = _super.call(this, props) || this;\n        /**\n         * Event handler for handling use input changes\n         *\n         * @param event event\n         */\n        _this.onInputChange = function (event) {\n            var apiFetch = wp.apiFetch;\n            var value = event.currentTarget.value;\n            if (_this.state.searching || value.length < 3) {\n                return;\n            }\n            var body = new URLSearchParams();\n            body.append(\"action\", _this.props.searchAction);\n            body.append(\"data\", value);\n            _this.setState({ searching: true });\n            apiFetch({ url: ajaxurl, method: \"POST\", body: body }).then(function (result) {\n                _this.setState({ searching: false, entities: result });\n            });\n        };\n        _this.state = {\n            entities: [],\n            searching: false,\n            hoverIndex: -1\n        };\n        return _this;\n    }\n    /**\n     * Component render method\n     */\n    SearchInput.prototype.render = function () {\n        var _this = this;\n        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { style: this.props.style },\n            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(wp.components.BaseControl, { style: { width: \"100%\" }, id: \"search\", label: this.props.inputLabel, help: this.props.inputHelp },\n                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", { id: \"search\", style: { width: \"100%\" }, onChange: this.onInputChange })),\n            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { style: { height: \"300px\", overflowY: \"auto\" } }, this.state.searching ? (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(wp.components.Placeholder, { style: { height: \"300px\" } },\n                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(wp.components.Spinner, null))) : this.state.entities.map(function (entity, index) {\n                return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { onMouseOver: function () { return _this.setState({ hoverIndex: index }); }, onClick: function () { return _this.props.onSelect(entity); }, style: { fontWeight: _this.state.hoverIndex == index ? \"bold\" : \"normal\", cursor: \"pointer\", paddingTop: \"5px\", paddingBottom: \"5px\" }, key: entity.id }, _this.props.getDisplayName(entity));\n            }))));\n    };\n    return SearchInput;\n}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component));\n\n\n\n//# sourceURL=webpack:///./src/search-input.tsx?");

/***/ }),

/***/ "./src/search-modal.tsx":
/*!******************************!*\
  !*** ./src/search-modal.tsx ***!
  \******************************/
/*! exports provided: SearchModal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SearchModal\", function() { return SearchModal; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _search_input__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./search-input */ \"./src/search-input.tsx\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\n\nvar __ = wp.i18n.__;\n/**\n * Search modal component\n */\nvar SearchModal = /** @class */ (function (_super) {\n    __extends(SearchModal, _super);\n    /**\n     * Constructor\n     *\n     * @param props props\n     */\n    function SearchModal(props) {\n        return _super.call(this, props) || this;\n    }\n    /**\n     * Event handler for handling search input select\n     *\n     * @param data selected data\n     */\n    SearchModal.prototype.onSelect = function (data) {\n        this.props.onSelect(data);\n    };\n    /**\n     * Component render method\n     */\n    SearchModal.prototype.render = function () {\n        var _this = this;\n        if (!this.props.open) {\n            return null;\n        }\n        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(wp.components.Modal, { style: { minWidth: \"60%\" }, title: this.props.modalTitle, onRequestClose: function () { return _this.props.onClose(); } },\n            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_search_input__WEBPACK_IMPORTED_MODULE_1__[\"SearchInput\"], { inputLabel: this.props.inputLabel, inputHelp: this.props.inputHelp, getDisplayName: this.props.getDisplayName, searchAction: this.props.searchAction, onSelect: function (data) { return _this.onSelect(data); }, style: { width: \"100%\" } })));\n    };\n    return SearchModal;\n}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component));\n\n\n\n//# sourceURL=webpack:///./src/search-modal.tsx?");

/***/ }),

/***/ "./src/service-block.tsx":
/*!*******************************!*\
  !*** ./src/service-block.tsx ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _service_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./service-component */ \"./src/service-component.tsx\");\n\n\nvar __ = wp.i18n.__;\n/**\n * Registers block type\n *\n * Icon from https://fontawesome.com/v4.7.0/icon/info\n */\nwp.blocks.registerBlockType('kunta-api/service', {\n    title: __('Kunta API Service', 'kunta_api_core'),\n    icon: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"svg\", { \"aria-hidden\": \"true\", width: \"0.46em\", height: \"1em\", preserveAspectRatio: \"xMidYMid meet\", viewBox: \"0 0 640 1408\" },\n        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"path\", { d: \"M640 1216v128q0 26-19 45t-45 19H64q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h64V768H64q-26 0-45-19T0 704V576q0-26 19-45t45-19h384q26 0 45 19t19 45v576h64q26 0 45 19t19 45zM512 64v192q0 26-19 45t-45 19H192q-26 0-45-19t-19-45V64q0-26 19-45t45-19h256q26 0 45 19t19 45z\", fill: \"#626262\" })),\n    category: 'layout',\n    attributes: {\n        serviceId: {\n            type: 'string'\n        },\n        component: {\n            type: 'string'\n        },\n        lang: {\n            type: 'string'\n        }\n    },\n    /**\n     * Block type edit method\n     */\n    edit: (function (params) {\n        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_service_component__WEBPACK_IMPORTED_MODULE_1__[\"default\"], { component: params.attributes.component, lang: params.attributes.lang, serviceId: params.attributes.serviceId, onComponentChange: function (component) {\n                params.setAttributes({ \"component\": component });\n            }, onLangChange: function (lang) {\n                params.setAttributes({ \"lang\": lang });\n            }, onServiceIdChange: function (serviceId) {\n                params.setAttributes({ \"serviceId\": serviceId });\n            } }));\n    }),\n    /**\n     * Block type save method\n     */\n    save: function () {\n        return null;\n    }\n});\n\n\n//# sourceURL=webpack:///./src/service-block.tsx?");

/***/ }),

/***/ "./src/service-component.tsx":
/*!***********************************!*\
  !*** ./src/service-component.tsx ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _search_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./search-modal */ \"./src/search-modal.tsx\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\n\nvar __ = wp.i18n.__;\n/**\n * Service location block\n */\nvar ServiceComponent = /** @class */ (function (_super) {\n    __extends(ServiceComponent, _super);\n    /*\n     * Constructor\n     *\n     * @param props props\n     */\n    function ServiceComponent(props) {\n        var _this = _super.call(this, props) || this;\n        _this.state = {\n            isOpen: false,\n            component: _this.props.component,\n            lang: _this.props.lang,\n            serviceId: _this.props.serviceId\n        };\n        return _this;\n    }\n    /**\n     * Component did update life-cycle event\n     *\n     * @param prevProps previous props\n     * @param prevState previous state\n     */\n    ServiceComponent.prototype.componentDidUpdate = function (prevProps, prevState) {\n        if (this.state.component !== prevState.component) {\n            this.props.onComponentChange(this.state.component);\n        }\n        if (this.state.lang !== prevState.lang) {\n            this.props.onLangChange(this.state.lang);\n        }\n        if (this.state.serviceId !== prevState.serviceId) {\n            this.props.onServiceIdChange(this.state.serviceId);\n        }\n    };\n    /**\n     * Component render method\n     */\n    ServiceComponent.prototype.render = function () {\n        var _this = this;\n        var Button = wp.components.Button;\n        var components = [\n            \"description\",\n            \"userInstruction\",\n            \"languages\",\n            \"electronicServiceChannelIds\",\n            \"phoneServiceChannelIds\",\n            \"printableFormServiceChannelIds\",\n            \"serviceLocationServiceChannelIds\",\n            \"webPageServiceChannelIds\",\n        ];\n        var languages = [\"fi\", \"sv\", \"en\"];\n        var componentOptions = components.map(function (component) {\n            return { label: __(\"servicecomponent.\" + component, 'kunta_api_core'), value: component };\n        });\n        var languageOptions = languages.map(function (language) {\n            return { label: __(\"language.\" + language, 'kunta_api_core'), value: language };\n        });\n        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null,\n            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null,\n                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { style: { float: \"right\" } },\n                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Button, { className: \"button\", isDefault: true, onClick: function () { return _this.setState({ isOpen: true }); } }, __('Change service', 'kunta_api_core'))),\n                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { style: { fontSize: \"16px\" } },\n                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { style: { float: \"left\", paddingRight: \"5px\" } }, __('Current service:', 'kunta_api_core')),\n                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(wp.components.ServerSideRender, { block: \"kunta-api/service\", attributes: {\n                            serviceId: this.state.serviceId,\n                            lang: this.state.lang,\n                            component: this.state.component\n                        }, urlQueryArgs: { displayName: true } }))),\n            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(wp.components.SelectControl, { label: __(\"Component\", 'kunta_api_core'), value: this.state.component, options: componentOptions, onChange: function (component) {\n                    _this.setState({ component: component });\n                } }),\n            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(wp.components.SelectControl, { label: __(\"Language\", 'kunta_api_core'), value: this.state.lang, options: languageOptions, onChange: function (lang) {\n                    _this.setState({ lang: lang });\n                } }),\n            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_search_modal__WEBPACK_IMPORTED_MODULE_1__[\"SearchModal\"], { modalTitle: __(\"Search Services\", 'kunta_api_core'), inputLabel: __(\"Search Services\", \"kunta_api_core\"), inputHelp: __(\"Enter some text to search services\", \"kunta_api_core\"), searchAction: \"kunta_api_search_services\", open: this.state.isOpen, getDisplayName: function (entity) {\n                    var names = entity.names || [];\n                    names.sort(function (a, b) {\n                        return a.language === 'fi' ? -1 : 1;\n                    });\n                    return names.length ? names[0].value : null;\n                }, onSelect: function (data) {\n                    _this.setState({ isOpen: false, serviceId: data.id });\n                }, onClose: function () { return _this.setState({ isOpen: false }); } }),\n            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"hr\", null),\n            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(wp.components.ServerSideRender, { block: \"kunta-api/service\", attributes: {\n                    serviceId: this.state.serviceId,\n                    lang: this.state.lang,\n                    component: this.state.component\n                }, urlQueryArgs: { preview: true } })));\n    };\n    return ServiceComponent;\n}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component));\n/* harmony default export */ __webpack_exports__[\"default\"] = (ServiceComponent);\n\n\n//# sourceURL=webpack:///./src/service-component.tsx?");

/***/ }),

/***/ "./src/service-location-page-checkbox.tsx":
/*!************************************************!*\
  !*** ./src/service-location-page-checkbox.tsx ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\nvar withSelect = wp.data.withSelect;\nvar __ = wp.i18n.__;\n/**\n * mark location channel modal component\n */\nvar ServiceLocationPageCheckbox = /** @class */ (function (_super) {\n    __extends(ServiceLocationPageCheckbox, _super);\n    /**\n     * Constructor\n     *\n     * @param props props\n     */\n    function ServiceLocationPageCheckbox(props) {\n        return _super.call(this, props) || this;\n    }\n    /**\n     * Component render method\n     */\n    ServiceLocationPageCheckbox.prototype.render = function () {\n        var _this = this;\n        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(wp.components.CheckboxControl, { label: __(\"Service location page\", \"kunta_api_core\"), checked: this.props.isChecked, onChange: function (isChecked) {\n                if (isChecked) {\n                    wp.data.dispatch(\"kunta-api/service-location-service-channel\").addChannel(_this.props.channelId);\n                }\n                else {\n                    wp.data.dispatch(\"kunta-api/service-location-service-channel\").removeChannel(_this.props.channelId);\n                }\n            } }));\n    };\n    return ServiceLocationPageCheckbox;\n}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component));\n/* harmony default export */ __webpack_exports__[\"default\"] = (withSelect(function (select, ownProps) {\n    var isChannelPage = select(\"kunta-api/service-location-service-channel\").isChannelPage;\n    var channelId = ownProps.channelId;\n    return {\n        isChecked: isChannelPage(channelId)\n    };\n})(ServiceLocationPageCheckbox));\n\n\n//# sourceURL=webpack:///./src/service-location-page-checkbox.tsx?");

/***/ }),

/***/ "./src/service-location-service-channel-block.tsx":
/*!********************************************************!*\
  !*** ./src/service-location-service-channel-block.tsx ***!
  \********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _service_location_service_channel_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./service-location-service-channel-component */ \"./src/service-location-service-channel-component.tsx\");\n\n\nvar __ = wp.i18n.__;\n/**\n * Registers block type\n */\nwp.blocks.registerBlockType('kunta-api/service-location-service-channel', {\n    title: __('Kunta API Service Location', 'kunta_api_core'),\n    icon: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"svg\", { \"aria-hidden\": \"true\", width: \"0.79em\", height: \"1em\", preserveAspectRatio: \"xMidYMid meet\", viewBox: \"0 0 1408 1792\" },\n        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"path\", { d: \"M1344 0q26 0 45 19t19 45v1664q0 26-19 45t-45 19H64q-26 0-45-19t-19-45V64q0-26 19-45T64 0h1280zM512 288v64q0 14 9 23t23 9h64q14 0 23-9t9-23v-64q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23zm0 256v64q0 14 9 23t23 9h64q14 0 23-9t9-23v-64q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23zm0 256v64q0 14 9 23t23 9h64q14 0 23-9t9-23v-64q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23zm0 256v64q0 14 9 23t23 9h64q14 0 23-9t9-23v-64q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23zm-128 320v-64q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v64q0 14 9 23t23 9h64q14 0 23-9t9-23zm0-256v-64q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v64q0 14 9 23t23 9h64q14 0 23-9t9-23zm0-256v-64q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v64q0 14 9 23t23 9h64q14 0 23-9t9-23zm0-256v-64q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v64q0 14 9 23t23 9h64q14 0 23-9t9-23zm0-256v-64q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v64q0 14 9 23t23 9h64q14 0 23-9t9-23zm512 1280v-192q0-14-9-23t-23-9H544q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm0-512v-64q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v64q0 14 9 23t23 9h64q14 0 23-9t9-23zm0-256v-64q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v64q0 14 9 23t23 9h64q14 0 23-9t9-23zm0-256v-64q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v64q0 14 9 23t23 9h64q14 0 23-9t9-23zm0-256v-64q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v64q0 14 9 23t23 9h64q14 0 23-9t9-23zm256 1024v-64q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v64q0 14 9 23t23 9h64q14 0 23-9t9-23zm0-256v-64q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v64q0 14 9 23t23 9h64q14 0 23-9t9-23zm0-256v-64q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v64q0 14 9 23t23 9h64q14 0 23-9t9-23zm0-256v-64q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v64q0 14 9 23t23 9h64q14 0 23-9t9-23zm0-256v-64q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v64q0 14 9 23t23 9h64q14 0 23-9t9-23z\", fill: \"#626262\" })),\n    category: 'layout',\n    attributes: {\n        channelId: {\n            type: 'string'\n        },\n        component: {\n            type: 'string'\n        },\n        lang: {\n            type: 'string'\n        },\n        serviceLocationPage: {\n            type: 'boolean'\n        }\n    },\n    /**\n     * Block type edit method\n     */\n    edit: (function (params) {\n        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_service_location_service_channel_component__WEBPACK_IMPORTED_MODULE_1__[\"default\"], { component: params.attributes.component, lang: params.attributes.lang, channelId: params.attributes.channelId, serviceLocationPage: params.attributes.serviceLocationPage, onComponentChange: function (component) {\n                params.setAttributes({ \"component\": component });\n            }, onLangChange: function (lang) {\n                params.setAttributes({ \"lang\": lang });\n            }, onChannelIdChange: function (channelId) {\n                params.setAttributes({ \"channelId\": channelId });\n            }, onServiceLocationPageChange: function (serviceLocationPage) {\n                params.setAttributes({ \"serviceLocationPage\": serviceLocationPage });\n            } }));\n    }),\n    /**\n     * Block type save method\n     */\n    save: function () {\n        return null;\n    }\n});\n\n\n//# sourceURL=webpack:///./src/service-location-service-channel-block.tsx?");

/***/ }),

/***/ "./src/service-location-service-channel-component.tsx":
/*!************************************************************!*\
  !*** ./src/service-location-service-channel-component.tsx ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _search_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./search-modal */ \"./src/search-modal.tsx\");\n/* harmony import */ var _service_location_page_checkbox__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./service-location-page-checkbox */ \"./src/service-location-page-checkbox.tsx\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\n\n\nvar __ = wp.i18n.__;\nvar subscribe = wp.data.subscribe;\n/**\n * Service location block\n */\nvar ServiceLocationServiceChannelComponent = /** @class */ (function (_super) {\n    __extends(ServiceLocationServiceChannelComponent, _super);\n    /*\n     * Constructor\n     *\n     * @param props props\n     */\n    function ServiceLocationServiceChannelComponent(props) {\n        var _this = _super.call(this, props) || this;\n        _this.state = {\n            isOpen: false,\n            component: _this.props.component,\n            lang: _this.props.lang,\n            channelId: _this.props.channelId,\n            serviceLocationPage: _this.props.serviceLocationPage\n        };\n        subscribe(function () {\n            var isChannelPage = wp.data.select(\"kunta-api/service-location-service-channel\").isChannelPage;\n            _this.setState({\n                serviceLocationPage: isChannelPage(_this.state.channelId)\n            });\n        });\n        return _this;\n    }\n    /**\n     * Component did update life-cycle event\n     *\n     * @param prevProps previous props\n     * @param prevState previous state\n     */\n    ServiceLocationServiceChannelComponent.prototype.componentDidUpdate = function (prevProps, prevState) {\n        if (this.state.component !== prevState.component) {\n            this.props.onComponentChange(this.state.component);\n        }\n        if (this.state.lang !== prevState.lang) {\n            this.props.onLangChange(this.state.lang);\n        }\n        if (this.state.channelId !== prevState.channelId) {\n            this.props.onChannelIdChange(this.state.channelId);\n        }\n        if (this.state.serviceLocationPage !== prevState.serviceLocationPage) {\n            this.props.onServiceLocationPageChange(this.state.serviceLocationPage);\n        }\n    };\n    /**\n     * Component render method\n     */\n    ServiceLocationServiceChannelComponent.prototype.render = function () {\n        var _this = this;\n        var Button = wp.components.Button;\n        var components = [\n            \"description\",\n            \"adresses\",\n            \"email\",\n            \"fax\",\n            \"name\",\n            \"phone\",\n            \"phone-charge-info\",\n            \"servicehours\",\n            \"webpages\"\n        ];\n        var languages = [\"fi\", \"sv\", \"en\"];\n        var componetOptions = components.map(function (component) {\n            return { label: __(\"servicelocationservicechannel.\" + component, 'kunta_api_core'), value: component };\n        });\n        var languageOptions = languages.map(function (language) {\n            return { label: __(\"language.\" + language, 'kunta_api_core'), value: language };\n        });\n        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null,\n            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null,\n                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { style: { float: \"right\" } },\n                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Button, { className: \"button\", isDefault: true, onClick: function () { return _this.setState({ isOpen: true }); } }, __('Change service location', 'kunta_api_core'))),\n                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { style: { fontSize: \"16px\" } },\n                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { style: { float: \"left\", paddingRight: \"5px\" } }, __('Current service location:', 'kunta_api_core')),\n                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(wp.components.ServerSideRender, { block: \"kunta-api/service-location-service-channel\", attributes: {\n                            channelId: this.state.channelId,\n                            lang: this.state.lang,\n                            component: this.state.component\n                        }, urlQueryArgs: { displayName: true } }))),\n            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(wp.components.SelectControl, { label: __(\"Component\", 'kunta_api_core'), value: this.state.component, options: componetOptions, onChange: function (component) {\n                    _this.setState({ component: component });\n                } }),\n            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(wp.components.SelectControl, { label: __(\"Language\", 'kunta_api_core'), value: this.state.lang, options: languageOptions, onChange: function (lang) {\n                    _this.setState({ lang: lang });\n                } }),\n            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_search_modal__WEBPACK_IMPORTED_MODULE_1__[\"SearchModal\"], { modalTitle: __(\"Search Services Locations\", 'kunta_api_core'), inputLabel: __(\"Search Services Locations\", \"kunta_api_core\"), inputHelp: __(\"Enter some text to search service locations\", \"kunta_api_core\"), searchAction: \"kunta_api_search_service_location_channels\", open: this.state.isOpen, getDisplayName: function (entity) {\n                    var names = entity.names || [];\n                    names.sort(function (a, b) {\n                        return a.language === 'fi' ? -1 : 1;\n                    });\n                    return names.length ? names[0].value : null;\n                }, onSelect: function (data) {\n                    _this.setState({ isOpen: false, channelId: data.id });\n                }, onClose: function () { return _this.setState({ isOpen: false }); } }),\n            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_service_location_page_checkbox__WEBPACK_IMPORTED_MODULE_2__[\"default\"], { channelId: this.state.channelId, onChange: function (isChecked) {\n                    _this.setState({ serviceLocationPage: isChecked });\n                } }),\n            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"hr\", null),\n            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(wp.components.ServerSideRender, { block: \"kunta-api/service-location-service-channel\", attributes: {\n                    channelId: this.state.channelId,\n                    lang: this.state.lang,\n                    component: this.state.component\n                }, urlQueryArgs: { preview: true } })));\n    };\n    return ServiceLocationServiceChannelComponent;\n}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component));\n/* harmony default export */ __webpack_exports__[\"default\"] = (ServiceLocationServiceChannelComponent);\n\n\n//# sourceURL=webpack:///./src/service-location-service-channel-component.tsx?");

/***/ }),

/***/ "./src/store.tsx":
/*!***********************!*\
  !*** ./src/store.tsx ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var __assign = (this && this.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nvar registerStore = wp.data.registerStore;\n/**\n * Actions for kunta-api/service-location-service-channel store\n */\nvar actions = {\n    addChannel: function (channelId) {\n        return {\n            type: 'ADD_CHANNEL',\n            channelId: channelId\n        };\n    },\n    removeChannel: function (channelId) {\n        return {\n            type: 'REMOVE_CHANNEL',\n            channelId: channelId\n        };\n    }\n};\n/**\n * Register kunta-api/service-location-service-channel store\n */\nregisterStore(\"kunta-api/service-location-service-channel\", {\n    reducer: function (storeState, action) {\n        if (storeState === void 0) { storeState = { channelIds: [] }; }\n        switch (action.type) {\n            case \"ADD_CHANNEL\":\n                return __assign({}, storeState, { channelIds: (storeState.channelIds || []).concat(action.channelId) });\n            case \"REMOVE_CHANNEL\":\n                return __assign({}, storeState, { channelIds: (storeState.channelIds || []).filter(function (channelId) { return channelId !== action.channelId; }) });\n        }\n        return storeState;\n    },\n    actions: actions,\n    selectors: {\n        isChannelPage: function (storeState, channelId) {\n            return (storeState.channelIds || []).indexOf(channelId) > -1;\n        },\n    },\n    resolvers: {\n        isChannelPage: function (channelId) {\n            var serviceLocationPage = wp.data.select(\"core/editor\").getBlocks().filter(function (block) {\n                var attrs = block.attributes;\n                return block.name === \"kunta-api/service-location-service-channel\" && attrs && attrs.channelId == channelId && attrs.serviceLocationPage;\n            }).length > 0;\n            if (serviceLocationPage) {\n                return actions.addChannel(channelId);\n            }\n            else {\n                return actions.removeChannel(channelId);\n            }\n        }\n    }\n});\n\n\n//# sourceURL=webpack:///./src/store.tsx?");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = React;\n\n//# sourceURL=webpack:///external_%22React%22?");

/***/ })

/******/ });