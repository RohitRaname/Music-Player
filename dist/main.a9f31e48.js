// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"utils/_domFunction.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addClass = addClass;
exports.addClassToArrAllEl = addClassToArrAllEl;
exports.closest = closest;
exports.contains = contains;
exports.findActiveElInArr = findActiveElInArr;
exports.findEl = findEl;
exports.removeAllActiveElClassInArr = removeAllActiveElClassInArr;
exports.removeArrAllElClass = removeArrAllElClass;
exports.removeClass = removeClass;
exports.replaceClass = replaceClass;
exports.setActiveElInArr = setActiveElInArr;
exports.toggleClass = toggleClass;

function contains(target, className) {
  return target.classList.contains(className);
}

function closest(target, className) {
  return target.closest(".".concat(className));
}

function addClass(target, className) {
  target.classList.add(className);
}

function removeClass(target, className) {
  target.classList.remove(className);
}

function replaceClass(target, class1, class2) {
  target.classList.replace(class1, class2);
}

function removeArrAllElClass(arr, className) {
  arr.forEach(function (mov) {
    return mov.classList.remove(className);
  });
}

function addClassToArrAllEl(arr, className) {
  arr.forEach(function (mov) {
    return mov.classList.add(className);
  });
}

function toggleClass(target, className) {
  target.classList.toggle(className);
}

function setActiveElInArr(elementArr, target, className) {
  elementArr.forEach(function (mov) {
    return mov.classList.remove(className);
  });
  target.classList.add(className);
}

function findActiveElInArr(arr, activeClass) {
  return arr.find(function (mov) {
    return contains(mov, activeClass);
  });
}

function removeAllActiveElClassInArr(elementArr, activeClass) {
  elementArr.forEach(function (mov) {
    return mov.classList.remove(activeClass);
  });
}

function findEl(className) {
  return document.querySelector(".".concat(className));
}
},{}],"View/ParentView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _domFunction = require("../utils/_domFunction.js");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ParentView = /*#__PURE__*/function () {
  function ParentView() {
    _classCallCheck(this, ParentView);

    _defineProperty(this, "_parentEl", void 0);

    _defineProperty(this, "_body", document.querySelector("body"));

    _defineProperty(this, "_crudSelectedCount", document.querySelector(".crud__selected-items"));

    _defineProperty(this, "_allSections", _toConsumableArray(document.querySelectorAll("section")));

    _defineProperty(this, "_sectionControl", document.querySelector(".section-control"));

    _defineProperty(this, "_sectionSetting", document.querySelector(".section-searchResults"));
  }

  _createClass(ParentView, [{
    key: "getCurrentSection",
    value: function getCurrentSection() {
      return this._allSections.find(function (mov) {
        return !(0, _domFunction.contains)(mov, "hidden") && !(0, _domFunction.contains)(mov, "section-control");
      });
    }
  }, {
    key: "_toggleSectionHiddenClass",
    value: function _toggleSectionHiddenClass() {
      (0, _domFunction.addClassToArrAllEl)(this._allSections, "hidden");
      (0, _domFunction.removeClass)(this._sectionEl, "hidden");
      (0, _domFunction.removeClass)(this._sectionControl, "hidden"); // removeClass(this._sectionSetting, "hidden");
    }
  }, {
    key: "render",
    value: function render(arr) {
      var _render = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      var display = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var clearBeforeRender = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      if (this._sectionEl && display) this._toggleSectionHiddenClass();
      if (clearBeforeRender) this._parentEl.innerHTML = "";

      var html = this._generateMarkUpList(arr);

      if (!_render) return html;
      this._parentEl.innerHTML = html;
    }
  }, {
    key: "_generateMarkUpList",
    value: function _generateMarkUpList(arr) {
      var _this = this;

      return arr.map(function (mov, i) {
        return _this._generateItemMarkUp(mov, i);
      }).join("");
    }
  }, {
    key: "_generateItemMarkUp",
    value: function _generateItemMarkUp(mov) {
      return "something is not good";
    }
  }, {
    key: "_clear",
    value: function _clear() {
      this._parentEl.innerHTML = "";
    }
  }, {
    key: "removeActiveElement",
    value: function removeActiveElement(className) {
      this._body.addEventListener("click", function (e) {});
    }
  }, {
    key: "updateSelectedCardsCount",
    value: function updateSelectedCardsCount(changeCount) {
      var count = 0;

      var cardElArr = _toConsumableArray(document.querySelectorAll(".card"));

      cardElArr.forEach(function (mov) {
        if (mov.querySelector('.card__control--active[data-action="select"]')) count++;
      });
      if (changeCount) count = changeCount;
      this._crudSelectedCount.textContent = "".concat(count, " item Selected");
    }
  }]);

  return ParentView;
}();

var _default = ParentView;
exports.default = _default;
},{"../utils/_domFunction.js":"utils/_domFunction.js"}],"View/dropListView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ParentView2 = _interopRequireDefault(require("./ParentView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DropListView = /*#__PURE__*/function (_ParentView) {
  _inherits(DropListView, _ParentView);

  var _super = _createSuper(DropListView);

  function DropListView() {
    var _this;

    _classCallCheck(this, DropListView);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "_allDropListParent", _toConsumableArray(document.querySelectorAll(".drop__parent")));

    _defineProperty(_assertThisInitialized(_this), "_allDropList", _toConsumableArray(document.querySelectorAll(".drop__list")));

    _this._showOrHideDropList();

    _this._hideDropListWhenLosefocus();

    return _this;
  }

  _createClass(DropListView, [{
    key: "_generateItemMarkUp",
    value: function _generateItemMarkUp(mov) {
      if (!mov) return;
      return "<li class=\"nav__item drop__item\" data-action=\"select\" data-value=".concat(mov, ">\n            ").concat(mov, "\n            </li>");
    }
  }, {
    key: "_showOrHideDropList",
    value: function _showOrHideDropList() {
      var _iterator = _createForOfIteratorHelper(this._allDropListParent),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var dropListParent = _step.value;
          dropListParent.addEventListener("click", function (e) {
            this.classList.add("drop__parent--active");
            var target = e.target.closest(".drop__item");
            if (!target) return; // if no no more list inside

            this.classList.remove("drop__parent--active");
          });
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "_hideDropListWhenLosefocus",
    value: function _hideDropListWhenLosefocus() {
      var _this2 = this;

      var body = document.querySelector("body");
      body.addEventListener("click", function (e) {
        if (!e.target.closest(".drop__parent")) {
          var _iterator2 = _createForOfIteratorHelper(_this2._allDropListParent),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var dropParent = _step2.value;
              dropParent.classList.remove("drop__parent--active");
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
      });
    }
  }]);

  return DropListView;
}(_ParentView2.default);

var _default = new DropListView();

exports.default = _default;
},{"./ParentView.js":"View/ParentView.js"}],"View/CrudView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ParentView2 = _interopRequireDefault(require("./ParentView.js"));

var _dropListView = _interopRequireDefault(require("./dropListView.js"));

var _domFunction = require("../utils/_domFunction.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CrudView = /*#__PURE__*/function (_ParentView) {
  _inherits(CrudView, _ParentView);

  var _super = _createSuper(CrudView);

  function CrudView() {
    var _this;

    _classCallCheck(this, CrudView);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "_parentEl", document.querySelector(".crud"));

    _defineProperty(_assertThisInitialized(_this), "_cardList", document.querySelector(".section-overview .card__list"));

    _defineProperty(_assertThisInitialized(_this), "_cardElArr", _toConsumableArray(_this._cardList.querySelectorAll(".card")));

    _defineProperty(_assertThisInitialized(_this), "_selectAllBtn", document.querySelector(".card__control--crud"));

    _defineProperty(_assertThisInitialized(_this), "_addPlaylistBtnList", _this._parentEl.querySelector(".drop__list"));

    _defineProperty(_assertThisInitialized(_this), "_cardItems", _toConsumableArray(document.querySelectorAll(".section-overview .card")));

    return _this;
  }

  _createClass(CrudView, [{
    key: "renderAddPlayBtnList",
    value: function renderAddPlayBtnList(arr) {
      var html = _dropListView.default.render(arr, false);

      this._addPlaylistBtnList.innerHTML = "";

      this._addPlaylistBtnList.insertAdjacentHTML("beforeend", html);

      this._addPlaylistBtnList.insertAdjacentHTML("afterbegin", "    <li\n                class=\"nav__item drop__item\"\n                data-action=\"create\"\n                drop-value=\"\"\n              >\n                + New PlayList\n              </li>");
    }
  }, {
    key: "hide",
    value: function hide() {
      this._unSelectAllCard();

      this.updateSelectedCardsCount();
      (0, _domFunction.removeClass)(this._selectAllBtn, "card__control--active");
      (0, _domFunction.addClass)(this._parentEl, "hide");
    }
  }, {
    key: "_updateCardListEl",
    value: function _updateCardListEl() {
      this._cardElArr = _toConsumableArray(this._cardList.querySelectorAll(".card"));
    }
  }, {
    key: "_unSelectAllCard",
    value: function _unSelectAllCard() {
      (0, _domFunction.removeClass)(this._cardList, "card__list--select");

      this._cardElArr.forEach(function (mov) {
        // card control select ALL as active
        mov.querySelector('.card__control[data-action="select"]').classList.remove("card__control--active");
        mov.dataset.select = false;
      });
    }
  }, {
    key: "_selectAllCard",
    value: function _selectAllCard() {
      (0, _domFunction.addClass)(this._cardList, "card__list--select");

      this._cardElArr.forEach(function (mov) {
        mov.querySelector('.card__control[data-action="select"]').classList.add("card__control--active");
        mov.dataset.select = true;
      });
    }
  }, {
    key: "_removeSelectedCard",
    value: function _removeSelectedCard() {
      _toConsumableArray(document.querySelectorAll(".card")).forEach(function (mov) {
        if (mov.querySelector('.card__control--active[data-action="select"]')) mov.remove();
      });
    }
  }, {
    key: "_findSelectedCardIndex",
    value: function _findSelectedCardIndex() {
      var indexArr = []; // to check if card are selected

      _toConsumableArray(document.querySelectorAll(".card")).forEach(function (mov) {
        if (mov.dataset.select === "true") indexArr.push(mov.dataset.index);
      });

      return indexArr;
    }
  }, {
    key: "handleCrud",
    value: function handleCrud(handle) {
      var _this2 = this;

      this._parentEl.addEventListener("click", function (e) {
        var initalTarget = e.target;

        _this2._updateCardListEl();

        var target = e.target; // select button---------------------------------------

        if ((0, _domFunction.closest)(target, "card__control")) {
          target = (0, _domFunction.closest)(target, "card__control");
          (0, _domFunction.toggleClass)(target, "card__control--active");
          if ((0, _domFunction.contains)(target, "card__control--active")) _this2._selectAllCard();else {
            _this2._unSelectAllCard();

            (0, _domFunction.addClass)(_this2._parentEl, "hide");
          }

          _this2.updateSelectedCardsCount();
        } // to go back to normal home page ------------------------------------------


        if ((0, _domFunction.closest)(target, "crud-clear")) {
          target = (0, _domFunction.closest)(target, "crud-clear");
          (0, _domFunction.addClass)(_this2._parentEl, "hide");
          (0, _domFunction.removeClass)(_this2._selectAllBtn, "card__control--active"); // remove select element active class

          _this2._unSelectAllCard();
        } // music btns----------------------------------


        if ((0, _domFunction.closest)(target, "crud__btn")) {
          (0, _domFunction.toggleClass)(_this2._parentEl, "hide");
          target = target.closest(".crud__btn");
          var action = target.dataset.action;

          var arr = _this2._findSelectedCardIndex(); // Selected Card
          // Removing cards dom


          if (action === "remove") {
            _this2._removeSelectedCard();

            _this2.hide();

            handle("remove", arr);
          }

          if (action === "add-to-playlist") {
            (0, _domFunction.removeClass)(_this2._parentEl, "hide");
            var item = initalTarget.closest(".drop__item");
            if (!item) return handle("add-to-playlist");
            var _item$dataset = item.dataset,
                value = _item$dataset.value,
                _action = _item$dataset.action;

            if (_action === "create") {
              handle("create-playlist", arr);
            } else {
              handle("select-playlist", arr, value);
            }

            if (_action === "create-playlist" || _action === "select-playlist") _this2.hide();
          }

          if (action === "play") {
            handle("play-next", arr);

            _this2.hide();
          } // play music
          // add to playlist

        }
      });
    }
  }]);

  return CrudView;
}(_ParentView2.default);

var _default = new CrudView();

exports.default = _default;
},{"./ParentView.js":"View/ParentView.js","./dropListView.js":"View/dropListView.js","../utils/_domFunction.js":"utils/_domFunction.js"}],"View/CardView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _domFunction = require("../utils/_domFunction.js");

var _ParentView2 = _interopRequireDefault(require("./ParentView.js"));

