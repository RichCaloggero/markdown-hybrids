import defineElements from "../define.js";
import { compileTemplate, getPlaceholder } from "./core.js";
import * as helpers from "./helpers.js";
var PLACEHOLDER = getPlaceholder();
var SVG_PLACEHOLDER = getPlaceholder("svg");
var STYLE_IMPORT_REGEXP = /@import/;
var templatesMap = new Map();
var stylesMap = new WeakMap();
var methods = {
  define: function define(elements) {
    defineElements(elements);
    return this;
  },
  key: function key(id) {
    this.id = id;
    return this;
  },
  style: function style() {
    for (var _len = arguments.length, styles = new Array(_len), _key = 0; _key < _len; _key++) {
      styles[_key] = arguments[_key];
    }

    stylesMap.set(this, styles.filter(function (style) {
      return style;
    }));
    return this;
  }
};

function create(parts, args, isSVG) {
  var createTemplate = function createTemplate(host) {
    var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : host;
    var styles = stylesMap.get(createTemplate);
    var hasAdoptedStyleSheets;
    var id = parts.join(PLACEHOLDER);

    if (styles) {
      var joinedStyles = styles.join(PLACEHOLDER);
      hasAdoptedStyleSheets = !!target.adoptedStyleSheets && !STYLE_IMPORT_REGEXP.test(joinedStyles);
      if (!hasAdoptedStyleSheets) id += joinedStyles;
    }

    if (isSVG) id += SVG_PLACEHOLDER;
    var render = templatesMap.get(id);

    if (!render) {
      render = compileTemplate(parts, isSVG, !hasAdoptedStyleSheets && styles);
      templatesMap.set(id, render);
    }

    render(host, target, args, hasAdoptedStyleSheets && styles);
  };

  return Object.assign(createTemplate, methods);
}

