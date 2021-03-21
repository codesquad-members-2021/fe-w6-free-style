import {
   searchEvent
} from "./ctrl.search.js";
import {
   observeNode
} from "./observer.js";
import {
   loadKeepData
} from "./ctrl.keepbtn.js";
import {
   dragAndDrop
} from "./ctrl.drag.js";


const init = () => {
   searchEvent();
   observeNode();
   loadKeepData();
   dragAndDrop();
};

init();