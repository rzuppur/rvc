/*
 * NOTE:
 *   This file is plugin stub for main.ts
 */

// @ts-ignore
// eslint-disable-next-line import/no-extraneous-dependencies
import Vue, { VueConstructor } from "vue";
import plugin from "./index";

Vue.use<VueConstructor>(plugin);

/*
 * NOTE:
 *   If you want Vue instance of main.ts to import something in your plugin as a Vue option,
 *   you need to export it here.
 */
// export default plugin
