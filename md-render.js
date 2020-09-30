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
options: {
	connect: (host, key) => {
		try { host[key] = JSON.parse(host.getAttribute(key));}
		catch (e) {console.error(e);}
	} // connect
}, // options


md: {
	get: (host, value) => host.innerHTML
}, // md

render: render(({ md }) => {
return (host) => host.innerHTML = 
`<div>${marked(host.innerHTML)}</div>`;
}, {shadowRoot: false}) // render
}; // descriptors

define("md-render", MdRender);

document.addEventListener("focusout",  redisplayResult);

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
<div class="source ${type}" contenteditable data-code='${code}'>${this.code(code, "_original_", escaped)}</div>
<div class="result ${type}" tabindex="0">${processResult(code, type, escaped)}</div>
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

function redisplayResult (event) {
	const source  = event.target;
const result = source.nextElementSibling;
const code = source.textContent;
//console.debug("redisplay: ", source, result, code);

if (source.classList.contains("js")) result.textContent = processJavascript(code);
else if (source.classList.contains("html")) result.innerHTML = code;
} // redisplayResult

