import _ from '../util.js';
import TodoPostList from "./TodoPostList.js";

class TodoPostController {
    constructor(todoPostReference) {
        const {
            postingWrapper,
            postingItems: { subject, addBtn },
            postlistWrapper,
            postlistItems,
        } = todoPostReference;

        this.postingWrapper = _.$(postingWrapper);
        this.postingItems = {
            subject: _.$(subject, this.postingWrapper),
            addBtn: _.$(addBtn, this.postingWrapper)
        };

        // TodoPostList에서 쓰임
        this.postlistWrapper = _.$(postlistWrapper);
        this.postlistItems = postlistItems;
        // -----        
    }

    init = () => {
        const { subject, addBtn } = this.postingItems;
        this.setPostingAddBtnClickEvent(subject, addBtn);  
        this.setTodoPostList(this.postlistWrapper, this.postlistItems);
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

    // [Postlist] TodoPostList (+TodoPostListItem) 세팅 
    setTodoPostList = (postlistWrapper, postlistItems) => {        
        new TodoPostList(postlistWrapper, postlistItems).init();
    }; 
        

}

export default TodoPostController;
