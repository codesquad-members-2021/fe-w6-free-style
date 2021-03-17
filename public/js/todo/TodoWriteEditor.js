import _ from "../util.js";
import Editor from '@toast-ui/editor';

class TodoWriteEditor {
    constructor(editorWrapper, editorOptions) {
        this.editorWrapper = editorWrapper;

        const { height, initialEditType, previewStyle } = editorOptions;
        this.editor = new Editor({
            el: this.editorWrapper,
            height,
            initialEditType,
            previewStyle,
        });
    }

    getHtml = () => this.editor.getHtml();
};

export default TodoWriteEditor;
