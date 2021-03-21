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

export const searchEvent = () => {
   const searchWindow = _.$('.search_window');
   const searchBtn = _.$('.search_btn');
   let timer;

   searchWindow.addEventListener('input', () => {
      if (searchWindow.value === '') searchBtn.classList.add('hide');
      else {
         if (timer) clearTimeout(timer);
         timer = setTimeout(() => searchBtn.classList.remove('hide'), 600);
      }
   })

   searchBtn.addEventListener('click', () => {
      refreshWindow();
      const inputData = searchWindow.value;
      const url = 'http://localhost:3000/news/naver_news';
      requestfetch('POST', url, inputData, makeCard);
   })
}