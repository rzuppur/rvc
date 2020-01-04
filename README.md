# Reino Vue Components
![npm version](https://img.shields.io/npm/v/@rzuppur/rvc)
![Licence](https://img.shields.io/npm/l/@rzuppur/rvc)
![Netlify demo build](https://img.shields.io/netlify/0f67bc1f-5af9-4c5a-ad7d-25c4e7ecdc00?label=demo%20build)

[View demo & docs](https://rvc-demo.netlify.com/)
<br>
[Install](#install)

<br>

### Modal
```html
<r-modal
  title: string | false
  blocking: boolean // optional
  buttons: boolean // optional, set to false to hide bottom bar with buttons
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
const result = await this.$root.rModalConfirm(
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
    icon-color: string  // ("gray" | "green" | "red" | "blue" | "link" | "white")
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
  icon-color: string  // ("gray" | "green" | "red" | "blue" | "link" | "white")
/>
```
### Toast notification
From any component, call `this.$rNotifyToast("message");`. Auto-hide timer is based on text length and paused if window is not currently visible.
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
Semantic heading level and visual style is separated — headings are all reset to normal text. Use `r-title-N` for visually styling them.

Default font stack is `"Inter", BlinkMacSystemFont, -apple-system, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"` but Inter is not imported, if you want to use it instead of OS default fonts you have to add `@import url('https://rsms.me/inter/inter.css')` to your css.

You can override the font and weights using stylus variables. Font size and ratio affects spacing, this can be overridden using `$spacing-base`.
- `$font-sans` font stack
- `$font-weight-sans-regular` default 400
- `$font-weight-sans-medium` default 500
- `$font-weight-sans-bold` default 600
- `$line-height-base` default 1.5
- `$font-size-base` default 16px
- `$font-sizes-ratio` default 1.333, used for generating heading sizes

Text style classes:

**Weight:** 
`r-text-regular`, `r-text-medium`, `r-text-bold`

**Color:** 
`r-text-color-body`, `r-text-color-quiet`, `r-text-color-error`

**Size:** 
`r-text-small`, `r-title-1`, `r-title-2`, `r-title-3`, `r-title-4`, `r-title-5`, `r-title-6`, `r-title-caps`

**Alignment:** 
`r-text-left`, `r-text-center`, `r-text-right`

**Overflow:**
`r-ellipsis`### Tabs
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
### Form
Bind value with v-model. Same props (except _type_) apply for `r-text-input` and `r-text-input-area`

```html
<div class="r-form-group">
  <r-text-input
    label: string
    placeholder: string
    helper-text: string
    invalid-message: string // setting this will mark the field as invalid
    type: string // default "text"
    fullwidth: boolean  // default true
  >
  </r-text-input>
</div>
```
### Sheets
`r-elevation-{0-4}` to add text and background color that changes with dark mode. For example, main content area and sidebar/header.

`r-border-radius` add default border radius

`r-border-radius-double` add default * 2 border radius
### Other
`r-{"margin" | "padding"}-{direction}-{size}` apply margin/padding to element
- direction: `top` `bottom` `left` `right`
- size: `huge` `large` `medium` `small` `tiny` `none`

`r-media-hide-{"small" | "medium" | "large"}` and `r-media-show-{"small" | "medium" | "large"}` to show/hide some items on small/medium/wide screens.

`r-flex-container` display flex, direction row

`r-flex-container-column` flex direction column

`r-flex-items-{"start" | "center" | "end"}` align flex childs

`r-flex-{0-3}` flex child grow and shrink value

`r-clearfix` clearfix

`r-styled-scrollbar` custom scrollbar style
<br/><br/>

## Usage
### Install
`yarn add @rzuppur/rvc` or `npm install --save @rzuppur/rvc`

```javascript
import Vue from "vue";
import rvc from "@rzuppur/rvc";
import "@rzuppur/rvc/src/styles/main.styl";

Vue.use(rvc);
```

To customize [Stylus](http://stylus-lang.com/) variables, import `main.styl` in your app styles instead and override values before the import. [View variables that can be themed here](https://github.com/rzuppur/rvc/blob/master/src/styles/shared.styl).

```stylus
/* CUSTOMIZE VARIABLES HERE */
$color-text = green

/* IMPORT RVC MAIN.STYL HERE */
@import "../node_modules/@rzuppur/rvc/src/styles/main.styl"
```
## Dev
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