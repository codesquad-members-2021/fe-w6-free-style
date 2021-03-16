import Carousel from './carousel';
import MoreData from './moreData';
import ref from './ref'

const setting = {
    URL: '',
    loadingNum: 5
}

const carousel = new Carousel(ref);
const moreData = new MoreData(ref, setting);