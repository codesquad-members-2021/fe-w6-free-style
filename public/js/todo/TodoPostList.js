import { fetchData } from '../dataUtil.js';
import TodoPostListItem from './TodoPostListItem.js';

class TodoPostList {
    constructor(postlistWrapper, postlistItems) {
        this.postlistWrapper = postlistWrapper;
        this.postlistItems = postlistItems;
    }

    init = () => {
        this.setPostListItems(this.postlistItems);
    };

    setPostListItems = async (postlistItems) => {
        const todoData = await this.getUserTodoData();

        todoData.data.forEach((dataTmp, idx) => {
            const data = { ...dataTmp, idx };

            const item = new TodoPostListItem(data, postlistItems);
            this.postlistWrapper.insertAdjacentHTML('beforeend', item.html);
            item.setViewer(postlistItems, data);
        });
    };

    // [POST 요청] 유저의 TodoData 가져오기 (서버에서 세션 user id 기준으로 가져옴)
    getUserTodoData = async () => {
        const url = '/todo/getUserTodoData';
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        };
        return await fetchData(url, options);
    };
}

export default TodoPostList;
