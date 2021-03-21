import {
   _
} from "./utill.js";
import {
   dragAndDrop
} from "./ctrl.drag.js";
import {
   saveCtrl
} from "./ctrl.save.js";

export const observeNode = () => {
   const mutationTarget = _.$('.naver_news');
   const observer = new MutationObserver(() => {
      dragAndDrop();
      saveCtrl();
   })

   const config = {
      childList: true
   };
   observer.observe(mutationTarget, config);
}