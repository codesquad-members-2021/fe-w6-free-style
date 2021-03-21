import {
   _
} from "./utill.js";

export const refreshWindow = () => {
   const pasteWindow = _.$('.naver_news');
   while (pasteWindow.firstElementChild !== null) {
      pasteWindow.removeChild(pasteWindow.firstElementChild)
   }
}