import {define, html, render} from "./hybrids/index.js";
import purify from "./purify.es.js";

// start at heading level 2
const walkTokens = (token) => {
if (token.type === 'heading') {
token.depth += 1;
} // if
} // walkTokens

const renderer = {
code(code, type, escaped) {
switch (type.toLowerCase()) {
case "html": return this.processCode(code, type, escaped);
case "js": return this.processCode(code, type, escaped);
default: return false;
} // switch
}, // code

processCode: processCode
} // renderer

marked.use({walkTokens, renderer});

const MdRender = {
/*options: {
connect: (host, key) => {
try { host[key] = JSON.parse(host.getAttribute(key));}
catch (e) {console.error(e);}
} // connect
}, // options
*/

result: ref(".md-result"),

md: {
get: (host, value) => host.innerHTML,
observe: (host, value) => {
console.debug("assigning event listeners...");
if (value) {
host.result.addEventListener("focusin", resultFocusHandler);
host.result.addEventListener("keydown", sourceKeyboardHandler);
} // if
} // observe
}, // md

render: render(({ md }) => {
return (host) => host.innerHTML = 
`<div class="md-result">${marked(host.innerHTML)}</div>`;
}, {shadowRoot: false}) // render
}; // descriptors

define("md-render", MdRender);

export function ref(query) {
return ({ render }) => {
if (typeof render === 'function') {
const target = render();
return target.querySelector(query);
} // if

return null;
}; // return function
} // ref

function* idGen (name) {
const map = new Map();
while (true) {
if (!map.has(name)) map.set(name, 0);
const count = map.get(name) + 1;
map.set(name, count);
yield `${name}-${count}`;
} // while
} // idGen
const jsId = idGen("jsCodeBlock");

function processCode  (code, type, escaped) {
return `<div class="code-container ${type}">
<div class="source" data-type="${type}" contenteditable data-code='${code}'>${this.code(code, "_original_", escaped)}</div>
<div class="result" aria-atomic="true" data-type="${type}" tabindex="0">${processResult(code, type, escaped)}</div>
</div>`;
} // processCode

function processResult (code, type, escaped) {
return type === "html"? code
: processJavascript(code, escaped);
} // processResult

function processJavascript (code, escaped) {
try {
const fun = new Function("", code);
//fun.name = jsId.next().value;
//console.debug("fun: ", fun);
const result = fun();

return result;
} catch (e) {
return e.message;
} // try
} // processJavascript

function resultFocusHandler (e) {
const result = e.target;
const source = e.relatedTarget;
if (result.classList?.contains("result") && source.classList?.contains("source") && source === result.previousElementSibling) {
const code = source.textContent;
result.removeAttribute("role");
result.textContent = processResult(code, source.dataset.type);
} // if
} // resultFocusHandler

function sourceKeyboardHandler (e) {
const source = e.target;
if (!source.classList?.contains("source")) return;
const result  = e.target.nextElementSibling;
if (!result.classList?.contains("result")) return;

result.setAttribute("role", "status");

switch (e.key) {
case "Enter": if (e.ctrlKey) {
e.preventDefault();
const code = e.target.textContent;
result.textContent = processResult(code, source.dataset.type);
} // if
} // switch

} // sourceKeyboardHandler
