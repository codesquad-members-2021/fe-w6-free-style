import _ from '../util.js';
import TodoViewer from './toast/TodoViewer.js';

class TodoPostListItem {
    constructor(data, postlistItems) {
        this.html = '';
        this.viewerWrapId = '';
        this.viewer = null;
        this.createItem(data, postlistItems);
    }

    createItem = (data, postlistItems) => {
        const { idx } = data;
        const { setViewerWrapIdName } = postlistItems;
        this.setViewerWrapId(setViewerWrapIdName + idx);

        const html = this.createHtml(data, postlistItems);
        this.setHtml(html);

        // viewer 설정 확정은 List에서 (TodoPostList Wrapper에 들어간 후에 설정해야 하기에)
        // this.setViewer(postlistItems, content);
    };

    createHtml = (data, postlistItems) => {
        const { idx, subject } = data;
        const { setViewerIdName } = postlistItems;

        const html = `
        <div class="card my-2" id="${this.viewerWrapId}">
            <div class="mb-0">
                <button
                    class="btn btn-link text-left collapsed"
                    data-toggle="collapse"
                    data-target="#collapse${idx}"
                >
                    ${subject}
                </button>
            </div>
            <div
                id="collapse${idx}"
                class="collapse border-top"
                data-parent="#accordion"
            >
                <div class="px-3 py-2" id="${setViewerIdName}"></div>
            </div>
        </div>
        `;
        return html;
    };

    setViewerWrapId = (viewerWrapId) => (this.viewerWrapId = viewerWrapId);
    setHtml = (html) => (this.html = html);
    setViewer = (postlistItems, data) => {
        const { content } = data;

        const { setViewerIdName, viewerOptions: viewerTmp } = postlistItems;
        const viewerWrapper = _.$(`#${this.viewerWrapId} #${setViewerIdName}`);
        const viewerOptions = {
            ...viewerTmp,
            content,
        };
        this.viewer = new TodoViewer(viewerWrapper, viewerOptions);
    };
}

export default TodoPostListItem;
