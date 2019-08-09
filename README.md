# Reino Vue Components

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
  >
```

Valid icons are:
- add
- add image
- add text
- add date
- send
- check
- undo
- attention
- close
- more
- date
- merge
- download
- sync
- log out
- file
- upload
- edit
- images
- settings
- new message
- pin
- pin off
- expand
- collapse
- eye hidden
- eye visible
- arrow up
- arrow down
- arrow left
- arrow right
- chevron down
- chevron up

### Night mode
Add class `darkMode` to any parent element.

___

## Usage

### Install 
`yarn add @rzuppur/rvc` or `npm install --save @rzuppur/rvc`

#### **`src/main.js`**
```javascript
import rvc from "@rzuppur/rvc";
Vue.use(rvc);
```

___

### Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```