var _CrudView = _interopRequireDefault(require("./CrudView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CardView = /*#__PURE__*/function (_ParentView) {
  _inherits(CardView, _ParentView);

  var _super = _createSuper(CardView);

  function CardView() {
    var _this;

    _classCallCheck(this, CardView);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "_parentEl", document.querySelector(".card__list"));

    _defineProperty(_assertThisInitialized(_this), "_cardListArr", _toConsumableArray(document.querySelectorAll(".card__list")));

    _defineProperty(_assertThisInitialized(_this), "_playBtn", document.querySelector(".section-control .music__play-btn"));

    _defineProperty(_assertThisInitialized(_this), "_cardEl", void 0);

    _defineProperty(_assertThisInitialized(_this), "_cardElArr", void 0);

    _defineProperty(_assertThisInitialized(_this), "_controlContainer", void 0);

    _defineProperty(_assertThisInitialized(_this), "_controlElArr", void 0);

    _defineProperty(_assertThisInitialized(_this), "_curControlActive", void 0);

    _defineProperty(_assertThisInitialized(_this), "_curCardIndex", void 0);

    _defineProperty(_assertThisInitialized(_this), "_crudContainer", document.querySelector(".crud"));

    _defineProperty(_assertThisInitialized(_this), "_body", document.querySelector("body"));

    _defineProperty(_assertThisInitialized(_this), "_normalClass", "card__control");

    _defineProperty(_assertThisInitialized(_this), "_activeClass", "card__control--active");

    _defineProperty(_assertThisInitialized(_this), "_sectionArr", _toConsumableArray(document.querySelectorAll("section")));

    return _this;
  }

  _createClass(CardView, [{
    key: "_generateItemMarkUp",
    value: function _generateItemMarkUp(mov, i) {
      return "\n            <li class=\"card\" data-index=".concat(i, " data-music=").concat(mov.music, ">\n              <div class=\"card__controls hidden\">\n                <div class=\"card__control\" data-action=\"setting\" >\n                  <i class=\"card__control-icon fa fa-ellipsis-h\"></i>\n\n                  <ul class=\"nav__list card__settings\">\n                    <li class=\"nav__item\" data-action=\"play\">Play</li>\n                    <li class=\"nav__item\" data-action=\"play-next\">\n                      Play Next\n                    </li>\n                    <li class=\"nav__item\" data-action=\"remove\">Remove</li>\n                  </ul>\n                </div>\n                <div class=\"card__control\" data-action=\"play\">\n                  <i class=\"card__control-icon fa fa-play\"></i>\n                </div>\n                <div class=\"card__control\" data-action=\"select\">\n                  <i class=\"card__control-icon fa-solid fa-check \"></i>\n                </div>\n               </div>\n              <img\n                id=\"currentPhoto\"\n                src=\"/img/").concat(mov.img, "\"\n                class=\"card__img card__img--overview\"\n                onerror=\"this.onerror=null; this.src='img/default.jpg'\"\n                alt=\"\"\n              />\n              <p class=\"card__name card__name--overview\">\n                ").concat(mov.name, "\n              </p>\n              <p class=\"card__artist card__artist--overview\">\n                ").concat(mov.author, "\n              </p>\n            </li>\n        ");
    } ////////////////////////////////////////////////////////////////////////////////////////////////

  }, {
    key: "_setClickCardComponents",
    value: function _setClickCardComponents(card) {
      if (!card) return;
      this._cardEl = card;
      this._curCardIndex = card.dataset.index;
      this._controlContainer = card.querySelector(".card__controls");
      this._controlElArr = card.querySelectorAll(".card__control");
      this._cardElArr = document.querySelectorAll(".card");
    }
  }, {
    key: "_isAnyCardSelected",
    value: function _isAnyCardSelected() {
      var count = 0;

      this._cardElArr.forEach(function (mov) {
        var _mov$querySelector;

        if ((_mov$querySelector = mov.querySelector('.card__control[data-action="select"]')) !== null && _mov$querySelector !== void 0 && _mov$querySelector.classList.contains("card__control--active")) count++;
      });

      if (count > 0) return true;
      return false;
    }
  }, {
    key: "_selectCard",
    value: function _selectCard(card) {
      // if (!this._isAnyCardSelected()) return CrudView.hide();
      card.querySelector('.card__control[data-action="select"]').classList.toggle("card__control--active");
      this.updateSelectedCardsCount();
      if (!this._isAnyCardSelected()) return _CrudView.default.hide();
    }
  }, {
    key: "_hideSettingControl",
    value: function _hideSettingControl() {
      var _this2 = this;

      this._body.addEventListener("click", function (e) {
        var target = e.target;

        if (!(0, _domFunction.closest)(target, _this2._normalClass)) {
          _this2._cardEl.classList.remove("show--control-setting");

          _this2._curControlActive.classList.remove(_this2._activeClass);
        }
      });
    }
  }, {
    key: "_updateCardListArr",
    value: function _updateCardListArr() {
      this._cardListArr = _toConsumableArray(document.querySelectorAll(".card__list"));
    }
  }, {
    key: "_handleCard",
    value: function _handleCard(handle, e) {
      this._updateCardListArr();

      var target = e.target;
      var card = target.closest(".card");
      if (!card) return;

      this._setClickCardComponents(card); // const cardIndex = +target.closest(".card").dataset.index;


      var _this$_cardEl$dataset = this._cardEl.dataset,
          index = _this$_cardEl$dataset.index,
          name = _this$_cardEl$dataset.name,
          belongTo = _this$_cardEl$dataset.belongTo; // Play song when user simple click on card

      if (!(0, _domFunction.closest)(target, "card__control") || (0, _domFunction.closest)(target, 'card__control[data-action="play"]')) {
        if (this._isAnyCardSelected()) return this._selectCard(card);
        this._playBtn.dataset.action = "pause";
        if (belongTo === "search") handle("play-next", index, null, true);else if (belongTo === "playlist") handle("open-playlist", null, name);else if (name) handle("play", null, {}, name);else handle("play", index);
      } // handle card setting CONTROL  options


      if ((0, _domFunction.closest)(target, "nav__item")) {
        var _target$closest$datas = target.closest(".nav__item").dataset,
            _action = _target$closest$datas.action,
            _belongTo = _target$closest$datas.belongTo;

        if (_action === "remove") {
          // name playlist songs (contain more than 1 songs )
          if (name && !_belongTo) handle(_action, null, name);else if (!_belongTo) handle(_action, index);else if (_belongTo) handle(_action, null, name, "refresh-crudPlaylist");
          return this._cardEl.remove();
        } else {
          if (name) handle(_action, null, name);else handle(_action, index);
        }
      } //////////////////////////////////////////////////////////////////////////////
      //  CSS Stuff ************************************************************


      target = target.closest(".card__control");
      if (!target) return; //playsong;

      var action = target.dataset.action; // setting

      if (action === "setting") {
        target.classList.toggle(this._activeClass);

        if ((0, _domFunction.contains)(target, this._activeClass)) {
          // hide cardSetting if already displaying in other cards
          this._cardElArr.forEach(function (mov) {
            if (mov === target) return;

            if ((0, _domFunction.contains)(mov, "show--control-setting")) {
              mov.classList.remove("show--control-setting");
              mov.querySelector('.card__control[data-action="setting"]').classList.remove("card__control--active");
            }
          });

          this._cardEl.classList.add("show--control-setting");

          this._curControlActive = target;

          this._hideSettingControl();
        } else {
          this._cardEl.classList.remove("show--control-setting");
        }
      }

      if (action === "select") {
        target.classList.toggle(this._activeClass); // show the number of selected cards in crudContainer

        this.updateSelectedCardsCount();

        if ((0, _domFunction.contains)(target, this._activeClass)) {
          this._crudContainer.classList.remove("hide");

          this._parentEl.classList.add("card__list--select");

          this._cardEl.dataset.select = true; // target.classList.add(this._activeClass);
        } else {
          this._cardEl.dataset.select = false; // CrudView.hide()
        }

        if (!this._isAnyCardSelected()) _CrudView.default.hide();
      }
    }
  }, {
    key: "_resetAddHandlerControlsToSearchCardList",
    value: function _resetAddHandlerControlsToSearchCardList(handle) {
      console.log("done");

      var _searchResultCardListEl = document.querySelector(".section-searchResults .card__list");

      _searchResultCardListEl.removeEventListener("click", this._handleCard.bind(this));

      _searchResultCardListEl.addEventListener("click", this._handleCard.bind(this, handle));
    }
  }, {
    key: "addhandlerControls",
    value: function addhandlerControls(handle) {
      var _iterator = _createForOfIteratorHelper(this._cardListArr),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var el = _step.value;
          el.addEventListener("click", this._handleCard.bind(this, handle));
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }]);

  return CardView;
}(_ParentView2.default);

var _default = new CardView();

exports.default = _default;
},{"../utils/_domFunction.js":"utils/_domFunction.js","./ParentView.js":"View/ParentView.js","./CrudView.js":"View/CrudView.js"}],"View/OverviewView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CardView = _interopRequireDefault(require("./CardView.js"));

var _ParentView2 = _interopRequireDefault(require("./ParentView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Overview = /*#__PURE__*/function (_ParentView) {
  _inherits(Overview, _ParentView);

  var _super = _createSuper(Overview);

  function Overview() {
    var _this;

    _classCallCheck(this, Overview);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_sectionEl", document.querySelector(".section-overview"));

    _defineProperty(_assertThisInitialized(_this), "_parentEl", document.querySelector(".overview__list"));

    return _this;
  }

  _createClass(Overview, [{
    key: "render",
    value: function render(arr) {
      this._parentEl.innerHTML = "";

      var html = _CardView.default.render(arr, false);

      if (this._sectionEl) this._toggleSectionHiddenClass();

      this._parentEl.insertAdjacentHTML("afterbegin", html);
    }
  }]);

  return Overview;
}(_ParentView2.default);

var _default = new Overview();

exports.default = _default;
},{"./CardView.js":"View/CardView.js","./ParentView.js":"View/ParentView.js"}],"utils/_helper.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatTime = formatTime;

function formatTime(time) {
  time = Math.floor(time);
  var minutes, seconds;

  if (time < 60) {
    if (time < 10) seconds = "0".concat(time);else seconds = time;
    minutes = "00";
  }

  if (time > 60) {
    minutes = Math.floor(time / 60);
    seconds = time % 60;
    if (seconds < 10) seconds = "0".concat(seconds);
  }

  return "".concat(minutes, ":").concat(seconds);
}
},{}],"View/ModalView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _domFunction = require("../utils/_domFunction.js");

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ModalView = /*#__PURE__*/function () {
  function ModalView() {
    _classCallCheck(this, ModalView);

    _defineProperty(this, "_modals", _toConsumableArray(document.querySelectorAll(".modal")));

    _defineProperty(this, "_currentModal", void 0);
  }

  _createClass(ModalView, [{
    key: "showModel",
    value: // - PUBLIC *******************************************
    function showModel(action) {
      this._currentModal = this._findCurrentModal(action);
      (0, _domFunction.removeClass)(this._currentModal, "hidden");
    }
  }, {
    key: "setPlayistNameAttribute",
    value: function setPlayistNameAttribute(playlistName) {
      this._currentModal.dataset.playlist = playlistName;
      this._currentplaylistName = playlistName;
    } // - PRIVATE ***************************************

  }, {
    key: "_findCurrentModal",
    value: function _findCurrentModal(action) {
      return document.querySelector(".modal[data-action=".concat(action, "]"));
    }
  }, {
    key: "_hideModal",
    value: function _hideModal() {
      (0, _domFunction.addClass)(this._currentModal, "hidden");
    }
  }, {
    key: "_getInputName",
    value: function _getInputName() {
      return this._currentModal.querySelector(".modal-input ").value.trim();
    }
  }, {
    key: "_clearInputName",
    value: function _clearInputName() {
      var input = this._currentModal.querySelector(".modal-input");

      if (input) input.value = "";
    } // FUNCTION HANDLER *************************************

  }, {
    key: "_handleRenameBtn",
    value: function _handleRenameBtn(target, handle) {
      // check target  is right
      if (!(0, _domFunction.closest)(target, "modal-btn[data-action='rename']")) return; // handle input

      var newPlaylistName = this._getInputName();

      if (!newPlaylistName || newPlaylistName === "" || newPlaylistName === undefined) return;
      handle("rename", this._currentplaylistName, newPlaylistName);

      this._clearInputName();

      this._hideModal();
    }
  }, {
    key: "_handleCancelBtn",
    value: function _handleCancelBtn(target) {
      // check target  is right
      if (!(0, _domFunction.closest)(target, "modal-btn[data-action='cancel']")) return;

      this._clearInputName();

      this._hideModal();
    }
  }, {
    key: "_handleDeleteBtn",
    value: function _handleDeleteBtn(target, handle) {
      // check target  is right
      if (!(0, _domFunction.closest)(target, "modal-btn[data-action='delete']")) return;
      handle("delete", this._currentplaylistName);

      this._hideModal();
    }
  }, {
    key: "addHandleModalBtns",
    value: function addHandleModalBtns(handle) {
      var _this = this;

      var _iterator = _createForOfIteratorHelper(this._modals),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var modal = _step.value;
          modal.addEventListener("click", function (e) {
            var target = e.target; // const modalEl ;
            // handle input && handle rename playlist

            _this._handleRenameBtn(target, handle); // handle delete playlist


            _this._handleDeleteBtn(target, handle); // handle cancel operation


            _this._handleCancelBtn(target);
          });
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }]);

  return ModalView;
}();

var _default = new ModalView();

exports.default = _default;
},{"../utils/_domFunction.js":"utils/_domFunction.js"}],"View/playlistSongs.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ParentView2 = _interopRequireDefault(require("./ParentView.js"));

var _domFunction = require("../utils/_domFunction.js");

