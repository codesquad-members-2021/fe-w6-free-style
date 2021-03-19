import Editor from '@toast-ui/editor';

class TodoEditor {
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

export default TodoEditor;
