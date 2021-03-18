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
        moreBtn: document.querySelector('.showMore'),
        bannerWrap: document.querySelector('.content__banner')
    }
}
export default ref;