Basic tabs component.
```html
<r-tabs
  extendLine: boolean  // Adds negative margin to the line between tabs and content, useful for top navigation tabs
  line: boolean  // Used to hide the line between tabs and content, this also removes any margin between tabs and content
>
  <r-tab-content
    name: string  // REQUIRED
  >
    {{ tab content }}
  </r-tab-content>
  <r-tab-content name="tab_name_2"></r-tab-content>
  <r-tab-content name="tab_name_3"></r-tab-content>
</r-tabs>
```
