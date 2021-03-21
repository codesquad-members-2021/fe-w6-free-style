import {
   _
} from "./utill.js";
import {
   makeCard
} from "./make.cardtpl.js";
import {
   requestfetch
} from "./fetch.js";
import {
   refreshWindow
} from "./refresh.js";

export const loadKeepData = () => {
   const loadKeepBtn = _.$('.mykeep');

   loadKeepBtn.addEventListener('click', () => {
      refreshWindow();
      const url = 'http://localhost:3000/keep';
      requestfetch('GET', url, 'default', makeCard);
   })
}