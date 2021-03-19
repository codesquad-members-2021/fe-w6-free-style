import _, { delay } from '../util.js';
import {fetchData} from '../dataUtil.js';

class AuthController {
    constructor(authReference, pathname) {
        this.authType = pathname.indexOf('login') > -1 ? 'login' : 'register';

        const {
            formWrapper,
            formItems: { userid, userpwd, userpwdChk },
            errSection,
        } = authReference;
                
        this.formWrapper = _.$(formWrapper);
        this.formItems = {
            userid: _.$(userid, this.formWrapper),
            userpwd: _.$(userpwd, this.formWrapper),
            userpwdChk: _.$(userpwdChk, this.formWrapper),
        };
        this.errSection = _.$(errSection, this.formWrapper);
    }

    init = () => {
        this.setAuthFormSubmitEvent(this.formWrapper);        
    };

    // Login | Register - 서버로 전송 (Submit) (+ 계정확인 | 아이디 중복확인, 비밀번호 체크)
    setAuthFormSubmitEvent = (formWrapper) => {        
        _.addEvent(formWrapper, 'submit', (e) => {
            this.authType === 'login'
                ? this.loginSubmitEventHandler(e)
                : this.regsiterSubmitEventHandler(e);
        });
    };

    // Login Submit Handler
    loginSubmitEventHandler  = async (e) => {
        e.preventDefault();
        const { userid, userpwd } = this.formItems;
        const checkUserResult = await this.getUserCheckResult(userid.value, userpwd.value);
        const { result: userCheckResult, message } = checkUserResult;

        if (!userCheckResult)
            this.setErrSectionValue(this.errSection, message)
        else
            this.formWrapper.submit();
    };

    // 계정 확인
    getUserCheckResult = async(userid, userpwd) => {
        const url = '/auth/userCheck';
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userid, userpwd }),
        };

        return await fetchData(url, options);
    };

    // Register Submit Handler
    regsiterSubmitEventHandler = async (e) => {
        e.preventDefault();
        const { userid, userpwd, userpwdChk } = this.formItems;        
        const checkDuplicateResult = await this.getDuplicateIDCheckResult(userid.value);
        const { result: dupIDResult, message } = checkDuplicateResult;

        if (dupIDResult)                        
            this.setErrSectionValue(this.errSection, message);            
        else if (!this.isSamePassword(userpwd.value, userpwdChk.value))           
            this.setErrSectionValue(this.errSection, '비밀번호를 확인해주세요.')
        else
            this.formWrapper.submit();        
    };

    // 비밀번호 체크
    isSamePassword = (pwd, pwdChk) => pwd === pwdChk;        

    // 아이디 중복확인 (서버 통신)
    getDuplicateIDCheckResult = async (userid) => {
        const url = '/auth/isDuplicateID';
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userid }),
        };

        return await fetchData(url, options);
    };

    // 에러메세지 설정
    setErrSectionValue = async (errSection, message) => {
        const errTextNode = _.createTextNode(message);

        if (errSection.innerText) errSection.innerText = '';

        _.appendChild(errSection, errTextNode);
        _.removeClass(errSection, 'display--none');
        await delay(3000);        
        _.addClass(errSection, 'display--none');        
    };
}

export default AuthController;