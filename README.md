# markdownlint-rule-olstart

This rule is similar to `"MD029": { "style": "ordered" }` in checking the numbers in ordered lists. It will NEVER flag the first item in a list, regardless of what number it is (it assumes you want `<ol start="">`). It then expects subsequent list items to go up incrementally.
