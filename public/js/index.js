import _ from './util.js';

import AuthController from './auth/AuthController.js';
import TodoPostController from './todo/TodoPostController.js';
import TodoWriteController from './todo/TodoWriteController.js';

const PATHNAME = location.pathname;

const REFERENCE = {
    // path: /auth/login & /auth/register    
    auth: {        
        formWrapper: 'form.auth__content__form',
        formItems: {            
            userid: 'input#userid',
            userpwd: 'input#userpwd',
            userpwdChk: 'input#userpwd_chk',
        },
        errSection: 'p.auth--error',
    },
    // path: /todo  (이 페이지는 예외적으로 2부분으로 나눔)
    todoPost: {
        posting: {
            wrapper: _.$('#todo-posting'),
            subjectInput: 'input#todoSubject',
            goWriteBtn: 'button#goWrite',            
        },
        postlist: {
            wrapper: _.$('#todo-postlist'),
        },
    },
    // path: /todo/write
    todoWrite: {
        editorWrapper: _.$('#toast-editor'),
        editorOptions: {
            height: '600px',
            initialEditType: 'markdown',
            previewStyle: 'vertical',
        },
        editorBtnsWrapper: _.$('#todo-editorBtns'),
    },
};

// ------------

const { auth, todoPost, todoWrite } = REFERENCE;
switch (PATHNAME) {
    case '/auth/login':
    case '/auth/register':
        new AuthController(auth, PATHNAME).init();
        break;
    case '/todo':
        new TodoPostController(todoPost).init();
        break;
    case '/todo/write':
        new TodoWriteController(todoWrite).init();
        break;
    default:
        break;
}
