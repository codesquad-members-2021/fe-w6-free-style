import _ from '../util.js';
import TodoWriteEditor from './TodoWriteEditor.js';

class TodoWriteController {
    constructor(todoWriteReference) {        
        const {
            formWrapper,
            formItems: { subject, content, cancelBtn },
            editorWrapper,
            editorOptions,
        } = todoWriteReference;
                
        this.formWrapper = _.$(formWrapper);
        this.formItems = {
            subject: _.$(subject, this.formWrapper),    // 임시 (subject)
            content: _.$(content, this.formWrapper),
            cancelBtn: _.$(cancelBtn, this.formWrapper),
        };
        this.editorWrapper = _.$(editorWrapper);
        this.editorOptions = editorOptions;
    };

    init = () => {
        const { content, cancelBtn } = this.formItems;
        this.setEditor(this.editorWrapper, this.editorOptions);
        this.setWriteFormSubmitEvent(this.formWrapper, content);
        this.setWriteFormCancelClickEvent(cancelBtn);
    };

    // Toast Editor 설정
    setEditor = (editorWrapper, editorOptions) =>
        (this.editor = new TodoWriteEditor(editorWrapper, editorOptions));

    // 글 서버로 전송
    setWriteFormSubmitEvent = (formWrapper, content) => {
        _.addEvent(formWrapper, 'click', (e) => this.writeFormSubmitEventHandler(e, content));
    };

    writeFormSubmitEventHandler = (e, content) => {
        const { target } = e;
        if (target.type !== 'submit') return;        
        content.value = this.editor.getHtml().trimEnd();
    };

    // 작성 취소
    setWriteFormCancelClickEvent = (cancelBtn) => {
        _.addEvent(cancelBtn, 'click', (e) => this.writeFormCancelClickEventHandler(e, cancelBtn));
    };

    writeFormCancelClickEventHandler = (e, cancelBtn) => {
        const { target } = e;
        if (target !== cancelBtn) return;
        location.href = "/todo";
    };
}

export default TodoWriteController;