var _ModalView = _interopRequireDefault(require("./ModalView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Playlist = /*#__PURE__*/function (_ParentView) {
  _inherits(Playlist, _ParentView);

  var _super = _createSuper(Playlist);

  function Playlist() {
    var _this;

    _classCallCheck(this, Playlist);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_currentPlaylist", void 0);

    _defineProperty(_assertThisInitialized(_this), "_sectionEl", document.querySelector(".section-playlistSong"));

    _defineProperty(_assertThisInitialized(_this), "_playlistSongList", document.querySelector(".playlistSong__list"));

    _defineProperty(_assertThisInitialized(_this), "_playlistItems", _toConsumableArray(document.querySelectorAll(".playlistSong__item")));

    _defineProperty(_assertThisInitialized(_this), "_manageCrudContainer", document.querySelector(".manage"));

    _defineProperty(_assertThisInitialized(_this), "_manageSelectCountEl", document.querySelector(".manage__select-count"));

    _defineProperty(_assertThisInitialized(_this), "_manageSelectBtn", document.querySelector(".manage__select-btn"));

    _defineProperty(_assertThisInitialized(_this), "_headerEl", document.querySelector(".playlistSong__header"));

    _defineProperty(_assertThisInitialized(_this), "_headerBtnsBox", document.querySelector(".playlistSong__btn-box"));

    _defineProperty(_assertThisInitialized(_this), "_mainControlBtns", _toConsumableArray(document.querySelectorAll(".playlistSong__control-btn")));

    return _this;
  }

  _createClass(Playlist, [{
    key: "_updatePlaylistItems",
    value: function _updatePlaylistItems() {
      this._playlistItems = _toConsumableArray(document.querySelectorAll(".playlistSong__item"));
    }
  }, {
    key: "_setPlaylistAtrribute",
    value: function _setPlaylistAtrribute(playlist) {
      this._currentPlaylist = playlist.name;
      this._sectionEl.dataset.playlist = this._currentPlaylist; // this._currentPlaylist = playlist.name;
    }
  }, {
    key: "render",
    value: function render(playlist) {
      this._toggleSectionHiddenClass();

      this._playlistSongList.innerHTML = "";
      console.log(playlist);
      if (!playlist) return this._renderHeader(playlist, false);

      this._renderHeader(playlist, true);

      var html = this._generateMarkUpList(playlist.songs);

      this._playlistSongList.innerHTML = html;

      this._setPlaylistAtrribute(playlist);
    }
  }, {
    key: "renderImgCollage",
    value: function renderImgCollage(playlist) {
      var playlistExist = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var limitSongs = playlist.songs.slice(0, 4);
      return playlistExist ? limitSongs.map(function (song) {
        return "<img src=\"img/".concat(song.img, "\" class=\"playlistSong__gallery-img\" alt=\"\" />");
      }).join("") : "";
    } //  update playlist and update header

  }, {
    key: "_renderHeader",
    value: function _renderHeader(playlist) {
      var playlistExist = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      this._currentPlaylist = !playlistExist ? undefined : playlist;
      this._headerEl.innerHTML = "";
      var html;
      html = "<div class=\"card__collage playlistSong__gallery\">\n\n                    ".concat(playlist ? this.renderImgCollage(playlist, playlistExist) : "", "\n                \n                    </div>\n                      <div class=\"playlistSong__header-text\">\n                          <h3 class=\"playlistSong__heading heading-3 mg-lw\">\n                          ").concat(playlist === null || playlist === void 0 ? void 0 : playlist.name, "\n                          </h3>\n                                  <div class=\"playlistSong__totalSongs\">").concat(playlistExist ? playlist === null || playlist === void 0 ? void 0 : playlist.songs.length : 0, " items</div>\n                              </div>\n                              \n                              <div class=\"playlistSong__btn-box \">\n                                <button\n                                  class=\"playlistSong__control-btn btn btn--primary\"\n                                  data-action=\"play\"\n                                >\n                                  <i class=\"fa fa-play\"></i>\n                                  <span>Play</span>\n                                </button>\n                                <button\n                                  class=\"playlistSong__control-btn btn btn--primary\"\n                                  data-action=\"rename\"\n                                >\n                                  <i class=\"fa fa-play\"></i>\n                                  <span>Rename</span>\n                                </button>\n                                <button\n                                  class=\"playlistSong__control-btn btn btn--primary\"\n                                  data-action=\"delete\"\n                                >\n                                  <i class=\"fa fa-play\"></i>\n                                  <span>Delete</span>\n                                </button>\n                          </div>");

      this._headerEl.insertAdjacentHTML("afterbegin", html);
    }
  }, {
    key: "_generateItemMarkUp",
    value: function _generateItemMarkUp(song) {
      return "   <li\n                  class=\"playlistSong__item\"\n                  data-index=".concat(song.index, "\n                  data-active=\"false\"\n                  data-hide-play-icon=\"false\"\n                  data-selected=\"false\"\n                >\n                  <button class=\"playlistSong__select-btn\">\n                    <i\n                      class=\"fas fa-headphones playlistSong__icon playlistSong__icon-headphone hidden\"\n                      aria-hidden=\"true\"\n                    ></i>\n                    <i\n                      class=\"fa-solid fa-check playlistSong__icon playlistSong__icon-select hidden\"\n                    ></i>\n                  </button>\n\n                  <button\n                    class=\"playlistSong__btn playlistSong__btn-play\"\n                    data-action=\"play\"\n                  >\n                    <i\n                      class=\"fa fa-music playlistSong__icon playlistSong__icon-music\"\n                      aria-hidden=\"true\"\n                    ></i>\n                    <i\n                      class=\"fa fa-play playlistSong__icon playlistSong__icon-play hidden\"\n                      aria-hidden=\"true\"\n                    ></i>\n                  </button>\n\n                  <p class=\"playlistSong__name\">").concat(song.name, "</p>\n                  <p class=\"playlistSong__artist\">").concat(song.author, "</p>\n                  <p class=\"playlistSong__duration\">3:00</p>\n                </li>");
    }
  }, {
    key: "_removeItemFromHTML",
    value: function _removeItemFromHTML(indexArr) {
      var _this2 = this;

      var _iterator = _createForOfIteratorHelper(indexArr),
          _step;

      try {
        var _loop = function _loop() {
          var givenIndex = _step.value;

          _this2._playlistItems.forEach(function (el) {
            if (Number(givenIndex) === Number(el.dataset.index)) el.remove();
          });
        };

        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          _loop();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    } // ***********************************************************************
    // Common Function *************************************************

  }, {
    key: "_enableSelectionOnItems",
    value: function _enableSelectionOnItems() {
      this._playlistSongList.dataset.selectionOn = true;
      this._playlistSongList.dataset.hidePlayIcon = true;
    }
  }, {
    key: "_disableSelectionOnItems",
    value: function _disableSelectionOnItems() {
      this._playlistSongList.dataset.selectionOn = false;
      this._playlistSongList.dataset.hidePlayIcon = false;
    }
  }, {
    key: "_selectAllItems",
    value: function _selectAllItems() {
      var _iterator2 = _createForOfIteratorHelper(this._playlistItems),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var playlistItem = _step2.value;
          playlistItem.dataset.selected = true;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  }, {
    key: "_unSelectAllItems",
    value: function _unSelectAllItems() {
      var _iterator3 = _createForOfIteratorHelper(this._playlistItems),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var playlistItem = _step3.value;
          playlistItem.dataset.selected = false;
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
  }, {
    key: "_selectGivenItem",
    value: function _selectGivenItem(target) {
      target.dataset.selected = true;
    }
  }, {
    key: "_unSelectGivenItem",
    value: function _unSelectGivenItem(target) {
      target.dataset.selected = false;
    }
  }, {
    key: "_countSelectedItems",
    value: function _countSelectedItems() {
      var count = 0;

      var _iterator4 = _createForOfIteratorHelper(this._playlistItems),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var item = _step4.value;
          if (item.dataset.selected === "true") count++;
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      return count;
    }
  }, {
    key: "_setGivenItemAsActiveOnly",
    value: function _setGivenItemAsActiveOnly(target) {
      this._playlistItems.forEach(function (item) {
        item.dataset.active = "false";
      });

      target.dataset.active = "true";
    }
  }, {
    key: "_setGivenItemAsUnActive",
    value: function _setGivenItemAsUnActive(target) {
      target.dataset.active = false;
    }
  }, {
    key: "_setAllItemsAsActive",
    value: function _setAllItemsAsActive() {
      this._playlistItems.forEach(function (item) {
        return item.dataset.active = "true";
      });
    }
  }, {
    key: "_setAllItemsAsUnactive",
    value: function _setAllItemsAsUnactive() {
      this._playlistItems.forEach(function (item) {
        return item.dataset.active = "false";
      });
    }
  }, {
    key: "_showCrudContainer",
    value: function _showCrudContainer() {
      (0, _domFunction.replaceClass)(this._manageCrudContainer, "hide", "show");
    }
  }, {
    key: "_hideCrudContainer",
    value: function _hideCrudContainer() {
      (0, _domFunction.replaceClass)(this._manageCrudContainer, "show", "hide");
    }
  }, {
    key: "_updateCrudSelectCount",
    value: function _updateCrudSelectCount() {
      // update the select count items
      var selectedItems = this._countSelectedItems();

      this._manageSelectCountEl.textContent = "".concat(selectedItems, " items selected");
    }
  }, {
    key: "_updateSelectBtn",
    value: function _updateSelectBtn(selected) {
      // toggle btn
      this._manageSelectBtn.dataset.selected = selected === "true" ? "false" : "true";
    } // disabled playlist header buttons

  }, {
    key: "_disabledMainPlalistControlBtns",
    value: function _disabledMainPlalistControlBtns() {
      this._headerEl.dataset.disableBtns = true;

      this._mainControlBtns.forEach(function (mov) {
        return mov.dataset.disable = true;
      });
    } // enabled playlist header buttons

  }, {
    key: "_enabledMainPlalistControlBtns",
    value: function _enabledMainPlalistControlBtns() {
      this._headerEl.dataset.disableBtns = false;

      this._mainControlBtns.forEach(function (mov) {
        return mov.dataset.disable = false;
      });
    } // reset el that are repeating

  }, {
    key: "_resetAllSelectionsDone",
    value: function _resetAllSelectionsDone() {
      this._updateSelectBtn("true");

      this._disableSelectionOnItems();

      this._unSelectAllItems();

      this._hideCrudContainer();

      this._updateCrudSelectCount();

      this._enabledMainPlalistControlBtns();
    }
  }, {
    key: "_getSelectedItemIndexArr",
    value: function _getSelectedItemIndexArr() {
      return this._playlistItems.filter(function (mov) {
        return mov.dataset.selected === "true";
      }).map(function (mov) {
        return mov.dataset.index;
      });
    }
  }, {
    key: "_getFirstPlaylistItemIndex",
    value: function _getFirstPlaylistItemIndex() {
      return this._playlistSongList.querySelector(".playlistSong__item").dataset.index;
    }
  }, {
    key: "getActiveItemIndex",
    value: function getActiveItemIndex() {
      this._updatePlaylistItems();

      var activeItem = this._playlistItems.find(function (mov) {
        return mov.dataset.active === "true";
      });

      return activeItem && activeItem.dataset.index || this._getFirstPlaylistItemIndex();
    } // make code in function  reuse again when you see you are writing another function you now need that functionality again so then put that resuse code into function ok sir
    // ***********************************************************************
    // FUNCTION  addHandlerManagePlaylist(handle) *****************************

  }, {
    key: "_handlePlaylistItemSelectBtn",
    value: function _handlePlaylistItemSelectBtn(target) {
      var selectBtnClicked = (0, _domFunction.closest)(target, "playlistSong__select-btn");
      if (!selectBtnClicked) return;
      var playlistItem = (0, _domFunction.closest)(target, "playlistSong__item");

      var alreadySelectedItem = this._countSelectedItems();

      var selected = playlistItem.dataset.selected; // when more than 0 item is selected but we are unselecting them

      if (selected === "true") {
        this._unSelectGivenItem(playlistItem);
      } // when no item is selected


      if (alreadySelectedItem === 1 && selected === "true") {
        this._resetAllSelectionsDone();
      } // when we are selecting items


      if (alreadySelectedItem >= 0 && selected === "false") {
        // dont need to make resuse again as this is not needed anywhere else ok sir
        this._selectGivenItem(playlistItem);

        this._enableSelectionOnItems();

        this._showCrudContainer();

        this._showCrudContainer();

        this._disabledMainPlalistControlBtns();
      }

      this._updateCrudSelectCount();
    }
  }, {
    key: "_handlePlaylistItemPlayBtn",
    value: function _handlePlaylistItemPlayBtn(target, handle) {
      var playBtn = (0, _domFunction.closest)(target, "playlistSong__btn-play");
      if (!playBtn) return; // do not allow song to play when selection is on

      if (this._countSelectedItems > 0) return;
      var curPlaylistItem = (0, _domFunction.closest)(target, "playlistSong__item");

      this._setGivenItemAsActiveOnly(curPlaylistItem);

      var index = curPlaylistItem.dataset.index;
      handle("play", this._currentPlaylist, index);
    } // +++++++++++

  }, {
    key: "addHandlerPlaylistItemsBtns",
    value: function addHandlerPlaylistItemsBtns(handle) {
      var _this3 = this;

      this._playlistSongList.addEventListener("click", function (e) {
        _this3._updatePlaylistItems();

        var target = e.target; // select by clicking items

        _this3._handlePlaylistItemSelectBtn(target); // play song by clicking items


        _this3._handlePlaylistItemPlayBtn(target, handle);
      });
    } // ***********************************************************************
    // FUNCTION addHandleManageCrudOperation*******************************

  }, {
    key: "_handleCrudSelectBtn",
    value: function _handleCrudSelectBtn(target) {
      var selectBtn = (0, _domFunction.closest)(target, "manage__select-btn");
      if (!selectBtn) return;
      var selected = selectBtn.dataset.selected;

      if (selected === "false") {
        selectBtn.dataset.selected = "true";

        this._selectAllItems();

        this._updateCrudSelectCount();

        return;
      }

      this._resetAllSelectionsDone();
    }
  }, {
    key: "_handleCrudHideBtn",
    value: function _handleCrudHideBtn(target) {
      var selectBtn = (0, _domFunction.closest)(target, "manage__clear-btn");
      if (!selectBtn) return; // set all selected options

      this._resetAllSelectionsDone();
    }
  }, {
    key: "_handleCrudPlayBtn",
    value: function _handleCrudPlayBtn(target, handle) {
      var playBtn = (0, _domFunction.closest)(target, "manage__play-btn");
      if (!playBtn) return; // get all seleced items index

      var selectedItemIndexArr = this._getSelectedItemIndexArr();

      this._resetAllSelectionsDone();

      handle("play", this._currentPlaylist, selectedItemIndexArr);
    }
  }, {
    key: "_handleCrudRemoveBtn",
    value: function _handleCrudRemoveBtn(target, handle) {
      var removeBtn = (0, _domFunction.closest)(target, "manage__remove-btn");
      if (!removeBtn) return;

      var removeItemIndexArr = this._getSelectedItemIndexArr();

      this._removeItemFromHTML(removeItemIndexArr);

      this._resetAllSelectionsDone();

      handle("remove", this._currentPlaylist, removeItemIndexArr);
    } // +++++++++++

  }, {
    key: "addHandlerCrudOperationBtns",
    value: function addHandlerCrudOperationBtns(handle) {
      var _this4 = this;

      this._manageCrudContainer.addEventListener("click", function (e) {
        _this4._updatePlaylistItems();

        var target = e.target; // to select or unselect all songs

        _this4._handleCrudSelectBtn(target); // to reset all the changed made


        _this4._handleCrudHideBtn(target); // // to play song


        _this4._handleCrudPlayBtn(target, handle); // // to remove songs


        _this4._handleCrudRemoveBtn(target, handle);
      });
    } // FUNCTION  addHandlePHeaderBtns*******************************

  }, {
    key: "_areHeaderBtnsDisabled",
    value: function _areHeaderBtnsDisabled() {
      if (this._headerEl.dataset.disableBtns === "true") return true;
      return false;
    }
  }, {
    key: "_isPlaylistEmpty",
    value: function _isPlaylistEmpty() {
      var _this$_playlistItems;

      if (this._playlistItem && ((_this$_playlistItems = this._playlistItems) === null || _this$_playlistItems === void 0 ? void 0 : _this$_playlistItems.length) === 0) return true;
      return false;
    }
  }, {
    key: "_handleHeaderPlayBtn",
    value: function _handleHeaderPlayBtn(target, handle) {
      if (!(0, _domFunction.closest)(target, 'playlistSong__control-btn[data-action="play"]')) return;

      var getFirstPlaylistSongIndex = this._getFirstPlaylistItemIndex();

      if (!getFirstPlaylistSongIndex) return;
      handle("play", this._currentPlaylist, getFirstPlaylistSongIndex);
    }
  }, {
    key: "_handleHeaderRenameBtn",
    value: function _handleHeaderRenameBtn(target) {
      if (!(0, _domFunction.closest)(target, 'playlistSong__control-btn[data-action="rename"]')) return;

      _ModalView.default.showModel("rename");

      _ModalView.default.setPlayistNameAttribute(this._currentPlaylist);
    }
  }, {
    key: "_handleHeaderDeleteBtn",
    value: function _handleHeaderDeleteBtn(target) {
      if (!(0, _domFunction.closest)(target, 'playlistSong__control-btn[data-action="delete"]')) return;

      _ModalView.default.showModel("delete");

      _ModalView.default.setPlayistNameAttribute(this._currentPlaylist);
    } // +++++++++++

  }, {
    key: "addHandlerHeaderBtns",
    value: function addHandlerHeaderBtns(handle) {
      var _this5 = this;

      this._headerEl.addEventListener("click", function (e) {
        _this5._updatePlaylistItems();

        var target = e.target;
        if (_this5._areHeaderBtnsDisabled()) return;
        console.log(_this5._isPlaylistEmpty()); // rename  playlist

        _this5._handleHeaderRenameBtn(target);

        _this5._handleHeaderDeleteBtn(target); // play playlist


        if (_this5._isPlaylistEmpty()) return;

        _this5._handleHeaderPlayBtn(target, handle); // delete playlist

      });
    }
  }]);

  return Playlist;
}(_ParentView2.default);

var _default = new Playlist();

exports.default = _default;
},{"./ParentView.js":"View/ParentView.js","../utils/_domFunction.js":"utils/_domFunction.js","./ModalView.js":"View/ModalView.js"}],"View/ControlView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _domFunction = require("../utils/_domFunction.js");

var _helper = require("../utils/_helper.js");

var _ParentView2 = _interopRequireDefault(require("./ParentView.js"));

var _playlistSongs = _interopRequireDefault(require("./playlistSongs.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ControlView = /*#__PURE__*/function (_ParentView) {
  _inherits(ControlView, _ParentView);

  var _super = _createSuper(ControlView);

  // settings appear when clicking setting btn
  // to set duration only when meta data is ready and then play song
  // not important did to show these will be install inside the state obj
  function ControlView() {
    var _this;

    _classCallCheck(this, ControlView);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "_sectionOverview", (0, _domFunction.findEl)("section-overview"));

    _defineProperty(_assertThisInitialized(_this), "_currentSectionEl", void 0);

    _defineProperty(_assertThisInitialized(_this), "_body", document.querySelector("body"));

    _defineProperty(_assertThisInitialized(_this), "_parent", (0, _domFunction.findEl)("section-control"));

    _defineProperty(_assertThisInitialized(_this), "_subParent", (0, _domFunction.findEl)("control"));

    _defineProperty(_assertThisInitialized(_this), "_audio", (0, _domFunction.findEl)("audio"));

    _defineProperty(_assertThisInitialized(_this), "_imgEl", (0, _domFunction.findEl)("curMusic__img"));

    _defineProperty(_assertThisInitialized(_this), "_titleEl", (0, _domFunction.findEl)("curMusic__heading"));

    _defineProperty(_assertThisInitialized(_this), "_artistEl", (0, _domFunction.findEl)("curMusic__artist"));

    _defineProperty(_assertThisInitialized(_this), "_curTimeEl", (0, _domFunction.findEl)("progressBar__time--curTime"));

    _defineProperty(_assertThisInitialized(_this), "_durationEl", (0, _domFunction.findEl)("progressBar__time--duration"));

    _defineProperty(_assertThisInitialized(_this), "_progressBarMainContainer", (0, _domFunction.findEl)("progressBar--main"));

    _defineProperty(_assertThisInitialized(_this), "_progressBarVolumeContainer", (0, _domFunction.findEl)("progressBar--volume"));

    _defineProperty(_assertThisInitialized(_this), "_mainProgressBar", (0, _domFunction.findEl)("progressBar__line--main"));

    _defineProperty(_assertThisInitialized(_this), "_controlFullImg", (0, _domFunction.findEl)("control--fullView-img"));

    _defineProperty(_assertThisInitialized(_this), "_controlSetting", (0, _domFunction.findEl)("control__settings"));

    _defineProperty(_assertThisInitialized(_this), "_controlSettingOptionList", _toConsumableArray(document.querySelectorAll(".control__setting")));

    _defineProperty(_assertThisInitialized(_this), "_controlSettingOptionListItemOptions", _toConsumableArray(document.querySelectorAll(".control__setting-option")));

    _defineProperty(_assertThisInitialized(_this), "_playBtn", _this._parent.querySelector(".music__play-btn"));

    _defineProperty(_assertThisInitialized(_this), "_volumeBtn", (0, _domFunction.findEl)('control__btn[data-action="volume"]'));

    _defineProperty(_assertThisInitialized(_this), "_SettingBtn", (0, _domFunction.findEl)('control__btn[data-action="setting"]'));

    _defineProperty(_assertThisInitialized(_this), "_shuffleBtn", (0, _domFunction.findEl)('control__btn[data-action="shuffle"]'));

    _defineProperty(_assertThisInitialized(_this), "_nextBtn", _this._parent.querySelector('.control__btn[data-action="next"]'));

    _defineProperty(_assertThisInitialized(_this), "_prevBtn", _this._parent.querySelector('.control__btn[data-action="prev"]'));

    _defineProperty(_assertThisInitialized(_this), "_playBtnIcon", _this._playBtn.querySelector("i"));

    _defineProperty(_assertThisInitialized(_this), "_currentTime", void 0);

    _defineProperty(_assertThisInitialized(_this), "_duration", void 0);

    _defineProperty(_assertThisInitialized(_this), "_volume", void 0);

    _defineProperty(_assertThisInitialized(_this), "_speed", void 0);

    _this._setDuration();

    _this._updateCurTimeAndProgressBar();

    _this._updateProgressBarByClicking();

    _this._toggleActiveElWhenFocusChange();

    _this._controlSettingHoverEvent();

    return _this;
  }

  _createClass(ControlView, [{
    key: "_toggleActiveElWhenFocusChange",
    value: function _toggleActiveElWhenFocusChange() {
      var _this2 = this;

      this._body.addEventListener("click", function (e) {
        var target = e.target;

        if (!(0, _domFunction.closest)(target, "control__btn--active[data-action='volume']")) {
          _this2._volumeBtn.classList.remove("control__btn--active");
        }

        if ((0, _domFunction.closest)(target, "progressBar__container--volume")) {
          _this2._volumeBtn.classList.add("control__btn--active");
        }

        if ((0, _domFunction.closest)(target, "control__setting[data-action='speed'] ")) {
          _this2._SettingBtn.classList.add("control__btn--active");
        }

        if (!(0, _domFunction.closest)(target, "control__settings") && !(0, _domFunction.closest)(target, 'control__btn[data-action="setting"]')) {
          (0, _domFunction.removeClass)(_this2._SettingBtn, "control__btn--active");
          (0, _domFunction.removeAllActiveElClassInArr)(_this2._controlSettingOptionList);
        }
      });
    } // controller just get the data here
    // we get the duration after audio metadata is laode

  }, {
    key: "_setDuration",
    value: function _setDuration() {
      var _this3 = this;

      this._audio.addEventListener("loadedmetadata", function () {
        /////////////////////////////////////////////
        _this3._duration = Number(_this3._audio.duration);
        _this3._durationEl.textContent = (0, _helper.formatTime)(_this3._audio.duration);
      });
    } // Update time and progressbar movement

  }, {
    key: "_updateCurTimeAndProgressBar",
    value: function _updateCurTimeAndProgressBar() {
      var _this4 = this;

      this._audio.addEventListener("timeupdate", function (e) {
        _this4._curTimeEl.textContent = (0, _helper.formatTime)(_this4._audio.currentTime);
        _this4._currentTime = +_this4._audio.currentTime;
        var percent = Math.floor(Number(_this4._audio.currentTime) / Number(_this4._audio.duration) * 100);
        _this4._mainProgressBar.style.width = "".concat(percent, "%");
      });
    }
  }, {
    key: "_updateProgressBarByClicking",
    value: function _updateProgressBarByClicking() {
      var _this5 = this;

      [this._progressBarMainContainer, this._progressBarVolumeContainer].forEach(function (mov) {
        return mov.addEventListener("click", function (e) {
          var target = e.target;
          var belongTo = mov.dataset.belongTo;
          var progressWidth = +mov.offsetWidth; // respect to target

          var clickWidthFromStart = Number(e.offsetX);
          var percent = Math.round(clickWidthFromStart / progressWidth * 100);
          mov.querySelector(".progressBar__line").style.width = "".concat(percent, "%"); // update music settings

          if (belongTo === "main") {
            _this5._currentTime = Math.floor(percent / 100 * _this5._duration);
            _this5._audio.currentTime = _this5._currentTime;
          }

          if (belongTo === "volume") {
            _this5._volume = percent / 100 * 1;
            _this5._volume = _this5._volume.toFixed(2);
            _this5._audio.volume = _this5._volume;
          }
        });
      });
    }
  }, {
    key: "autoPlayNextSong",
    value: function autoPlayNextSong(handle) {
      this._audio.addEventListener("ended", function () {
        handle("ended");
      });
    } // functionality

  }, {
    key: "playSong",
    value: function playSong() {
      this._audio.play();

      this._playBtn.dataset.action === "pause";

      this._playBtnIcon.classList.replace("fa-play", "fa-pause");
    }
  }, {
    key: "pauseSong",
    value: function pauseSong() {
      this._audio.pause(); // this._currentTime = this._audio.currentTime;

    } // next song -> loadsong
    // To set song El from arr
    // load song (play song)

  }, {
    key: "setAudioOptions",
    value: function setAudioOptions(songOptions) {
      if (!songOptions) return;
      if (songOptions.currentTime) this._audio.currentTime = 0;

      if (songOptions.playBtn) {
        this._playBtn.dataset.action === "pause";

        this._playBtnIcon.classList.replace("fa-play", "fa-pause");
      }

      if (songOptions.toggle === "shuffle") (0, _domFunction.removeClass)(this._shuffleBtn, "control__btn--active");
      if (songOptions.setShuffle === "on") (0, _domFunction.addClass)(this._shuffleBtn, "control__btn--active");
    }
  }, {
    key: "loadSong",
    value: function loadSong(song, songOptions) {
      // set basic el
      this._audio.src = "./music/".concat(song.music);
      this._imgEl.src = "./img/".concat(song.img);
      this._titleEl.textContent = song.name;
      this._artistEl.textContent = song.author;
      this._controlFullImg.src = "./img/".concat(song.img);
      this.setAudioOptions(songOptions);
    } // addHandlerControl(handle) ************************************

  }, {
    key: "_checkIfSectionIsPlaylistSongs",
    value: function _checkIfSectionIsPlaylistSongs() {
      var currentSection = this.getCurrentSection();
      if ((0, _domFunction.contains)(currentSection, "section-playlistSong")) return true;
      return false;
    } // check if current Section is playlist then get Current Song Index

  }, {
    key: "_ifSectionPlaylistExistThenGetCurrentSongIndex",
    value: function _ifSectionPlaylistExistThenGetCurrentSongIndex() {
      var isPlaylistSection = this._checkIfSectionIsPlaylistSongs();

      var playlistSongIndex;
      if (!isPlaylistSection) return false;
      playlistSongIndex = _playlistSongs.default.getActiveItemIndex();
      playlistSongIndex = Number(playlistSongIndex);
      return playlistSongIndex;
    }
  }, {
    key: "_handlePlayNextSong",
    value: function _handlePlayNextSong(handle) {
      var playlistIndex = this._ifSectionPlaylistExistThenGetCurrentSongIndex();

      if (!playlistIndex) return handle("next");
      return handle("next", null, {}, playlistIndex);
    }
  }, {
    key: "_handlePlayPreviousSong",
    value: function _handlePlayPreviousSong(handle) {
      var playlistIndex = this._ifSectionPlaylistExistThenGetCurrentSongIndex();

      if (!playlistIndex) return handle("prev");
      return handle("prev", null, {}, playlistIndex);
    }
  }, {
    key: "disableSongChangeBtns",
    value: function disableSongChangeBtns(type) {
      console.log(type);
      console.log(this._prevBtn, this._nextBtn);

      if (type === "both") {
        this._prevBtn.disabled = true;
        return this._nextBtn.disabled = true;
      }

      if (type === "prev") return this._prevBtn.disabled = true;
      if (type === "next") return this._nextBtn.disabled = true;
    }
  }, {
    key: "enableSongChangeBtns",
    value: function enableSongChangeBtns(type) {
      if (type === "both") {
        this._prevBtn.disabled = false;
        return this._nextBtn.disabled = false;
      }

      if (type === "prev") return this._prevBtn.disabled = tfalseue;
      if (type === "next") return this._nextBtn.disabled = false;
    }
  }, {
    key: "addHandlerControl",
    value: function addHandlerControl(handle) {
      var _this6 = this;

      this._parent.addEventListener("click", function (e) {
        var target = e.target;
        var btn = target.closest(".control__btn");
        var action;
        if (btn) action = btn.dataset.action; // BUTTONS *******************************************

        if (action === "next") _this6._handlePlayNextSong(handle);
        if (action === "prev") _this6._handlePlayPreviousSong(handle);

        if (action === "pause") {
          _this6._playBtnIcon.classList.replace("fa-pause", "fa-play");

          btn.dataset.action = "play";
          return handle("pause", {
            currentTime: _this6._audio.currentTime
          });
        }

        if (action === "play") {
          btn.dataset.action = "pause";

          _this6._playBtnIcon.classList.replace("fa-play", "fa-pause");

          return handle("play");
        }

        if (action === "volume") {
          btn.classList.toggle("control__btn--active");
          return handle("volume", {
            volume: _this6._audio.volume
          });
        }

        if (action === "expand") {
          _this6._parent.querySelector(".control--fullView-img ").classList.toggle("hidden");

          _this6._subParent.classList.toggle("control--fullView");

          return handle("fullScreen", {
            fullScreen: true
          });
        }

        if (action === "reset") handle("reset");

        if (action === "shuffle") {
          (0, _domFunction.toggleClass)(btn, "control__btn--active");
          if ((0, _domFunction.contains)(btn, "control__btn--active")) handle("shuffle", null, true);else handle("shuffle", null, false);
        }

        if (action === "setting") {
          (0, _domFunction.toggleClass)(btn, "control__btn--active");
        } // ****************************************************************
        // Other than btn


        if ((0, _domFunction.closest)(target, "control__left")) {
          _this6._parent.querySelector(".control--fullView-img ").classList.toggle("hidden");

          _this6._subParent.classList.toggle("control--fullView");
        } //  To increase speed and fast forward or backward


        if ((0, _domFunction.closest)(target, "control__setting")) {
          var _action = (0, _domFunction.closest)(target, "control__setting").dataset.action;
          if (!_action) return;

          if (_action === "speed") {
            var selectedControlSettingOption = (0, _domFunction.closest)(target, "control__setting-option");
            if (!selectedControlSettingOption) return; // getting value from selected option in options

            var value = selectedControlSettingOption.dataset.value; // Set it active the current option

            (0, _domFunction.setActiveElInArr)(_this6._controlSettingOptionListItemOptions, selectedControlSettingOption, "nav__item--active");
            _this6._speed = +value;
            _this6._audio.playbackRate = _this6._speed;
            return handle(_action, {
              speed: _this6._audio.playbackRate
            });
          }

          if (_action === "skip-forward") {
            _this6._audio.currentTime += 10;
            _this6._currentTime = _this6._audio.currentTime;
          }

          if (_action === "skip-backward") {
            _this6._audio.currentTime -= 10;
            _this6._currentTime = _this6._audio.currentTime;
          }
        } // Pass to controller

      });
    }
  }, {
    key: "_controlSettingHoverEvent",
    value: function _controlSettingHoverEvent() {
      var _this7 = this;

      // handle is defined in this scope
      this._controlSetting.addEventListener("mouseover", function (e) {
        var target = e.target;
        var option = (0, _domFunction.closest)(target, "control__setting");

        if (option) {
          // Toggle speed options
          var action = option.dataset.action;

          if (action === "speed") {
            return (0, _domFunction.addClass)(option, "control__setting--active");
          }

          if (action !== "speed") {
            (0, _domFunction.removeAllActiveElClassInArr)(_this7._controlSettingOptionList, "control__setting--active");
          }
        }
      });
    }
  }]);

  return ControlView;
}(_ParentView2.default);

var _default = new ControlView();

exports.default = _default;
},{"../utils/_domFunction.js":"utils/_domFunction.js","../utils/_helper.js":"utils/_helper.js","./ParentView.js":"View/ParentView.js","./playlistSongs.js":"View/playlistSongs.js"}],"Model/localStorageModel.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.localSetState = exports.localGetState = void 0;

