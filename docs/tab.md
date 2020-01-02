Basic tabs component.
```html
<r-tabs
  extendLine: boolean  // Adds negative margin to the line between tabs and content, useful for top navigation tabs
  line: boolean  // Used to hide the line between tabs and content, this also removes any margin between tabs and content
>
  <r-tab-content
    name: string  // REQUIRED
    icon: string  // optional r-icon
  ></r-tab-content>
</r-tabs>
```
