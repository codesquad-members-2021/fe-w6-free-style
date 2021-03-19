//------------------------✻✻✻ 제품 소개 페이지 ✻✻✻--------------------------
//공용 import
import './sidebar.js';
import './cart.js';

import { store } from '../store.js';
import display from '../display.js';
import { _ } from '../util.js';

//filter import
import { setUpSearch } from '../filter.js';

const loading = _.$('.page-loading');
display(store, _.$('.products-container'));
setUpSearch(store);
loading.style.display = 'none';


