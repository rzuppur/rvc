# Reino Vue Components

[View demo](https://rvc-demo.netlify.com/)

<br>

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
    label: string  // aria-label, for icon only buttons
    icon: string  // One of valid r-icon icons
    icon-color: string  // ("light-gray" | "green" | "red" | "blue" | "white")
  >
    {{ text }}
  </r-button>
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
From any component, call `this.$notifyToast("message");`.
### Dark mode
Add class `darkMode` to any parent element.
### Typography
Headings are all reset to normal text. Use `title-N` for visually styling them.

Available classes:
```
text-bold
text-quiet
text-center
text-right
text-error
text-small
title-1
title-2
title-3
title-4
title-5
title-6
title-caps
```
<br/><br/>

## Usage

### Install
`yarn add @rzuppur/rvc` or `npm install --save @rzuppur/rvc`

#### **`src/main.js`**
```javascript
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