var _model = require("./model.js");

var localGetState = function localGetState() {
  return JSON.parse(localStorage.getItem("state"));
};

exports.localGetState = localGetState;

var localSetState = function localSetState(state) {
  return localStorage.setItem("state", JSON.stringify(state));
};

exports.localSetState = localSetState;

var localRemoveState = function localRemoveState() {
  return localStorage.removeItem("state");
};

var localLoadState = function localLoadState() {
  var state = localGetState();
  if (state) state = _model.state;
  localGetState(state);
};
},{"./model.js":"Model/model.js"}],"Model/model.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addToplayList = addToplayList;
exports.createOnlyPlaylistWithName = createOnlyPlaylistWithName;
exports.createPlayListWithSongs = createPlayListWithSongs;
exports.deleteSong = deleteSong;
exports.deleteSongFromPlayList = deleteSongFromPlayList;
exports.deleteSongs = deleteSongs;
exports.findSongByName = findSongByName;
exports.findSongsByIndex = findSongsByIndex;
exports.getSongsSortBy = getSongsSortBy;
exports.state = exports.modelUpdateState = exports.modelSearchSongs = void 0;
exports.updateSong = updateSong;

var _localStorageModel = require("./localStorageModel.js");

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var state = {
  index: 0,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  // four mode available => main,next,my-song,shuffle
  playMode: "main",
  playUntilNextPlaylistExhaust: false,
  songs: [{
    name: "the cooler guard",
    author: "Mine the way",
    img: "1.jpg",
    music: "1.mp3",
    index: 1
  }, {
    name: "the wonder galaxy",
    author: "Zero to Zero->Infinity",
    img: "2.jpg",
    music: "2.mp3",
    index: 2
  }, {
    name: "Way of my life",
    author: "The serial me",
    img: "3.jpg",
    music: "3.mp3",
    index: 3
  }, {
    name: "we are puching back",
    author: "loki",
    img: "4.jpg",
    music: "4.mp3",
    index: 4
  }, {
    name: "Under the house",
    author: "Rohit me",
    img: "5.jpg",
    music: "5.mp3",
    index: 5
  }, {
    name: "Consistency is the key",
    author: "Ithink so",
    img: "6.jpg",
    music: "6.mp3",
    index: 6
  }, {
    name: "Soniis puppy",
    author: "creator",
    img: "7.jpg",
    music: "7.mp3",
    index: 7
  }, {
    name: " puppy",
    author: "tyler",
    img: "8.jpg",
    music: "8.mp3",
    index: 8
  }, {
    name: "do everydat",
    author: "me the great",
    img: "9.jpg",
    music: "9.mp3",
    index: 9
  }, {
    name: "this is what we are ",
    author: "waiting",
    img: "10.jpg",
    music: "10.mp3",
    index: 10
  }, {
    name: "monet",
    author: "isGreat",
    img: "11.jpg",
    music: "11.mp3",
    index: 11
  }, {
    name: "hand recovery",
    author: "must happen",
    img: "12.jpg",
    music: "12.mp3",
    index: 12
  }, {
    name: "yes i am",
    author: "the beast",
    img: "13.jpg",
    music: "13.mp3",
    index: 13
  }, {
    name: "who i am",
    author: "the one",
    img: "14.jpg",
    music: "14.mp3",
    index: 14
  }, {
    name: "anime",
    author: "is great yep",
    img: "15.jpg",
    music: "15.mp3",
    index: 15
  }],
  songsToPlayNext: [],
  currentMyPlaylistPlaying: {},
  myPlaylist: [],
  shuffleSongs: [],
  volume: 1,
  speed: 1,
  theme: "dark",
  fullScreen: false
}; // main db

