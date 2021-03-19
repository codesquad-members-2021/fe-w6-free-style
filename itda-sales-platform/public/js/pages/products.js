//------------------------✻✻✻ 제품 소개 페이지 ✻✻✻--------------------------
//공용 import
import './sidebar.js';
import './cart.js';

import { store } from '../store.js';
import display from '../display.js';
import { _ } from '../utill.js';

display(store, _.$('.products-container'));

//filter 관련부분

