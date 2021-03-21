import _ from '../util.js';
import TodoViewer from './toast/TodoViewer.js';

class TodoPostListItem {
    constructor(parentWrapper) {
        this.parentWrapper = parentWrapper;
        this.html = '';
        this.viewerAllWrapperId = '';
        this.viewer = null;        
    }

    set setviewerAllWrapperId(viewerAllWrapperId) {
        this.viewerAllWrapperId = viewerAllWrapperId;
    }

    set setHtml(html) {
        this.html = html;
    }

    set setViewer(viewer) {
        this.viewer = viewer;
    }

    init = (options, data, parentWrapper = this.parentWrapper) => {
        const { idx } = data;
        const { viewerAllWrapperId } = options;
        this.setviewerAllWrapperId = (viewerAllWrapperId + idx);

        this.setHtml = this.createHtml(this.viewerAllWrapperId, options, data);
        this.insertIntoParentWrapper(parentWrapper, this.html);

        this.setViewer = this.createViewer(options, data);
    };

    createHtml = (viewerAllWrapperId, options, data) => {
        const { viewerWrapperId } = options;
        const { idx, subject } = data;

        const html = `
        <div class="card my-2" id="${viewerAllWrapperId}">
            <div class="mb-0 d-flex align-items-center">
                <button
                    class="btn btn-link text-left collapsed"
                    data-toggle="collapse"
                    data-target="#collapse${idx}"
                >
                    ${subject}
                </button>
                <div class="ml-auto mr-3 ft--15">
                    <a href="#edit" class="text-secondary text-decoration-none">
                        <i class="far fa-edit"></i>
                    </a>
                    <a href="#delete" class="text-secondary text-decoration-none">
                        <i class="far fa-trash-alt"></i>
                    </a>
                </div>
            </div>
            <div
                id="collapse${idx}"
                class="collapse border-top"
                data-parent="#accordion"
            >
                <div class="px-3 py-2" id="${viewerWrapperId}"></div>
            </div>
        </div>
        `;
        return html;
    };

    createViewer = (options, data) => {
        const { content } = data;
        const { viewerWrapperId, viewerOptions: viewerTmp } = options;

        const viewerWrapper = _.$(`#${this.viewerAllWrapperId} #${viewerWrapperId}`);
        const viewerOptions = {
            ...viewerTmp,
            content,
        };

        return new TodoViewer(viewerWrapper, viewerOptions);
    };

    insertIntoParentWrapper = (parentWrapper, itemHtml, position = 'beforeend') =>
        parentWrapper.insertAdjacentHTML(position, itemHtml);
}

export default TodoPostListItem;