exports.state = state;

function deleteSong(index) {
  state.songs = state.songs.filter(function (mov) {
    return Number(mov.index) !== Number(index);
  });
}

function sortBy(arr, type) {
  return arr.sort(function (a, b) {
    if (a[type].slice(0, 1).toLowerCase() > b[type].slice(0, 1).toLowerCase()) return 1;
    if (b[type].slice(0, 1).toLowerCase() < a[type].slice(0, 1).toLowerCase()) return -1;else return 0;
  });
}

function getSongsSortBy(type) {
  var songsCopy = state.songs.slice();
  return sortBy(songsCopy, type);
}

function deleteSongs(arrofIndex) {
  state.songs = state.songs.filter(function (mov) {
    if (!arrofIndex.includes(mov.index.toString())) return mov;
  });
}

function createSong(songObj) {
  state.push(songObj);
}

function updateSong(song) {
  state.songs = state.songs.map(function (mov) {
    if (Number(mov.index) === song.index) return song;
    return mov;
  });
} // addSongToPlaylist
// addSongsToPlaylist
// playList db


function addToplayList(listType, index, indexArr) {
  var list;
  if (listType === "my-list") list = "myPlaylist";else list = "songsToPlayNext";

  if (index) {
    var song = state.songs.find(function (mov) {
      return Number(mov.index) === Number(index);
    });
    song.played = false;
    state[list].push(song);
  }

  if (indexArr) {
    var _state$list;

    var songs = state.songs.filter(function (mov) {
      if (indexArr.includes(mov.index.toString())) {
        mov.played = false;
        return mov;
      }
    });

    (_state$list = state[list]).push.apply(_state$list, _toConsumableArray(songs));
  }
}

function deleteSongFromPlayList(listType, index) {
  var list;
  if (listType === "my-list") list = "myPlayList";else list = "songsToPlayNextList";
  if (!list || !Array.isArray(list)) return;
  list = state[list];
  list = list.filter(function (mov) {
    return state.songs.find(function (mov) {
      return Number(mov.index) === Number(index);
    }) === mov.name;
  });
}

function findSongsByIndex(arr) {
  var songs = [];
  arr.forEach(function (index) {
    var _iterator = _createForOfIteratorHelper(state.songs),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var song = _step.value;
        if (Number(song.index) === Number(index) + 1) songs.push(song);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  });
  return songs;
}

function findSongByName(name) {
  return state.songs.find(function (mov) {
    return mov.name === name;
  });
}

function findPlaylist(name) {
  return state.myPlaylist.filter(function (mov) {
    return mov.name === name;
  });
}

function createOnlyPlaylistWithName(name) {
  var timesExist = findPlaylist(name);
  if (timesExist.length > 0) name = "".concat(name, " Copy ").concat(timesExist.length + 1);
  state.myPlaylist.push({
    curSongIndex: 0,
    name: name,
    songs: [],
    createAt: Date.now()
  });
}

function createPlayListWithSongs(playlistName, songsIndexArr) {
  var _playListExist$songs;

  if (!songsIndexArr) return;
  var playListExist = state.myPlaylist.find(function (mov) {
    return mov.name === playlistName;
  }); // if playlist with this name already exists then replace it

  var songs = findSongsByIndex(songsIndexArr);
  if (playListExist) return (_playListExist$songs = playListExist.songs).push.apply(_playListExist$songs, _toConsumableArray(songs));
  var playlistObj = {
    curSongIndex: 0,
    name: playlistName,
    songs: songs,
    createAt: Date.now()
  };
  state.myPlaylist.push(playlistObj);
}

var modelUpdateState = function modelUpdateState() {
  exports.state = state = (0, _localStorageModel.localGetState)();
};

exports.modelUpdateState = modelUpdateState;

var modelSearchSongs = function modelSearchSongs(word) {
  var songs = [];

  var _iterator2 = _createForOfIteratorHelper(state.songs),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var song = _step2.value;
      if (song.name.toLocaleLowerCase().includes(word.toLowerCase())) songs.push(song);
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  return songs;
};

exports.modelSearchSongs = modelSearchSongs;
},{"./localStorageModel.js":"Model/localStorageModel.js"}],"Model/playlistModel.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removePlaylistSongs = exports.removePlaylist = exports.playlistHasSong = exports.modelRenamePlaylist = exports.modelGetCurrentPlaylistSong = exports.modelGetAllPlaylistName = exports.getPlaylistSongs = exports.getPlaylistSong = exports.getPlaylist = exports.getOnePlaylistSongsName = exports.autoPlayPlaylist = exports.addPlayListSongsToNextPlaylist = void 0;

var _model = require("./model.js");

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var getPlaylist = function getPlaylist(name) {
  var playlist = _model.state.myPlaylist.find(function (mov) {
    return mov.name === name;
  });

  return playlist;
};

exports.getPlaylist = getPlaylist;

var removePlaylist = function removePlaylist(name) {
  _model.state.myPlaylist = _model.state.myPlaylist.filter(function (mov) {
    return mov.name !== name;
  });
};

exports.removePlaylist = removePlaylist;

var removePlaylistSongs = function removePlaylistSongs(name, songsIndexArr) {
  var playlist = getPlaylist(name);

  var _iterator = _createForOfIteratorHelper(songsIndexArr),
      _step;

  try {
    var _loop = function _loop() {
      var givenIndex = _step.value;
      playlist.songs = playlist.songs.filter(function (song) {
        return Number(song.index) !== Number(givenIndex);
      });
    };

    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      _loop();
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
};

exports.removePlaylistSongs = removePlaylistSongs;

var getOnePlaylistSongsName = function getOnePlaylistSongsName(name) {
  var playlist = _model.state.myPlaylist.find(function (mov) {
    return mov.name === name;
  });

  playlist = playlist[0];
  var playlistSongs = playlist.songs;
  if (!playlistSongs || playlistSongs.length === 0) return;
  return playlistSongs.map(function (mov) {
    return mov.name;
  });
};

exports.getOnePlaylistSongsName = getOnePlaylistSongsName;

var getPlaylistSong = function getPlaylistSong(name, index) {
  var playlist = _model.state.myPlaylist.find(function (mov) {
    return mov.name === name;
  });

  return playlist.songs.find(function (mov) {
    return Number(mov.index) === Number(index);
  });
};

exports.getPlaylistSong = getPlaylistSong;

var autoPlayPlaylist = function autoPlayPlaylist(name) {
  var playlist = _model.state.myPlaylist.find(function (mov) {
    return mov.name === name;
  });

  if (!playlist || playlist.songs.length === 0) return;
  var curSongIndex = Number(playlist.curSongIndex);
  var curSong = playlist.songs[curSongIndex];
  playlist.curSongIndex = curSongIndex + 1;
  return curSong;
};

exports.autoPlayPlaylist = autoPlayPlaylist;

var getPlaylistSongs = function getPlaylistSongs(name) {
  var playlist = _model.state.myPlaylist.find(function (mov) {
    return mov.name === name;
  });

  return playlist.songs;
};

exports.getPlaylistSongs = getPlaylistSongs;

var addPlayListSongsToNextPlaylist = function addPlayListSongsToNextPlaylist(name) {
  var songs = getPlaylistSongs(name);
  if (songs.length === 0) return;

  _model.state.songsToPlayNext.push(songs);
};

exports.addPlayListSongsToNextPlaylist = addPlayListSongsToNextPlaylist;

var playlistHasSong = function playlistHasSong(name) {
  var songs = getPlaylistSongs(name);
  if (songs === [] || !songs || songs.length === 0) return false;
  return true;
};

exports.playlistHasSong = playlistHasSong;

var modelRenamePlaylist = function modelRenamePlaylist(oldName, newName) {
  var playlist = getPlaylist(oldName);
  console.log(oldName, newName);
  playlist.name = newName;
};

exports.modelRenamePlaylist = modelRenamePlaylist;

var modelGetAllPlaylistName = function modelGetAllPlaylistName() {
  return _model.state.myPlaylist.map(function (mov) {
    return mov.name;
  });
};

exports.modelGetAllPlaylistName = modelGetAllPlaylistName;

var modelGetCurrentPlaylistSong = function modelGetCurrentPlaylistSong(index) {
  var name = _model.state.currentMyPlaylistPlaying.name;
  return getPlaylistSong(name, index);
};

exports.modelGetCurrentPlaylistSong = modelGetCurrentPlaylistSong;
},{"./model.js":"Model/model.js"}],"Controller/Components/playlistSongsController.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.controlRenderPlaylistHeader = exports.controlRenderPlaylist = exports.controlPlaySongFromCurrentPlaylist = void 0;

var _playlistSongs = _interopRequireDefault(require("../../View/playlistSongs.js"));

var _ControlController = require("./ControlController.js");

var _model = require("../../Model/model.js");

var _playlistModel = require("../../Model/playlistModel.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var controlRenderPlaylistHeader = function controlRenderPlaylistHeader(name) {
  var playlist = (0, _playlistModel.getPlaylist)(name);

  _playlistSongs.default._renderHeader(playlist, true);
};

exports.controlRenderPlaylistHeader = controlRenderPlaylistHeader;

var controlRenderPlaylist = function controlRenderPlaylist(playlist) {
  return _playlistSongs.default.render(playlist);
};

exports.controlRenderPlaylist = controlRenderPlaylist;

var controlPlaySongFromCurrentPlaylist = function controlPlaySongFromCurrentPlaylist(playlistName, songIndex) {
  var playlist = (0, _playlistModel.getPlaylist)(playlistName);
  (0, _ControlController.updateState)({
    playMode: "my-song",
    currentMyPlaylistPlaying: playlist
  });
  (0, _ControlController.loadSong)(songIndex, {});
  (0, _ControlController.playSong)();
};

exports.controlPlaySongFromCurrentPlaylist = controlPlaySongFromCurrentPlaylist;

var controlPlaylistItemBtns = function controlPlaylistItemBtns(action, playlistName, songIndex) {
  if (action === "play") {
    controlPlaySongFromCurrentPlaylist(playlistName, songIndex);
  }
};

var controlPlaylistCrudBtns = function controlPlaylistCrudBtns(action, playlistName, songIndexArr) {
  console.log(action, playlistName, songIndexArr);
  if (action === "remove") (0, _playlistModel.removePlaylistSongs)(playlistName, songIndexArr);

  if (action === "play") {
    (0, _ControlController.updateState)({
      playMode: "next",
      playUntilNextPlaylistExhaust: true
    });
    (0, _model.addToplayList)("songsToPlayNext", null, songIndexArr);
    (0, _ControlController.loadSong)(0);
    (0, _ControlController.playSong)();
  } // setState(state);


  console.log(_model.state);
};

var controlHeaderBtns = function controlHeaderBtns(action, playlistName, songIndex) {
  if (action === "play") controlPlaySongFromCurrentPlaylist(playlistName, songIndex);
};

_playlistSongs.default.addHandlerPlaylistItemsBtns(controlPlaylistItemBtns);

_playlistSongs.default.addHandlerCrudOperationBtns(controlPlaylistCrudBtns);

_playlistSongs.default.addHandlerHeaderBtns(controlHeaderBtns);
},{"../../View/playlistSongs.js":"View/playlistSongs.js","./ControlController.js":"Controller/Components/ControlController.js","../../Model/model.js":"Model/model.js","../../Model/playlistModel.js":"Model/playlistModel.js"}],"Controller/Components/ControlController.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.controlDisableSongChangeBtns = controlDisableSongChangeBtns;
exports.controlEnableSongChangeBtns = controlEnableSongChangeBtns;
exports.controlPlayer = controlPlayer;
exports.loadSong = loadSong;
exports.nextSong = nextSong;
exports.playSong = playSong;
exports.prevSong = prevSong;
exports.updateState = updateState;

