import {
   requestfetch
} from "./fetch.js";

import {
   _
} from "./utill.js";

import {
   variableGrouping
} from "./variables.js";

import {
   black,
   white
} from "../img/bookmark.js";
let variables;

const sendData = (id, comment, keep) => {
   const obj = {
      '_id': id,
      'save': keep,
      'comment': comment
   }

   const url = `http://localhost:3000/comment/save`;
   requestfetch('POST', url, obj, null);
}

const showInputToggleMode = ({
   showWindow,
   inputWindow,
   saveBtn
}) => {
   showWindow.classList.toggle('hide');
   inputWindow.classList.toggle('hide');
}

const switchBookMark = ({
   card,
   bookmark,
   inputWindow
}) => {
   const cardId = card.id;
   let comment = inputWindow.firstElementChild.value;

   const bookmarkClass = bookmark.firstElementChild.attributes.class.value;
   (bookmarkClass === 'black') ? changeWhiteUnSave(): changeBlackSave();

   function changeBlackSave() {
      bookmark.innerHTML = black;
      sendData(cardId, comment, true)
   }

   function changeWhiteUnSave() {
      bookmark.innerHTML = white;
      sendData(cardId, comment, false)
   }
}

const commentSave = ({
   saveBtn,
   showWindow,
   inputWindow
}) => {

   saveBtn.addEventListener('click', () => {
      switchBookMark(variables);
      showWindow.innerText = inputWindow.firstElementChild.value;
      showInputToggleMode(variables);
   })
}

const switchMode = ({
   showWindow,
   inputWindow
}) => {
   let value = showWindow.innerText;
   inputWindow.firstElementChild.value = (value === '◌ Double click here to memo ◌') ? '' : value;
   showInputToggleMode(variables);

   const parent = showWindow.parentNode;
   parent.insertBefore(inputWindow, showWindow);
   commentSave(variables);
}

const saveThruSaveBtn = () => {
   const memoClick = _.$All('.show_memo');
   memoClick.forEach(el => {
      const memoInit = el.closest('.memo');
      memoInit.addEventListener('dblclick', ({
         target
      }) => {
         variables = variableGrouping(target)
         switchMode(variables)
      })
   })
}

const saveThruBookmark = () => {
   const Bookmarks = _.$All('.bookmark')
   Bookmarks.forEach(el => el.addEventListener('click', ({
      target
   }) => {
      variables = variableGrouping(target)
      switchBookMark(variables)
   }))
}

export const saveCtrl = () => {
   saveThruSaveBtn()
   saveThruBookmark()
}