export default class MoreData {
    constructor({moreData}, {URL, loadingNum}) {
        this.moreBtn = moreData.moreBtn;
        this.listWrap = moreData.listWrap;
        this.URL = URL;
        this.loadingNum = loadingNum;
        this.currItems = 4;
        this.setEvent();
    }
    setEvent() {
        this.moreBtn.addEventListener('click', );
    }
    loadItems() {
        for(let i = 0; i < this.loadingNum; i++) {
            this.fetchData(this.currItems + i);
        }
    }
    fetchData(idx) {
        fetch(`${this.URL}/item-list?index=${idx}`)
            .then(this.renderItems)
    }
    renderItems(items) {
        const data = [items.imgurl, items.title, items.subtitle]
        const temp = this.getTemplate(data);
        this.listWrap.appendChild(temp);
    }
    getTemplate([imgurl, title, subtitle]) {
        const temp = `<li class="banner__item list__item"><a href="#">
            <img src= ${imgurl} alt= ${title}>
            <span class="list__title">${title}</span>
            <span class="list__des">${subtitle}</span>
            <span class="list__theme">테마</span>
        </a></li>`
        return temp;
    }
}