var _ControlView = _interopRequireDefault(require("../../View/ControlView.js"));

var _model = require("../../Model/model.js");

var _playlistModel = require("../../Model/playlistModel.js");

var _playlistSongsController = require("./playlistSongsController.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function getSong(index) {
  var song = _model.state.songs[index];
  var playMode = _model.state.playMode;
  console.log(playMode); // if (playMode === "main") song = song;

  if (playMode === "my-song" && _model.state.currentMyPlaylistPlaying) {
    song = controlGetMyPlaylistSong(index);
    if (song === null || !song) return;
  }

  if (playMode === "next") song = getNextPlayListSong();
  if (playMode === "shuffle") song = _model.state.shuffleSongs[index];
  return song;
}

function loadSong(index) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  // mode=>>>> main,next,my-song,shuffle
  var song = getSong(index);
  if (!song) return pauseSong();
  if (_model.state.playMode !== "shuffle") options.toggle = "shuffle"; // if (state.playMode === "shuffle") options.setShuffle = "on";

  _ControlView.default.loadSong(song, options);
}

function resetSong() {
  loadSong(_model.state.index, {
    currentTime: 0
  });
  playSong();
}

function shuffleSong() {
  var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  if (mode) _model.state.playMode = "shuffle";else _model.state.playMode = "main";

  if (mode) {
    _model.state.shuffleSongs = _model.state.songs.slice().map(function (value) {
      return {
        value: value,
        sort: Math.random()
      };
    }).sort(function (a, b) {
      return a.sort - b.sort;
    }).map(function (_ref) {
      var value = _ref.value;
      return value;
    });
  } else {
    _model.state.shuffleSongs = [];
  }
}

function playSong(playlistName) {
  _model.state.isPlaying = true;
  if (playlistName) return (0, _playlistSongsController.controlPlaySongFromCurrentPlaylist)(playlistName, 0); // checking if we are in playlist section

  if (_model.state.playUntilNextPlaylistExhaust === "true" && playMode === "next") return _ControlView.default.playSong();

  _ControlView.default.playSong();
}

function getNextPlayListSong() {
  if (!_model.state.songsToPlayNext) {
    return false;
  }

  _model.state.songsToPlayNext = _model.state.songsToPlayNext.filter(function (mov) {
    return mov.played === false;
  });
  var leftSongs = _model.state.songsToPlayNext;

  if (!leftSongs || leftSongs.length === 0) {
    _model.state.playMode = "main";
    return _model.state.songs[_model.state.index];
  }

  if (leftSongs.length > 0) {
    var song = leftSongs[0];
    song.played = true;
    return song;
  }
}

function controlGetMyPlaylistSong(index) {
  // songs => [1playlist,2ndplaylist,...]
  var song = (0, _playlistModel.modelGetCurrentPlaylistSong)(index);
  if (!song) return;
  return song;
}

function pauseSong() {
  _model.state.isPlaying = false;

  _ControlView.default.pauseSong();
}

function nextSong() {
  _model.state.isPlaying = true;
  var index = +_model.state.index;
  index = index + 1;
  if (index > _model.state.songs.length - 1) index = 0;
  _model.state.index = index;
  loadSong(index);
  playSong();
}

function prevSong() {
  _model.state.isPlaying = true;
  var index = +_model.state.index;
  index = index - 1;
  if (index < 0) index = _model.state.songs.length - 1;
  _model.state.index = index;
  loadSong(index);
  playSong();
}

function updateState(obj) {
  if (!obj || obj === null || obj === undefined) return;
  var objKeyValuePair = Object.entries(obj); // console.log(state)

  for (var _i = 0, _objKeyValuePair = objKeyValuePair; _i < _objKeyValuePair.length; _i++) {
    var _objKeyValuePair$_i = _slicedToArray(_objKeyValuePair[_i], 2),
        key = _objKeyValuePair$_i[0],
        value = _objKeyValuePair$_i[1];

    _model.state[key] = value;
  }
}

function controlPlayer(action, updateObj, option, playlistName) {
  updateState(updateObj);

  if (action === "play") {
    playSong(playlistName);
  }

  if (action === "pause") {
    pauseSong();
  }

  if (action === "next") nextSong();
  if (action === "prev") prevSong();
  if (action === "reset") resetSong();
  if (action === "shuffle") shuffleSong(option); // mean song has ended play next song

  if (action === "ended") {
    // Play song from songToPlay playlist
    nextSong(); // song to play directly from main stream
  }
}

function controlDisableSongChangeBtns(type) {
  _ControlView.default.disableSongChangeBtns(type);
}

function controlEnableSongChangeBtns(type) {
  _ControlView.default.enableSongChangeBtns(type);
} // handle all control like pause next prev volume up playback rate fast


_ControlView.default.addHandlerControl(controlPlayer);

_ControlView.default.autoPlayNextSong(controlPlayer); //  main,next,my-song,shuffle
},{"../../View/ControlView.js":"View/ControlView.js","../../Model/model.js":"Model/model.js","../../Model/playlistModel.js":"Model/playlistModel.js","./playlistSongsController.js":"Controller/Components/playlistSongsController.js"}],"Controller/script.js":[function(require,module,exports) {
"use strict";

var _OverviewView = _interopRequireDefault(require("../View/OverviewView.js"));

var _ControlController = require("./Components/ControlController.js");

var _model = require("./../Model/model.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Set song
_OverviewView.default.render(_model.state.songs);

(0, _ControlController.loadSong)(0); // modelUpdateState();
// playlistSongs.render(state.myPlaylist[0])
// updateState();
},{"../View/OverviewView.js":"View/OverviewView.js","./Components/ControlController.js":"Controller/Components/ControlController.js","./../Model/model.js":"Model/model.js"}],"View/SideBarView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _domFunction = require("../utils/_domFunction.js");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SidebarView = /*#__PURE__*/function () {
  function SidebarView() {
    _classCallCheck(this, SidebarView);

    _defineProperty(this, "_sideNav", document.querySelector(".sidebar__list"));

    _defineProperty(this, "_navElArr", _toConsumableArray(document.querySelectorAll(".sidebar__item")));

    _defineProperty(this, "_playListEl", this._sideNav.querySelector(".sidebar__item-options"));

    _defineProperty(this, "_playlistItemEl", document.querySelector(".sidebar__item--playlist"));
  }

  _createClass(SidebarView, [{
    key: "renderSidebarItemOptions",
    value: function renderSidebarItemOptions(arr) {
      this._playListEl.innerHTML = "";
      var html = arr.map(function (name) {
        return " <li\n                    class=\"nav__item sidebar__item-option\"\n                    data-action=\"select\"   data-playlist-name=".concat(name, "\n                  >\n                  \n                    <div class=\"nav__title\">").concat(name, "</div>\n                  </li>");
      }).join("");

      this._playListEl.insertAdjacentHTML("afterbegin", html);
    }
  }, {
    key: "hideSidebarPlaylistItems",
    value: function hideSidebarPlaylistItems() {
      this._playlistItemEl.dataset.state = "open";
    }
  }, {
    key: "addHandleSideNav",
    value: function addHandleSideNav(handle) {
      this._sideNav.addEventListener("click", function (e) {
        var target = e.target;
        target = target.closest(".nav__item");
        if (!target) return; // here we overwrite some css to show the list even if the list item are clicked when parent is not
        // clicked on item options

        if ((0, _domFunction.contains)(target, "sidebar__item-option")) {
          var sideBarItemOption = target.closest(".sidebar__item-option");
          var playlistName = sideBarItemOption.dataset.playlistName;
          handle("selected-playlist", playlistName);
          target = target.closest(".sidebar__item");
          sideBarItemOption.classList.add("nav__item--active");
          target.classList.add("nav__item--showList");
          return;
        } // Cliked on item


        if ((0, _domFunction.contains)(target, "sidebar__item")) {
          var section = target.dataset.section;
          if (!section || section === undefined) return; // CSSS STUFFF ************************************

          var state = target.dataset.state;
          state = state === "open" ? "close" : "open";

          if (state === "close") {
            target.classList.remove("nav__item--active");
            target.classList.remove("nav__item--showList");
          }

          target.dataset.state = state; // CONTRROLLER STUFF

          target = (0, _domFunction.closest)(target, "nav__item");
          handle(section);
        }
      });
    }
  }]);

  return SidebarView;
}();

var _default = new SidebarView();

exports.default = _default;
},{"../utils/_domFunction.js":"utils/_domFunction.js"}],"View/LibraryView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _domFunction = require("../utils/_domFunction.js");

var _CardView = _interopRequireDefault(require("./CardView.js"));

var _ParentView2 = _interopRequireDefault(require("./ParentView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var LibraryView = /*#__PURE__*/function (_ParentView) {
  _inherits(LibraryView, _ParentView);

  var _super = _createSuper(LibraryView);

  function LibraryView() {
    var _this;

    _classCallCheck(this, LibraryView);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_sectionEl", document.querySelector(".section-library"));

    _defineProperty(_assertThisInitialized(_this), "_parentEl", _this._sectionEl.querySelector(".library__content"));

    _defineProperty(_assertThisInitialized(_this), "_sortList", _this._sectionEl.querySelector(".operation__control"));

    _defineProperty(_assertThisInitialized(_this), "_operationValueEl", _this._sectionEl.querySelector(".operation__control-value"));

    _defineProperty(_assertThisInitialized(_this), "_controlShuffleBtn", document.querySelector('.control__btn[data-action="shuffle"]'));

    return _this;
  }

  _createClass(LibraryView, [{
    key: "_generateItemMarkUp",
    value: function _generateItemMarkUp(mov, i) {
      return " <div class=\"library__box\" >\n                <p class=\"library__box-index\">".concat(mov.name.slice(0, 1).toUpperCase(), "</p>\n                <li class=\"card\" data-index=").concat(+mov.index - 1, ">\n                    <img\n                        id=\"currentPhoto\"\n                        src=\"img/").concat(mov.img, "\"\n                        class=\"card__img\"\n                        onerror=\"this.onerror=null; this.src='img/default.jpg'\"\n                        alt=\"\"\n                    />\n                    <p class=\"card__name\">").concat(mov.name, "</p>\n                    <p class=\"card__artist\">").concat(mov.author, "</p>\n                    \n                </li>\n            </div>");
    }
  }, {
    key: "sortByProperty",
    value: function sortByProperty(target, handle) {
      // Sort Songs
      if ((0, _domFunction.closest)(target, "operation__control")) {
        // open sort List
        var sortList = (0, _domFunction.closest)(target, "operation__control");
        (0, _domFunction.addClass)(sortList, "operation__control--active"); // Select sort item

        var sortOption = (0, _domFunction.closest)(target, "nav__item");
        if (!sortOption) return;
        var sort = sortOption.dataset.sort; // update Sort By label value

        this._operationValueEl.textContent = sortOption.textContent; // Hiding the sort List

        (0, _domFunction.removeClass)(sortList, "operation__control--active");
        handle("sort", sort);
      }
    }
  }, {
    key: "addhandleLibrary",
    value: function addhandleLibrary(handle) {
      var _this2 = this;

      this._sectionEl.addEventListener("click", function (e) {
        var target = e.target; // Shuffle song by clicking control

        if ((0, _domFunction.closest)(target, 'btn[action="shuffle"]')) {
          target = (0, _domFunction.closest)(target, 'btn[action="shuffle"]');
          handle("shuffle");

          _this2._controlShuffleBtn.classList.toggle("control__btn--active");
        }

        _this2.sortByProperty(target, handle);
      });
    }
  }]);

  return LibraryView;
}(_ParentView2.default);

var _default = new LibraryView();

exports.default = _default;
},{"../utils/_domFunction.js":"utils/_domFunction.js","./CardView.js":"View/CardView.js","./ParentView.js":"View/ParentView.js"}],"View/SettingView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _domFunction = require("../utils/_domFunction.js");

var _ParentView2 = _interopRequireDefault(require("./ParentView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SettingView = /*#__PURE__*/function (_ParentView) {
  _inherits(SettingView, _ParentView);

  var _super = _createSuper(SettingView);

  function SettingView() {
    var _this;

    _classCallCheck(this, SettingView);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_sectionEl", document.querySelector(".section-setting"));

    _defineProperty(_assertThisInitialized(_this), "_parentEl", document.querySelector(".setting__content"));

    return _this;
  }

  _createClass(SettingView, [{
    key: "render",
    value: // addHandlerSettings() ************************
    function render() {
      this._toggleSectionHiddenClass();
    }
  }, {
    key: "_setSettingElTextValue",
    value: function _setSettingElTextValue(optionEl, optionElValue) {
      var settingElTextValue = optionEl.closest(".setting__item").querySelector(".setting__value");
      settingElTextValue.textContent = optionElValue;
      settingElTextValue.dataset.value = optionElValue;
    }
  }, {
    key: "_getAllOptionsEl",
    value: function _getAllOptionsEl(optionEl) {
      return _toConsumableArray(optionEl.closest(".setting__dropdown").querySelectorAll(".setting__dropdown-item"));
    }
  }, {
    key: "_setOptionElAsActiveOnly",
    value: function _setOptionElAsActiveOnly(optionEl) {
      var allOptionsEl = this._getAllOptionsEl(optionEl);

      var _iterator = _createForOfIteratorHelper(allOptionsEl),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var el = _step.value;
          el.dataset.active = "false";
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      optionEl.dataset.active = "true";
    }
  }, {
    key: "_handleChangeTheme",
    value: function _handleChangeTheme(action, optionEl, handle) {
      if (action !== "change-theme") return;
      var theme = optionEl.dataset.theme;

      this._setOptionElAsActiveOnly(optionEl);

      this._setSettingElTextValue(optionEl, theme);

      handle(action, theme);
    }
  }, {
    key: "_toggleSettingElActiveState",
    value: function _toggleSettingElActiveState(target) {
      var settingItem = (0, _domFunction.closest)(target, "setting__item");
      if (!settingItem) return false; // Common part in all items

      var _settingItem$dataset = settingItem.dataset,
          active = _settingItem$dataset.active,
          action = _settingItem$dataset.action; // simply toggle setting item activen state

      settingItem.dataset.active = active === "true" ? "false" : "true"; // if click el is settingItem option then dont hide it

      if ((0, _domFunction.closest)(target, "setting__dropdown-item")) settingItem.dataset.active = "true";
      return action;
    }
  }, {
    key: "addHandlerSettings",
    value: function addHandlerSettings(handle) {
      var _this2 = this;

      this._parentEl.addEventListener("click", function (e) {
        var target = e.target; // check if valid item and return item action

        var action = _this2._toggleSettingElActiveState(target);

        if (!action) return;
        var settingItemOption = (0, _domFunction.closest)(target, "setting__dropdown-item");
        if (!settingItemOption) return; // TO handle different item

        _this2._handleChangeTheme(action, settingItemOption, handle);
      });
    }
  }]);

  return SettingView;
}(_ParentView2.default);

var _default = new SettingView();

exports.default = _default;
},{"../utils/_domFunction.js":"utils/_domFunction.js","./ParentView.js":"View/ParentView.js"}],"View/playListMainView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ParentView2 = _interopRequireDefault(require("./ParentView.js"));

var _LibraryView = _interopRequireDefault(require("./LibraryView.js"));