export function html(parts) {
  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  return create(parts, args);
}
export function svg(parts) {
  for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    args[_key3 - 1] = arguments[_key3];
  }

  return create(parts, args, true);
}
Object.assign(html, helpers);
Object.assign(svg, helpers);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZW1wbGF0ZS9pbmRleC5qcyJdLCJuYW1lcyI6WyJkZWZpbmVFbGVtZW50cyIsImNvbXBpbGVUZW1wbGF0ZSIsImdldFBsYWNlaG9sZGVyIiwiaGVscGVycyIsIlBMQUNFSE9MREVSIiwiU1ZHX1BMQUNFSE9MREVSIiwiU1RZTEVfSU1QT1JUX1JFR0VYUCIsInRlbXBsYXRlc01hcCIsIk1hcCIsInN0eWxlc01hcCIsIldlYWtNYXAiLCJtZXRob2RzIiwiZGVmaW5lIiwiZWxlbWVudHMiLCJrZXkiLCJpZCIsInN0eWxlIiwic3R5bGVzIiwic2V0IiwiZmlsdGVyIiwiY3JlYXRlIiwicGFydHMiLCJhcmdzIiwiaXNTVkciLCJjcmVhdGVUZW1wbGF0ZSIsImhvc3QiLCJ0YXJnZXQiLCJnZXQiLCJoYXNBZG9wdGVkU3R5bGVTaGVldHMiLCJqb2luIiwiam9pbmVkU3R5bGVzIiwiYWRvcHRlZFN0eWxlU2hlZXRzIiwidGVzdCIsInJlbmRlciIsIk9iamVjdCIsImFzc2lnbiIsImh0bWwiLCJzdmciXSwibWFwcGluZ3MiOiJBQUFBLE9BQU9BLGNBQVAsTUFBMkIsY0FBM0I7QUFFQSxTQUFTQyxlQUFULEVBQTBCQyxjQUExQixRQUFnRCxXQUFoRDtBQUNBLE9BQU8sS0FBS0MsT0FBWixNQUF5QixjQUF6QjtBQUVBLElBQU1DLFdBQVcsR0FBR0YsY0FBYyxFQUFsQztBQUNBLElBQU1HLGVBQWUsR0FBR0gsY0FBYyxDQUFDLEtBQUQsQ0FBdEM7QUFDQSxJQUFNSSxtQkFBbUIsR0FBRyxTQUE1QjtBQUVBLElBQU1DLFlBQVksR0FBRyxJQUFJQyxHQUFKLEVBQXJCO0FBQ0EsSUFBTUMsU0FBUyxHQUFHLElBQUlDLE9BQUosRUFBbEI7QUFFQSxJQUFNQyxPQUFPLEdBQUc7QUFDZEMsRUFBQUEsTUFEYyxrQkFDUEMsUUFETyxFQUNHO0FBQ2ZiLElBQUFBLGNBQWMsQ0FBQ2EsUUFBRCxDQUFkO0FBQ0EsV0FBTyxJQUFQO0FBQ0QsR0FKYTtBQUtkQyxFQUFBQSxHQUxjLGVBS1ZDLEVBTFUsRUFLTjtBQUNOLFNBQUtBLEVBQUwsR0FBVUEsRUFBVjtBQUNBLFdBQU8sSUFBUDtBQUNELEdBUmE7QUFTZEMsRUFBQUEsS0FUYyxtQkFTRztBQUFBLHNDQUFSQyxNQUFRO0FBQVJBLE1BQUFBLE1BQVE7QUFBQTs7QUFDZlIsSUFBQUEsU0FBUyxDQUFDUyxHQUFWLENBQ0UsSUFERixFQUVFRCxNQUFNLENBQUNFLE1BQVAsQ0FBYyxVQUFBSCxLQUFLO0FBQUEsYUFBSUEsS0FBSjtBQUFBLEtBQW5CLENBRkY7QUFJQSxXQUFPLElBQVA7QUFDRDtBQWZhLENBQWhCOztBQWtCQSxTQUFTSSxNQUFULENBQWdCQyxLQUFoQixFQUF1QkMsSUFBdkIsRUFBNkJDLEtBQTdCLEVBQW9DO0FBQ2xDLE1BQU1DLGNBQWMsR0FBRyxTQUFqQkEsY0FBaUIsQ0FBQ0MsSUFBRCxFQUF5QjtBQUFBLFFBQWxCQyxNQUFrQix1RUFBVEQsSUFBUztBQUM5QyxRQUFNUixNQUFNLEdBQUdSLFNBQVMsQ0FBQ2tCLEdBQVYsQ0FBY0gsY0FBZCxDQUFmO0FBQ0EsUUFBSUkscUJBQUo7QUFDQSxRQUFJYixFQUFFLEdBQUdNLEtBQUssQ0FBQ1EsSUFBTixDQUFXekIsV0FBWCxDQUFUOztBQUVBLFFBQUlhLE1BQUosRUFBWTtBQUNWLFVBQU1hLFlBQVksR0FBR2IsTUFBTSxDQUFDWSxJQUFQLENBQVl6QixXQUFaLENBQXJCO0FBQ0F3QixNQUFBQSxxQkFBcUIsR0FDbkIsQ0FBQyxDQUFDRixNQUFNLENBQUNLLGtCQUFULElBQStCLENBQUN6QixtQkFBbUIsQ0FBQzBCLElBQXBCLENBQXlCRixZQUF6QixDQURsQztBQUVBLFVBQUksQ0FBQ0YscUJBQUwsRUFBNEJiLEVBQUUsSUFBSWUsWUFBTjtBQUM3Qjs7QUFFRCxRQUFJUCxLQUFKLEVBQVdSLEVBQUUsSUFBSVYsZUFBTjtBQUVYLFFBQUk0QixNQUFNLEdBQUcxQixZQUFZLENBQUNvQixHQUFiLENBQWlCWixFQUFqQixDQUFiOztBQUNBLFFBQUksQ0FBQ2tCLE1BQUwsRUFBYTtBQUNYQSxNQUFBQSxNQUFNLEdBQUdoQyxlQUFlLENBQUNvQixLQUFELEVBQVFFLEtBQVIsRUFBZSxDQUFDSyxxQkFBRCxJQUEwQlgsTUFBekMsQ0FBeEI7QUFDQVYsTUFBQUEsWUFBWSxDQUFDVyxHQUFiLENBQWlCSCxFQUFqQixFQUFxQmtCLE1BQXJCO0FBQ0Q7O0FBRURBLElBQUFBLE1BQU0sQ0FBQ1IsSUFBRCxFQUFPQyxNQUFQLEVBQWVKLElBQWYsRUFBcUJNLHFCQUFxQixJQUFJWCxNQUE5QyxDQUFOO0FBQ0QsR0FyQkQ7O0FBdUJBLFNBQU9pQixNQUFNLENBQUNDLE1BQVAsQ0FBY1gsY0FBZCxFQUE4QmIsT0FBOUIsQ0FBUDtBQUNEOztBQUVELE9BQU8sU0FBU3lCLElBQVQsQ0FBY2YsS0FBZCxFQUE4QjtBQUFBLHFDQUFOQyxJQUFNO0FBQU5BLElBQUFBLElBQU07QUFBQTs7QUFDbkMsU0FBT0YsTUFBTSxDQUFDQyxLQUFELEVBQVFDLElBQVIsQ0FBYjtBQUNEO0FBRUQsT0FBTyxTQUFTZSxHQUFULENBQWFoQixLQUFiLEVBQTZCO0FBQUEscUNBQU5DLElBQU07QUFBTkEsSUFBQUEsSUFBTTtBQUFBOztBQUNsQyxTQUFPRixNQUFNLENBQUNDLEtBQUQsRUFBUUMsSUFBUixFQUFjLElBQWQsQ0FBYjtBQUNEO0FBRURZLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjQyxJQUFkLEVBQW9CakMsT0FBcEI7QUFDQStCLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjRSxHQUFkLEVBQW1CbEMsT0FBbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZGVmaW5lRWxlbWVudHMgZnJvbSBcIi4uL2RlZmluZS5qc1wiO1xuXG5pbXBvcnQgeyBjb21waWxlVGVtcGxhdGUsIGdldFBsYWNlaG9sZGVyIH0gZnJvbSBcIi4vY29yZS5qc1wiO1xuaW1wb3J0ICogYXMgaGVscGVycyBmcm9tIFwiLi9oZWxwZXJzLmpzXCI7XG5cbmNvbnN0IFBMQUNFSE9MREVSID0gZ2V0UGxhY2Vob2xkZXIoKTtcbmNvbnN0IFNWR19QTEFDRUhPTERFUiA9IGdldFBsYWNlaG9sZGVyKFwic3ZnXCIpO1xuY29uc3QgU1RZTEVfSU1QT1JUX1JFR0VYUCA9IC9AaW1wb3J0LztcblxuY29uc3QgdGVtcGxhdGVzTWFwID0gbmV3IE1hcCgpO1xuY29uc3Qgc3R5bGVzTWFwID0gbmV3IFdlYWtNYXAoKTtcblxuY29uc3QgbWV0aG9kcyA9IHtcbiAgZGVmaW5lKGVsZW1lbnRzKSB7XG4gICAgZGVmaW5lRWxlbWVudHMoZWxlbWVudHMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuICBrZXkoaWQpIHtcbiAgICB0aGlzLmlkID0gaWQ7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG4gIHN0eWxlKC4uLnN0eWxlcykge1xuICAgIHN0eWxlc01hcC5zZXQoXG4gICAgICB0aGlzLFxuICAgICAgc3R5bGVzLmZpbHRlcihzdHlsZSA9PiBzdHlsZSksXG4gICAgKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZShwYXJ0cywgYXJncywgaXNTVkcpIHtcbiAgY29uc3QgY3JlYXRlVGVtcGxhdGUgPSAoaG9zdCwgdGFyZ2V0ID0gaG9zdCkgPT4ge1xuICAgIGNvbnN0IHN0eWxlcyA9IHN0eWxlc01hcC5nZXQoY3JlYXRlVGVtcGxhdGUpO1xuICAgIGxldCBoYXNBZG9wdGVkU3R5bGVTaGVldHM7XG4gICAgbGV0IGlkID0gcGFydHMuam9pbihQTEFDRUhPTERFUik7XG5cbiAgICBpZiAoc3R5bGVzKSB7XG4gICAgICBjb25zdCBqb2luZWRTdHlsZXMgPSBzdHlsZXMuam9pbihQTEFDRUhPTERFUik7XG4gICAgICBoYXNBZG9wdGVkU3R5bGVTaGVldHMgPVxuICAgICAgICAhIXRhcmdldC5hZG9wdGVkU3R5bGVTaGVldHMgJiYgIVNUWUxFX0lNUE9SVF9SRUdFWFAudGVzdChqb2luZWRTdHlsZXMpO1xuICAgICAgaWYgKCFoYXNBZG9wdGVkU3R5bGVTaGVldHMpIGlkICs9IGpvaW5lZFN0eWxlcztcbiAgICB9XG5cbiAgICBpZiAoaXNTVkcpIGlkICs9IFNWR19QTEFDRUhPTERFUjtcblxuICAgIGxldCByZW5kZXIgPSB0ZW1wbGF0ZXNNYXAuZ2V0KGlkKTtcbiAgICBpZiAoIXJlbmRlcikge1xuICAgICAgcmVuZGVyID0gY29tcGlsZVRlbXBsYXRlKHBhcnRzLCBpc1NWRywgIWhhc0Fkb3B0ZWRTdHlsZVNoZWV0cyAmJiBzdHlsZXMpO1xuICAgICAgdGVtcGxhdGVzTWFwLnNldChpZCwgcmVuZGVyKTtcbiAgICB9XG5cbiAgICByZW5kZXIoaG9zdCwgdGFyZ2V0LCBhcmdzLCBoYXNBZG9wdGVkU3R5bGVTaGVldHMgJiYgc3R5bGVzKTtcbiAgfTtcblxuICByZXR1cm4gT2JqZWN0LmFzc2lnbihjcmVhdGVUZW1wbGF0ZSwgbWV0aG9kcyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBodG1sKHBhcnRzLCAuLi5hcmdzKSB7XG4gIHJldHVybiBjcmVhdGUocGFydHMsIGFyZ3MpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3ZnKHBhcnRzLCAuLi5hcmdzKSB7XG4gIHJldHVybiBjcmVhdGUocGFydHMsIGFyZ3MsIHRydWUpO1xufVxuXG5PYmplY3QuYXNzaWduKGh0bWwsIGhlbHBlcnMpO1xuT2JqZWN0LmFzc2lnbihzdmcsIGhlbHBlcnMpO1xuIl19