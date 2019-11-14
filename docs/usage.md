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
$color-text = green;

/* IMPORT RVC STYLES HERE */
@import "../src/styles/main.styl";
```