var _domFunction = require("../utils/_domFunction.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var playListMainView = /*#__PURE__*/function (_ParentView) {
  _inherits(playListMainView, _ParentView);

  var _super = _createSuper(playListMainView);

  function playListMainView() {
    var _this;

    _classCallCheck(this, playListMainView);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "_sectionEl", document.querySelector(".section-playlist"));

    _defineProperty(_assertThisInitialized(_this), "_parentEl", _this._sectionEl.querySelector(".card__list"));

    _defineProperty(_assertThisInitialized(_this), "_addPlaylistBtn", _this._sectionEl.querySelector(".btn[data-action='create-playlist']"));

    _defineProperty(_assertThisInitialized(_this), "_addPlaylistPopup", document.querySelector(".popup__add "));

    _defineProperty(_assertThisInitialized(_this), "_playlistListsEl", _this._sectionEl.querySelector(".card__list"));

    _this._addPlaylist();

    return _this;
  }

  _createClass(playListMainView, [{
    key: "_generateItemMarkUp",
    value: function _generateItemMarkUp(mov) {
      if (mov.name && mov.songs.length === 0) return this._onlyPlaylistMarkUp(mov);
      return this._playlistWithSongsMarkUp(mov);
    }
  }, {
    key: "_onlyPlaylistMarkUp",
    value: function _onlyPlaylistMarkUp(mov) {
      // to have identifier in data attribute like belongto => main,library,playlist
      return "<li class=\"card\"  data-belong-to=\"playlist\" data-name=".concat(mov.name, " data-item=0>\n                    <div class=\"card__controls hidden\">\n                        <div class=\"card__control\" data-action=\"setting\" >\n                          <i class=\"card__control-icon fa fa-ellipsis-h\"></i>\n\n                          <ul class=\"nav__list card__settings\">\n                           \n                            <li class=\"nav__item\" data-action=\"remove\" data-belong-to=\"playlist\">Remove</li>\n                          </ul>\n                        </div>\n               \n                  </div>\n\n                <div class=\"card__collage card__single\">\n                      <img\n                        id=\"currentPhoto\"\n                        src=\"img/default.jpg\"\n                        class=\"card__img card__single \"\n                        onerror=\"this.onerror=null; this.src='img/default.jpg'\"\n                        alt=\"\"\n                        />\n                </div>\n                <p class=\"card__name\">").concat(mov.name, "</p>\n                <p class=\"card__artist\">").concat(mov.songs.length, " item</p>\n            </li>");
    }
  }, {
    key: "_playlistWithSongsMarkUp",
    value: function _playlistWithSongsMarkUp(mov) {
      var _mov$songs;

      return "<li class=\"card\" data-belong-to=\"playlist\" data-index=".concat(mov.songs[0].index, " data-name=").concat(mov.name, " data-item=1>\n                <div class=\"card__controls hidden\">\n                <div class=\"card__control\" data-action=\"setting\" >\n                  <i class=\"card__control-icon fa fa-ellipsis-h\"></i>\n\n                  <ul class=\"nav__list card__settings\">\n             \n                    <li class=\"nav__item\" data-action=\"remove\" data-belong-to=\"playlist\">Remove</li>\n                  </ul>\n                </div>\n          \n\n            </div>\n\n                <div class=\"card__collage\">\n                    ").concat((_mov$songs = mov.songs) === null || _mov$songs === void 0 ? void 0 : _mov$songs.map(function (song, i) {
        if (i === 4) return "";
        return "<img\n                                  id=\"currentPhoto\"\n                                  src=\"img/".concat(song.img, "\"\n                                  class=\"card__img card__collage-img\"\n                                  onerror=\"this.onerror=null; this.src='img/default.jpg'\"\n                                  alt=\"\"\n                                  />");
      }).join(""), "\n                </div>\n                  <p class=\"card__name\">").concat(mov.name, "</p>\n                  <p class=\"card__artist\">").concat(mov.songs.length, " item</p>\n              </li>");
    } // ////////////////////////////////////////////////////
    // FUNCTIONALITY

  }, {
    key: "_addPlaylist",
    value: function _addPlaylist() {
      var _this2 = this;

      this._addPlaylistBtn.addEventListener("click", function () {
        _this2._addPlaylistPopup.classList.remove("hidden");
      });
    }
  }, {
    key: "_showPlaylistSongs",
    value: function _showPlaylistSongs(target, handle) {
      var playlist = (0, _domFunction.closest)(target, "card");
      var name = playlist.dataset.name;
      handle(name);
    }
  }, {
    key: "_addHandlerShowPlaylistSongs",
    value: function _addHandlerShowPlaylistSongs(handle) {
      this._playlistListsEl.addEventListener("click", function (e) {// const target  = e.target;
        // // card is clicked
        // this._showPlaylistSongs(target,handle);
        // card is remove
      });
    }
  }]);

  return playListMainView;
}(_ParentView2.default);

var _default = new playListMainView();

exports.default = _default;
},{"./ParentView.js":"View/ParentView.js","./LibraryView.js":"View/LibraryView.js","../utils/_domFunction.js":"utils/_domFunction.js"}],"Controller/Components/playListMainController.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.controlShowPlaylist = exports.controlRenderPlaylistMainView = void 0;

var _playListMainView = _interopRequireDefault(require("../../View/playListMainView.js"));

var _model = require("../../Model/model.js");

var _playlistModel = require("../../Model/playlistModel.js");

var _playlistSongsController = require("./playlistSongsController.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import playListMainView from "../../View/playListMainView.js";
// import SideBarView from "../../View/SideBarView.js";
var controlRenderPlaylistMainView = function controlRenderPlaylistMainView() {
  var display = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  _playListMainView.default.render(_model.state.myPlaylist, true, display);
};

exports.controlRenderPlaylistMainView = controlRenderPlaylistMainView;

var controlShowPlaylist = function controlShowPlaylist(playlistName) {
  console.log(playlistName);
  var playlist = (0, _playlistModel.getPlaylist)(playlistName);
  console.log(playlist);
  (0, _playlistSongsController.controlRenderPlaylist)(playlist);
};

exports.controlShowPlaylist = controlShowPlaylist;

_playListMainView.default._addHandlerShowPlaylistSongs(controlShowPlaylist);
},{"../../View/playListMainView.js":"View/playListMainView.js","../../Model/model.js":"Model/model.js","../../Model/playlistModel.js":"Model/playlistModel.js","./playlistSongsController.js":"Controller/Components/playlistSongsController.js"}],"View/popupAdd.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CrudView = _interopRequireDefault(require("./CrudView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var popupAddPlayList = /*#__PURE__*/function () {
  function popupAddPlayList() {
    _classCallCheck(this, popupAddPlayList);

    _defineProperty(this, "_parentEl", document.querySelector(".popup__add"));

    _defineProperty(this, "_", void 0);

    _defineProperty(this, "_songsArr", void 0);
  }

  _createClass(popupAddPlayList, [{
    key: "showPopupAndAddSongs",
    value: function showPopupAndAddSongs() {
      var selectedSongs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      this._songsArr = selectedSongs;

      this._parentEl.classList.remove("hidden");
    }
  }, {
    key: "addhandlerCreatePlaylist",
    value: function addhandlerCreatePlaylist(handle) {
      var _this = this;

      this._parentEl.addEventListener("click", function (e) {
        var target = e.target.closest(".popup__add-btn");
        if (!target) return;
        var action = target.dataset.action; //   if btn is cancel

        if (action === "cancel") return _this._parentEl.classList.add("hidden"); //   if btn is create

        var playListNameEl = _this._parentEl.querySelector(".popup__add-input");

        var value = playListNameEl.value.trim();
        if (!value && value === "") return; // all goes successful

        handle(value, _this._songsArr);
        _this._songsArr = [];
        playListNameEl.value = "";

        _this._parentEl.classList.add("hidden");

        _CrudView.default.hide();
      });
    }
  }]);

  return popupAddPlayList;
}();

var _default = new popupAddPlayList();

exports.default = _default;
},{"./CrudView.js":"View/CrudView.js"}],"Controller/Components/PopupPlayListController.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.controlCreatePlayList = controlCreatePlayList;

var _popupAdd = _interopRequireDefault(require("../../View/popupAdd.js"));

var _sidebarController = require("./sidebarController.js");

var _model = require("../../Model/model.js");

var _crudController = require("./crudController.js");

var _playListMainController = require("./playListMainController.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import SidebarView from "../../View/SearchView.js";
function controlCreatePlayList(playListName) {
  var songsIndexArr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  if (!playListName) return; // CrudView.renderAddPlayBtnList(playListName);
  // console.log(songsIndexArr);
  // if only playlist is created with no song

  if (!songsIndexArr || (songsIndexArr === null || songsIndexArr === void 0 ? void 0 : songsIndexArr.length) === 0) (0, _model.createOnlyPlaylistWithName)(playListName); // when songs are added to playlist

  if (songsIndexArr.length > 0) (0, _model.createPlayListWithSongs)(playListName, songsIndexArr); // localSetState(state);

  (0, _crudController.controlRenderCrudAddToBtnCreatedPlaylists)();
  (0, _sidebarController.controlRenderSidebarPlayList)();
  (0, _playListMainController.controlRenderPlaylistMainView)(false); // playListMainView.render(state.myPlaylist, true, false);
}

_popupAdd.default.addhandlerCreatePlaylist(controlCreatePlayList);
},{"../../View/popupAdd.js":"View/popupAdd.js","./sidebarController.js":"Controller/Components/sidebarController.js","../../Model/model.js":"Model/model.js","./crudController.js":"Controller/Components/crudController.js","./playListMainController.js":"Controller/Components/playListMainController.js"}],"Controller/Components/crudController.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.controlRenderCrudAddToBtnCreatedPlaylists = exports.controlHideCrudContainer = void 0;

var _CrudView = _interopRequireDefault(require("../../View/CrudView.js"));

var _model = require("../../Model/model.js");

var _ControlController = require("./ControlController.js");

var _popupAdd = _interopRequireDefault(require("../../View/popupAdd.js"));

var _PopupPlayListController = require("./PopupPlayListController.js");

var _playlistModel = require("../../Model/playlistModel.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// remove
// addToPlayList
// play-next
var controlHideCrudContainer = function controlHideCrudContainer() {
  _CrudView.default.hide();
};

exports.controlHideCrudContainer = controlHideCrudContainer;

var controlRenderCrudAddToBtnCreatedPlaylists = function controlRenderCrudAddToBtnCreatedPlaylists() {
  console.log("hello");
  var playlistNames = (0, _playlistModel.modelGetAllPlaylistName)();
  console.log(playlistNames);

  _CrudView.default.renderAddPlayBtnList(playlistNames);
};

exports.controlRenderCrudAddToBtnCreatedPlaylists = controlRenderCrudAddToBtnCreatedPlaylists;

function controlCrud(action, value, playlistName) {
  console.log(action, value);
  if (action === "remove") (0, _model.deleteSongs)(value);
  if (action === "add-to-playlist") controlRenderCrudAddToBtnCreatedPlaylists();

  if (action === "create-playlist") {
    _popupAdd.default.showPopupAndAddSongs(value);
  }

  if (action === "select-playlist") {
    (0, _PopupPlayListController.controlCreatePlayList)(playlistName, value);
  }

  if (action === "play-next") {
    (0, _model.addToplayList)("my-next-list", null, value);
    (0, _ControlController.updateState)({
      playMode: "next"
    });
    (0, _ControlController.loadSong)(_model.state.index);
    (0, _ControlController.playSong)();
  }
}

_CrudView.default.handleCrud(controlCrud);
},{"../../View/CrudView.js":"View/CrudView.js","../../Model/model.js":"Model/model.js","./ControlController.js":"Controller/Components/ControlController.js","../../View/popupAdd.js":"View/popupAdd.js","./PopupPlayListController.js":"Controller/Components/PopupPlayListController.js","../../Model/playlistModel.js":"Model/playlistModel.js"}],"Controller/Components/sidebarController.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.controlHideSidebarPlayiistItems = void 0;
exports.controlRenderSidebarPlayList = controlRenderSidebarPlayList;

var _SideBarView = _interopRequireDefault(require("../../View/SideBarView.js"));

var _OverviewView = _interopRequireDefault(require("../../View/OverviewView.js"));

var _LibraryView = _interopRequireDefault(require("../../View/LibraryView.js"));

var _SettingView = _interopRequireDefault(require("../../View/SettingView.js"));

var _model = require("../../Model/model.js");

var _playListMainController = require("./playListMainController.js");

var _crudController = require("./crudController.js");

