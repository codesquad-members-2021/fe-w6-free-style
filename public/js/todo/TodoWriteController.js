import _ from '../util.js';
import TodoWriteEditor from './TodoWriteEditor.js';

class TodoWriteController {
    constructor(todoWriteReference) {
        this.todoWriteReference = todoWriteReference;
        this.editor = null;
    }

    init = () => {
        const { editorWrapper, editorOptions, editorBtnsWrapper } = this.todoWriteReference;

        this.setEditor(editorWrapper, editorOptions);
        this.setEditorBtnsClickEvent(editorBtnsWrapper);
    };

    setEditor = (editorWrapper, editorOptions) =>
        (this.editor = new TodoWriteEditor(editorWrapper, editorOptions));

    setEditorBtnsClickEvent = (editorBtnsWrapper) => {
        _.addEvent(editorBtnsWrapper, 'click', (e) =>
            this.editorBtnsClickEventHandler(e),
        );
    };

    editorBtnsClickEventHandler = (e) => {
        const { target } = e;
        if (target.tagName !== 'BUTTON') return;

        // test..
        switch (target.id) {
            case 'todo-writeConfirm':
                console.log(this.editor.getHtml());
                break;

            case 'todo-writeCancel':
                location.href = "/todo";
                break;

            default:
                break;
        }
    };
}

export default TodoWriteController;
