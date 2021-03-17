import _ from "../util.js";
import TodoPostList from './TodoPostList.js';

class TodoPostView {
    constructor(todoPostReference) {
        this.todoPostReference = todoPostReference;  
    }

    init = () => {
        const {postingWrapper, postlistWrapper} = this.todoPostReference;
        console.log(postingWrapper, postlistWrapper)
    }
};

export default TodoPostView;