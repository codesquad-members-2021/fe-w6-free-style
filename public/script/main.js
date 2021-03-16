import Carousel from './carousel.js';
import MoreData from './moreData.js';

const ref = {
    bannerRef: {
        prevBtn: document.querySelector('.btn_prev'),
        nextBtn: document.querySelector('.btn_next'),
        slideWrap: document.querySelector('.slide__wrap'),
        pagingList: document.querySelectorAll('.ico_paging'),
        pagingIcons: document.querySelectorAll('.num_page'),
        slideTime: 400,
        slideNum: 3
    },
    moreData: {
        moreBtn: document.querySelector('.showMore')
    }
}
console.log(banner);
const carousel = new Carousel(ref);
const moreData = new MoreData(ref); // URL 인자로 넘겨줘야 함