import _ from '../util.js';
import TodoPostList from './TodoPostList.js';

class TodoPostController {
    constructor(todoPostReference) {
        const {
            posting: { wrapper, subjectInput, goWriteBtn },
            postlist,
        } = todoPostReference;

        this.postingReference = {
            wrapper,
            subjectInput: _.$(subjectInput, wrapper),
            goWriteBtn: _.$(goWriteBtn, wrapper),
        };

        // this.postlistReference = postlist;
    }

    init = () => {
        const { subjectInput, goWriteBtn } = this.postingReference;
        this.setPostingBtnClickEvent(subjectInput, goWriteBtn);
    };

    // [Posting] Add 버튼 클릭 이벤트
    setPostingBtnClickEvent = (subjectInput, goWriteBtn) => {
        _.addEvent(goWriteBtn, 'click', () =>
            this.postingBtnClickEventHandler(subjectInput),
        );
    };

    postingBtnClickEventHandler = (subjectInput) => {
        // form의 POST 요청으로 할까했지만 굳이..
        const movePath = '/todo/write';
        location.href = subjectInput.value
            ? `${movePath}?subject=${subjectInput.value}`
            : movePath;
    };
}

export default TodoPostController;
