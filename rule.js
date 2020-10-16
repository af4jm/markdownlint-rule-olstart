// @ts-check

"use strict";

const { addErrorDetailIf, flattenLists, listItemMarkerRe, orderedListItemMarkerRe,
  rangeFromRegExp } = require("markdownlint-rule-helpers");

module.exports = {
  "names": [ "ol-prefix-start" ],
  "description": "Ordered list item prefix, with start attribute",
  "tags": [ "ol" ],
  "function": function olPrefixStart(params, onError) {
    flattenLists(params).filter((list) => !list.unordered).forEach((list) => {
      const { items } = list;
      const first = orderedListItemMarkerRe.exec(items[0].line);
      const [ , firstNumber ] = first;
      let current = parseInt(firstNumber);
      // Validate each list item marker
      items.forEach((item) => {
        const match = orderedListItemMarkerRe.exec(item.line);
        if (match) {
          addErrorDetailIf(onError, item.lineNumber,
            String(current), match[1],
            'Style: incrementing from <ol start="">', null,
            rangeFromRegExp(item.line, listItemMarkerRe));
            current++;
        }
      });
    });
  }
};
