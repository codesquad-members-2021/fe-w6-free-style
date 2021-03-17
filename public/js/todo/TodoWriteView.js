import _ from "../util.js";
import TodoWriteEditor from './TodoWriteEditor.js';

class TodoWriteView {
    constructor(editorReference) {
        this.editorReference = editorReference;
        this.editor = null;       
    }

    init = () => {
        this.setEditor(this.editorReference);

        // test only
        const { submitBtn } = this.editorReference;
        _.addEvent(submitBtn, 'click', () => this.createTodo())
    }

    setEditor = (editorReference) => {
        const { editorWrapper, editorOptions } = editorReference;
        if (!editorWrapper) return;

        this.editor = new TodoWriteEditor(editorWrapper, editorOptions);
    }

    createTodo = () => {
        console.log(this.editor.getHtml());
        console.log(this.editor.getMarkdown())
    }
};

export default TodoWriteView;