import {
   _
} from "./utill.js";

export const variableGrouping = (target) => {
   const mainCard = target.closest('.card_tpl')
   const obj = {
      card: mainCard,
      inputWindow: _.$('.input_memo', mainCard) || null,
      showWindow: _.$('.show_memo', mainCard),
      saveBtn: _.$('.save_btn', mainCard) || null,
      bookmark: _.$('.bookmark', mainCard),
   }
   return obj;
}