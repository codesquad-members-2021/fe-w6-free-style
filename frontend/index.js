import App from "./src/app.js";
import _$ from "./src/util/MyQuerySelector.js";

const app = new App({
  $target: _$("#app").querySelector("#app")
});