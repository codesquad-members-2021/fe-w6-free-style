import Carousel from './carousel.js';
import MoreData from './moreData.js';
import ref from './ref.js'

const setting = {
    URL: 'http://localhost:3000',
    loadingNum: 5,
    lastItemIndex: 10
}

const carousel = new Carousel(ref);
const moreData = new MoreData(ref, setting);