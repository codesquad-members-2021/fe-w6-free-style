import _ from './util.js';
import TodoWriteView from './todo/TodoWriteView.js';

const REFERENCE = {
    editor: {
        editorWrapper: _.$('#toast_editor'), 
        editorOptions: {
            height: '600px',
            initialEditType: 'markdown',
            previewStyle: 'vertical',
        },
        submitBtn: _.$('#createTodoBtn')
    }
};

new TodoWriteView(REFERENCE.editor).init();