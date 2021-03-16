export default class MoreData {
    constructor({moreData}, URL) {
        this.moreBtn = moreData.moreBtn;
        this.URL = URL;
        this.setEvent();
    }
    setEvent() {
        this.moreBtn.addEventListener('click', );
    }
    renderItems() {

    }
    fetchData(idx) {
        fetch(`${this.URL}/item-list?index=${idx}`)
            .then()
    }
}