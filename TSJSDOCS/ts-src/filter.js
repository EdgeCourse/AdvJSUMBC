"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
function isInput(el) {
    return el instanceof HTMLInputElement;
}
var input = document.getElementById('search');
var rows = document.querySelectorAll('#infoTable tbody tr');
if (isInput(input)) {
    (0, rxjs_1.fromEvent)(input, 'input').pipe((0, operators_1.map)(function (e) { return e.target.value.toLowerCase(); }), (0, operators_1.debounceTime)(300), (0, operators_1.distinctUntilChanged)()).subscribe(function (value) {
        rows.forEach(function (row) {
            var _a;
            var text = ((_a = row.textContent) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || '';
            row.style.display = text.includes(value) ? '' : 'none';
        });
    });
}
else {
    console.error('Search input not found or is not an input element.');
}
