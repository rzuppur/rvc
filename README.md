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

![](https://i.imgur.com/22VRHdp.png)

<details><summary>Example usage (<a href="https://pugjs.org">Pug template</a>)</summary>
<pre>
.buttons
  r-button Normal
  r-button(primary) Primary
  r-button(borderless) Borderless
  r-button(gray borderless) Gray borderless
  r-button(gray) Gray
&nbsp;
.buttons
  r-button(disabled) Normal
  r-button(primary disabled) Primary
  r-button(borderless disabled) Borderless
  r-button(gray borderless disabled) Gray borderless
  r-button(gray disabled) Gray
&nbsp;
.buttons
  r-button(loading)
  r-button(primary loading)
  r-button(borderless loading)
  r-button(gray borderless loading)
  r-button(gray loading)
&nbsp;
.buttons
  r-button(icon="arrow left") Icon
  r-button(primary icon="add") Icon
  r-button(borderless icon="close" icon-color="red") Icon
  r-button(gray borderless icon="edit" icon-color="blue") Icon
  r-button(gray icon="check" icon-color="green") Icon
  &nbsp;
  r-button(icon="add image")
  r-button(borderless icon="eye visible")
&nbsp;
.buttons
  r-button(:action="test") @click test
  r-button(small) Small
  r-button(small icon="arrow left") Small icon
  r-button(small icon="close")
  r-button(small borderless icon="edit")
</pre>
</details>
    
### Icon
Material or modified material icons as 24x24px svg.
```html
  <r-icon
    icon: string
    icon-color: string  // ("gray" | "light-gray" | "green" | "red" | "blue" | "white")
  />
```

![](https://i.imgur.com/7BHFyiu.png)

### Night mode
Add class `darkMode` to any parent element.


___
<br/><br/>

## Usage

### Install 
`yarn add @rzuppur/rvc` or `npm install --save @rzuppur/rvc`

#### **`src/main.js`**
```javascript
import rvc from "@rzuppur/rvc";
Vue.use(rvc);
```

___
<br/><br/>

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
