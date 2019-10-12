# Reino Vue Components
![npm version](https://img.shields.io/npm/v/@rzuppur/rvc)
![Licence](https://img.shields.io/npm/l/@rzuppur/rvc)
![Netlify demo build](https://img.shields.io/netlify/0f67bc1f-5af9-4c5a-ad7d-25c4e7ecdc00?label=demo%20build)

[View demo & docs](https://rvc-demo.netlify.com/)
<br>
[Install](#install)

<br>

### Modal
```javascript
<r-modal
  title: string | false
  blocking: boolean // optional
  size: string  // optional, ("small" | "medium" | "large" | "huge" | "maximum")
>
  {{ modal content }}
  <template v-slot:buttons>
    {{ r-buttons }}
  </template>
</r-modal>
```

Confirmation modal
```javascript
const result = await $root.rModalConfirm(
  "Question",
  "Confirm text", // optional
  "Cancel text", // optional
  "Description text", // optional
);
```
### Tooltip
Tooltip directive `v-rtip`. Supports top (default), bottom, left and right alignment: `v-rtip.bottom`, `v-rtip.left`, `v-rtip.right`.
```html
<div
  v-rtip="'Tooltip text'"
></div>
```
### Button
Every property listed is optional. If button contains no childs but has an icon, it will be shown as an icon button (width equal to height).
```html
  <r-button
    primary: boolean
    gray: boolean 
    borderless: boolean
    small: boolean
    fullwidth: boolean
    disabled: boolean
    loading: boolean  // Shows a loading spinner and disables the button
    submit: boolean  // default type="button", this sets it to "submit" (for forms)
    action: function  // @click handler
    actionWithModifier: function  // @click.ctrl.exact handler
    label: string  // aria-label, for icon only buttons
    icon: string  // One of valid r-icon icons
    icon-color: string  // ("light-gray" | "green" | "red" | "blue" | "white")
  >
    {{ text }}
  </r-button>
```

Grouped buttons
```html
<div class="r-buttons-grouped">
  <div class="r-button-group">
    {{ r-buttons }}
  </div>
  <div class="r-button-group">
    {{ r-buttons }}
  </div>
</div>
```
### Icon
Material or modified material icons as 24x24px svg.
```html
<r-icon
  icon: string
  icon-color: string  // ("gray" | "light-gray" | "green" | "red" | "blue" | "white")
/>
```
### Toast notification
From any component, call `this.$rNotifyToast("message");`.
### Dark mode
Add class `darkMode` to any parent element.
### Containers
Container sizes: `r-container-tiny`, `r-container-small`, `r-container-medium`, `r-container-large`, `r-container-huge`, `r-container-maximum`

For basic content container use class `r-container` and `r-container-{size}`.

For columns, use `r-container-row` on parent and if you want your row to have a maximum width add `r-container-{size}`.
Use `r-container-column` for columns and add `r-container-{size}` to limit column size.

Add `r-columns-mobile-{small|medium|large}` to `r-container-row` to specify the breakpoint when columns should switch to block layout.


```html
<div class="r-container r-container-{tiny|small|medium|large|huge|maximum}"></div>

<div class="r-container-row r-container-{tiny|small|medium|large|huge|maximum} r-columns-mobile-{small|medium|large}">
  <div class="r-container-column r-container-{tiny|small|medium|large|huge|maximum}"></div>
  <div class="r-container-column r-container-{tiny|small|medium|large|huge|maximum}"></div>
  <div class="r-container-column r-container-{tiny|small|medium|large|huge|maximum}"></div>
</div>
```
### Typography
Headings are all reset to normal text. Use `title-N` for visually styling them.

Default font stack is `"Inter", BlinkMacSystemFont, -apple-system, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"` but Inter is not imported, if you want to use it instead of OS default fonts you have to add `@import url('https://rsms.me/inter/inter.css')` to your css.

Available classes:
`text-bold`, `text-quiet`, `text-center`, `text-right`, `text-error`, `text-small`, `title-1`, `title-2`, `title-3`, `title-4`, `title-5`, `title-6`, `title-caps`
### Tabs
Basic tabs component.
```html
<r-tabs
  extendLine: boolean  // Adds negative margin to the line between tabs and content, useful for top navigation tabs
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
<br/><br/>

## Usage
### Install
`yarn add @rzuppur/rvc` or `npm install --save @rzuppur/rvc`

```javascript
import Vue from "vue";
import rvc from "@rzuppur/rvc";

Vue.use(rvc);
```
### Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run demo
```

### Compiles and minifies for production
```
yarn run build
```