var _ControlController = require("./ControlController.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// to handle action on click on card
var controlHideSidebarPlayiistItems = function controlHideSidebarPlayiistItems() {
  return _SideBarView.default.hideSidebarPlaylistItems();
};

exports.controlHideSidebarPlayiistItems = controlHideSidebarPlayiistItems;

function controlRenderSidebarPlayList() {
  var playlistSongsName = _model.state.myPlaylist.map(function (mov) {
    return mov.name;
  });

  _SideBarView.default.renderSidebarItemOptions(playlistSongsName);
}

function controlSectionSelection(section, playlistName) {
  (0, _crudController.controlHideCrudContainer)();
  (0, _ControlController.controlEnableSongChangeBtns)("both");
  if (section !== "playlist") controlHideSidebarPlayiistItems();

  if (section === "overview") {
    _OverviewView.default.render(_model.state.songs);
  }

  if (section === "library") {
    _LibraryView.default.render(_model.state.songs);
  }

  if (section === "playlist") {
    (0, _playListMainController.controlRenderPlaylistMainView)(true);
    var playlistSongs = _model.state.myPlaylist;
    if (!playlistSongs || playlistSongs.length === 0) return;

    var playlistSongsName = _model.state.myPlaylist.map(function (mov) {
      return mov.name;
    });

    _SideBarView.default.renderSidebarItemOptions(playlistSongsName);
  } //


  if (section === "selected-playlist") {
    (0, _playListMainController.controlShowPlaylist)(playlistName);
  }

  if (section === "setting") _SettingView.default.render(); // here will be select playlist
} // To intially render all overview html


_SideBarView.default.addHandleSideNav(controlSectionSelection);
},{"../../View/SideBarView.js":"View/SideBarView.js","../../View/OverviewView.js":"View/OverviewView.js","../../View/LibraryView.js":"View/LibraryView.js","../../View/SettingView.js":"View/SettingView.js","../../Model/model.js":"Model/model.js","./playListMainController.js":"Controller/Components/playListMainController.js","./crudController.js":"Controller/Components/crudController.js","./ControlController.js":"Controller/Components/ControlController.js"}],"Controller/Components/libraryController.js":[function(require,module,exports) {
"use strict";

var _LibraryView = _interopRequireDefault(require("../../View/LibraryView.js"));

var _ControlController = require("./ControlController.js");

var _model = require("../../Model/model.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function controlLibrary(action, sortBy) {
  if (action === "shuffle") {
    (0, _ControlController.controlPlayer)("shuffle", null, true);
    (0, _ControlController.playSong)();
    console.log(_model.state);
  }

  if (action === "sort") {
    var sortSongs = (0, _model.getSongsSortBy)(sortBy);

    _LibraryView.default.render(sortSongs);
  }
}

_LibraryView.default.addhandleLibrary(controlLibrary);
},{"../../View/LibraryView.js":"View/LibraryView.js","./ControlController.js":"Controller/Components/ControlController.js","../../Model/model.js":"Model/model.js"}],"View/NavParentView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _domFunction = require("../utils/_domFunction.js");

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var NavView = /*#__PURE__*/function () {
  function NavView() {
    _classCallCheck(this, NavView);

    _defineProperty(this, "navListArr", _toConsumableArray(document.querySelectorAll(".nav__list")));
  }

  _createClass(NavView, [{
    key: "handleNav",
    value: function handleNav() {
      var _iterator = _createForOfIteratorHelper(this.navListArr),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var nav = _step.value;
          nav.addEventListener("click", function (e) {
            var target = e.target;
            target = target.closest("li");
            if (!target) return;

            var list = _toConsumableArray(this.querySelectorAll("li")); //   set active item
            // if (contains(target, "nav__item--active")) return;
            // setActiveElInArr(list, target, "nav__item--active");


            list.forEach(function (mov) {
              mov.classList.remove("nav__item--active");
              target.classList.add("nav__item--active");
            });
          });
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }]);

  return NavView;
}();

var _default = NavView;
exports.default = _default;
},{"../utils/_domFunction.js":"utils/_domFunction.js"}],"Controller/Components/ParentNavController.js":[function(require,module,exports) {
"use strict";

var _NavParentView = _interopRequireDefault(require("../../View/NavParentView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _NavParentView.default().handleNav();
},{"../../View/NavParentView.js":"View/NavParentView.js"}],"Controller/Components/cardController.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.controlCard = controlCard;
exports.controlResetEventHandleOfSearchCardList = void 0;

var _model = require("../../Model/model.js");

var _playlistModel = require("../../Model/playlistModel.js");

var _CardView = _interopRequireDefault(require("../../View/CardView.js"));

var _ControlController = require("./ControlController.js");

var _crudController = require("./crudController.js");

var _playListMainController = require("./playListMainController.js");

var _sidebarController = require("./sidebarController.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function controlCard(action, songIndex, playlistName, moreOption) {
  if (action === "play") {
    if (!playlistName) {
      (0, _ControlController.updateState)({
        index: songIndex,
        isPlaying: true,
        playMode: "main"
      });
      (0, _ControlController.loadSong)(songIndex, {
        toggle: "shuffle",
        playBtn: "play"
      });
    } else {
      (0, _ControlController.updateState)({
        playMode: "my-song"
      });
      var existSongs = (0, _playlistModel.playlistHasSong)(playlistName);
      if (!existSongs) return;
      (0, _ControlController.loadSong)(0, {
        toggle: "shuffle",
        playBtn: "play"
      }, playlistName);
    }

    (0, _ControlController.playSong)();
  }

  if (action === "play-next") {
    _model.state.playMode = "next";
    if (!playlistName) (0, _model.addToplayList)("next-list", songIndex);else (0, _playlistModel.addPlayListSongsToNextPlaylist)(playlistName); // moreOption === forcePlay

    if (moreOption === true) {
      (0, _ControlController.loadSong)(songIndex);
      (0, _ControlController.playSong)();
      (0, _ControlController.controlDisableSongChangeBtns)("both");
    }
  }

  if (action === "remove") {
    if (!playlistName && !moreOption) {
      (0, _model.deleteSong)(songIndex);
      (0, _model.deleteSongFromPlayList)("my-list", songIndex);
      (0, _model.deleteSongFromPlayList)("next-list", songIndex);
    }

    if (playlistName && !moreOption) {
      (0, _playlistModel.removePlaylist)(playlistName);
    } // remove-playlist


    if (moreOption) {
      (0, _playlistModel.removePlaylist)(playlistName);
      (0, _crudController.controlRenderCrudAddToBtnCreatedPlaylists)();
      (0, _sidebarController.controlRenderSidebarPlayList)();
      console.log("playlist", _model.state.myPlaylist);
    }
  }

  if (action === "open-playlist") (0, _playListMainController.controlShowPlaylist)(playlistName);
}

var controlResetEventHandleOfSearchCardList = function controlResetEventHandleOfSearchCardList(handle) {
  return _CardView.default._resetAddHandlerControlsToSearchCardList(handle);
};

exports.controlResetEventHandleOfSearchCardList = controlResetEventHandleOfSearchCardList;

_CardView.default.addhandlerControls(controlCard);
},{"../../Model/model.js":"Model/model.js","../../Model/playlistModel.js":"Model/playlistModel.js","../../View/CardView.js":"View/CardView.js","./ControlController.js":"Controller/Components/ControlController.js","./crudController.js":"Controller/Components/crudController.js","./playListMainController.js":"Controller/Components/playListMainController.js","./sidebarController.js":"Controller/Components/sidebarController.js"}],"Controller/Components/dropListController.js":[function(require,module,exports) {
"use strict";

var _dropListView = _interopRequireDefault(require("../../View/dropListView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"../../View/dropListView.js":"View/dropListView.js"}],"Controller/Components/modalController.js":[function(require,module,exports) {
"use strict";

var _ModalView = _interopRequireDefault(require("../../View/ModalView.js"));

var _playlistModel = require("../../Model/playlistModel.js");

var _playlistSongsController = require("./playlistSongsController.js");

var _sidebarController = require("./sidebarController.js");

var _crudController = require("./crudController.js");

var _playListMainController = require("./playListMainController.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var controlRenamePlaylist = function controlRenamePlaylist(oldName, newName) {
  (0, _playlistModel.modelRenamePlaylist)(oldName, newName);
  (0, _playlistSongsController.controlRenderPlaylistHeader)(newName);
};

var controlDeletePlaylist = function controlDeletePlaylist(name) {
  (0, _playlistModel.removePlaylist)(name);
  (0, _playlistSongsController.controlRenderPlaylist)(undefined);
};

var controlModalBtns = function controlModalBtns(action, currentPlaylistName, newPlaylistName) {
  if (action === "rename") controlRenamePlaylist(currentPlaylistName, newPlaylistName);

  if (action === "delete") {
    controlDeletePlaylist(currentPlaylistName);
    (0, _playListMainController.controlRenderPlaylistMainView)(true);
    (0, _crudController.controlRenderCrudAddToBtnCreatedPlaylists)();
    (0, _sidebarController.controlRenderSidebarPlayList)();
  }
};

_ModalView.default.addHandleModalBtns(controlModalBtns);
},{"../../View/ModalView.js":"View/ModalView.js","../../Model/playlistModel.js":"Model/playlistModel.js","./playlistSongsController.js":"Controller/Components/playlistSongsController.js","./sidebarController.js":"Controller/Components/sidebarController.js","./crudController.js":"Controller/Components/crudController.js","./playListMainController.js":"Controller/Components/playListMainController.js"}],"Controller/Components/SettingsController.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.controlChangeTheme = void 0;

var _SettingView = _interopRequireDefault(require("../../View/SettingView.js"));

var _ControlController = require("./ControlController.js");

var _model = require("../../Model/model.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var controlChangeTheme = function controlChangeTheme(theme) {
  (0, _ControlController.updateState)({
    theme: theme
  }); // ReRender whole app
};

exports.controlChangeTheme = controlChangeTheme;

var controlSettings = function controlSettings(action, value) {
  console.log(action, value);
  if (action === "change-theme") controlChangeTheme(value);
};

_SettingView.default.addHandlerSettings(controlSettings);
},{"../../View/SettingView.js":"View/SettingView.js","./ControlController.js":"Controller/Components/ControlController.js","../../Model/model.js":"Model/model.js"}],"View/SearchView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ParentView2 = _interopRequireDefault(require("./ParentView.js"));

var _domFunction = require("../utils/_domFunction.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SearchView = /*#__PURE__*/function (_ParentView) {
  _inherits(SearchView, _ParentView);

  var _super = _createSuper(SearchView);

  function SearchView() {
    var _this;

    _classCallCheck(this, SearchView);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_sectionEl", document.querySelector(".section-searchResults"));

    _defineProperty(_assertThisInitialized(_this), "_parentEl", document.querySelector(".search .drop-list"));

    _defineProperty(_assertThisInitialized(_this), "_searchEl", document.querySelector(".search"));

    _defineProperty(_assertThisInitialized(_this), "_searchInputEl", _this._searchEl.querySelector(".search__input"));

    _defineProperty(_assertThisInitialized(_this), "_searchResultContainer", _this._sectionEl.querySelector(".searchResults"));

    _defineProperty(_assertThisInitialized(_this), "_searchResultCardListEl", _this._sectionEl.querySelector(".section-searchResults .card__list"));

    _defineProperty(_assertThisInitialized(_this), "_searchResultsSongCardEl", _toConsumableArray(_this._sectionEl.querySelectorAll(".card")));

    return _this;
  }

  _createClass(SearchView, [{
    key: "_generateItemMarkUp",
    value: function _generateItemMarkUp(mov) {
      return "<li class=\"drop-item nav__item\" data-song=\"".concat(mov.name, "\">").concat(mov.name, " </li>");
    }
  }, {
    key: "renderSearchResultSection",
    value: function renderSearchResultSection(song) {
      this._toggleSectionHiddenClass();

      this._searchResultContainer.innerHTML = "";
      var html = "<div class=\"searchResults\">\n                  <header class=\"header\">\n                    <h3 class=\"heading-3\">Search Results for \"".concat(song.name, "\"</h3>\n                    <p class=\"subheading mg-sm\">Albums</p>\n                  </header>\n                  <div class=\"section-content\">\n                    <ul class=\"card__list\">\n                      ").concat(this._generateMarkUpSearchSong(song), "\n                    </ul>\n                  </div>\n                </div>");
      this._searchResultContainer.innerHTML = html;
    }
  }, {
    key: "_generateMarkUpSearchSong",
    value: function _generateMarkUpSearchSong(song) {
      return " <li class=\"card\" data-index=".concat(song.index, " data-music=").concat(song.music, " data-belong-to=\"search\">\n                <div class=\"card__controls hidden\">\n                \n                  <div class=\"card__control\" data-action=\"play\">\n                    <i class=\"card__control-icon fa fa-play\"></i>\n                  </div>\n                \n                </div>\n                <img\n                  id=\"currentPhoto\"\n                  src=\"/img/").concat(song.img, "\"\n                  class=\"card__img card__img--overview\"\n                  onerror=\"this.onerror=null; this.src='img/default.jpg'\"\n                  alt=\"\"\n                />\n                <p class=\"card__name card__name--overview\">\n                  ").concat(song.name, "\n                </p>\n                <p class=\"card__artist card__artist--overview\">\n                  ").concat(song.author, "\n                </p>\n            </li>");
    }
  }, {
    key: "_showSearches",
    value: function _showSearches() {
      this._searchEl.dataset.active = "true";
    }
  }, {
    key: "_hideSearches",
    value: function _hideSearches() {
      this._searchEl.dataset.active = "false";
    }
  }, {
    key: "_clearInput",
    value: function _clearInput() {
      this._searchInputEl.value = "";
    }
  }, {
    key: "addHandlerSearchSongs",
    value: function addHandlerSearchSongs(handle) {
      var _this2 = this;

      this._searchInputEl.addEventListener("input", function (e) {
        var value = e.target.value.trim();
        if (!value || value === "") return _this2._clearInput();
        handle(value);

        _this2._showSearches();
      });
    }
  }, {
    key: "addHandlerSelectSearchSongs",
    value: function addHandlerSelectSearchSongs(handle) {
      var _this3 = this;

      this._parentEl.addEventListener("click", function (e) {
        var target = (0, _domFunction.closest)(e.target, "drop-item");
        if (!target) return;
        var song = target.dataset.song;
        handle(song);

        _this3._hideSearches();

        _this3._clearInput();
      });
    }
  }, {
    key: "addHandlerSelectCard",
    value: function addHandlerSelectCard(handle) {
      console.log(this._searchResultCardListEl);

      this._searchResultCardListEl.addEventListener("click", function (e) {
        console.log(e);
        var card = (0, _domFunction.closest)(e.target, "card");
        if (!card) return;
        var index = card.dataset.index;
        handle("play", index);
      });
    }
  }]);

  return SearchView;
}(_ParentView2.default);

var _default = new SearchView();

exports.default = _default;
},{"./ParentView.js":"View/ParentView.js","../utils/_domFunction.js":"utils/_domFunction.js"}],"Controller/Components/SearchController.js":[function(require,module,exports) {
"use strict";

var _SearchView = _interopRequireDefault(require("../../View/SearchView.js"));

var _model = require("../../Model/model.js");

var _cardController = require("./cardController.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var controlSearchSongs = function controlSearchSongs(word) {
  return (0, _model.modelSearchSongs)(word);
};

var controlRenderSearchList = function controlRenderSearchList(word) {
  var songs = controlSearchSongs(word);

  _SearchView.default.render(songs);
};

var controlRenderSearchSongs = function controlRenderSearchSongs(name) {
  console.log(name);
  var songs = (0, _model.findSongByName)(name);
  console.log(songs);

  _SearchView.default.renderSearchResultSection(songs);

  (0, _cardController.controlResetEventHandleOfSearchCardList)(_cardController.controlCard);
};

_SearchView.default.addHandlerSearchSongs(controlRenderSearchList);

_SearchView.default.addHandlerSelectSearchSongs(controlRenderSearchSongs); // SearchView.addHandlerSelectCard(controlSelectCard);
},{"../../View/SearchView.js":"View/SearchView.js","../../Model/model.js":"Model/model.js","./cardController.js":"Controller/Components/cardController.js"}],"Controller/main.js":[function(require,module,exports) {
"use strict";

require("./script.js");

require("./Components/ControlController.js");

require("./Components/sidebarController.js");

require("./Components/libraryController.js");

require("./Components/crudController.js");

require("./Components/ParentNavController.js");

require("./Components/cardController.js");

require("./Components/dropListController.js");

require("./Components/PopupPlayListController.js");

require("./Components/playListMainController.js");

require("./Components/playlistSongsController.js");

require("./Components/modalController.js");

require("./Components/SettingsController.js");

require("./Components/SearchController.js");
},{"./script.js":"Controller/script.js","./Components/ControlController.js":"Controller/Components/ControlController.js","./Components/sidebarController.js":"Controller/Components/sidebarController.js","./Components/libraryController.js":"Controller/Components/libraryController.js","./Components/crudController.js":"Controller/Components/crudController.js","./Components/ParentNavController.js":"Controller/Components/ParentNavController.js","./Components/cardController.js":"Controller/Components/cardController.js","./Components/dropListController.js":"Controller/Components/dropListController.js","./Components/PopupPlayListController.js":"Controller/Components/PopupPlayListController.js","./Components/playListMainController.js":"Controller/Components/playListMainController.js","./Components/playlistSongsController.js":"Controller/Components/playlistSongsController.js","./Components/modalController.js":"Controller/Components/modalController.js","./Components/SettingsController.js":"Controller/Components/SettingsController.js","./Components/SearchController.js":"Controller/Components/SearchController.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "33451" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","Controller/main.js"], null)
//# sourceMappingURL=/main.a9f31e48.js.map