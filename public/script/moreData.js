export default class MoreData {
    constructor({moreData}, {URL, loadingNum, lastItemIndex}) {
        this.moreBtn = moreData.moreBtn;
        this.bannerWrap = moreData.bannerWrap;
        this.URL = URL;
        this.loadingNum = loadingNum;
        this.currItemIndex = lastItemIndex;
        this.temp = '';
        this.count = 0;
        this.setEvent();
    }
    setEvent() {
        this.moreBtn.addEventListener('click', this.loadItems.bind(this));
    }
    loadItems() {
        this.temp = '';
        this.count = 0;
        for(let i = 0; i < this.loadingNum; i++) {
            this.fetchData(this.currItemIndex + i);
        }
    }
    fetchData(idx) {
        fetch(`${this.URL}/item-list?index=${idx}`)
            .then(res => res.json())
            .then(this.makeTemplate.bind(this))
            .then(this.render.bind(this))
            .then(() => this.currItemIndex += this.loadingNum)
    }
    makeTemplate(item) {
        this.temp += `<li class="banner__item list__item"><a href="#">
            <img src="${item.imgurl}" alt="${item.title}">
            <span class="list__title">${item.title}</span>
            <span class="list__des">${item.subtitle}</span>
            <span class="list__theme">테마</span>
        </a></li>`
        this.count++;
    }
    render() {
        if(this.count !== this.loadingNum) return;
        const itemList = this.getListElement();
        this.bannerWrap.appendChild(itemList);
    }
    getListElement() {
        const el = document.createElement('ul');
        el.innerHTML = this.temp;
        el.classList.add('list__box') 
        el.classList.add('banner__list') 
        return el;
    }
}