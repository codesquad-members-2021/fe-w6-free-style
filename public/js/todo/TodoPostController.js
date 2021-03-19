import _ from '../util.js';

class TodoPostController {
    constructor(todoPostReference) {
        const {
            postingWrapper,
            postingItems: { subject, addBtn },
            postlistWrapper,
        } = todoPostReference;

        this.postingWrapper = _.$(postingWrapper);
        this.postingItems = {
            subject: _.$(subject, this.postingWrapper),
            addBtn: _.$(addBtn, this.postingWrapper)
        };
        this.postlistWrapper = _.$(postlistWrapper);        
    }

    init = () => {
        const { subject, addBtn } = this.postingItems;
        this.setPostingAddBtnClickEvent(subject, addBtn);
    };

    // [Posting] Add 버튼 클릭 이벤트
    setPostingAddBtnClickEvent = (subject, addBtn) => {
        _.addEvent(addBtn, 'click', () =>
            this.postingAddBtnClickEventHandler(subject),
        );
    };

    postingAddBtnClickEventHandler = (subject) => {
        // form의 POST 요청으로 할까했지만 굳이..
        const movePath = '/todo/write';
        location.href = subject.value
            ? `${movePath}?subject=${subject.value}`
            : movePath;
    };
}

export default TodoPostController;
