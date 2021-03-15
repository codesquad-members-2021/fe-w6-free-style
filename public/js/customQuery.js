/* 
    보류 리스트
    - div.allWrap
        이렇게 태그와 클래스이름이 붙어있는 경우..

    210315_2318
    보류.. 너무 생각할게 많음. 이러다간 플젝못함
*/

const arrVisit = [];
const types = {
    CLASS: 'className',
    ID: 'id',
    TAG: 'tagName',
    NEXT: '>',
    NEXTALL: ' ',
};

const findType = (strSelector = '') => {
    const { CLASS, ID, TAG, NEXT, NEXTALL } = types;

    const firstChar = strSelector.charAt(0);
    
    switch (firstChar) {
        case '.':   return CLASS;
        case '#':   return ID;
        case '>':   return NEXT;
        case ' ':   return NEXTALL;
        default:    return TAG;                
    };        
};

const createArraySelector = (strSelector) => {
    const { NEXT } = types;

    const result = [];
    const arrTmp = strSelector.split(' ');

    for (let i = 0; i <= arrTmp.length-1; i++) {
        const currSelector = arrTmp[i];
        const nextSelector = arrTmp[i+1];

        if (currSelector !== NEXT && nextSelector !== NEXT) 
            result.push(currSelector, ' ');                        
        else
            result.push(currSelector);
    }    

    result[result.length-1] === ' ' && result.pop();
    return result;
}

const $ = (strSelector, target = document.documentElement) => {        
    if (!target) return;

    let result;
    const { CLASS, ID, TAG, NEXT, NEXTALL } = types;
    const arrSelector = createArraySelector(strSelector);    
    
    switch (type) {
        case CLASS: {
            return findByClassName(strSelector, target);
            break;
        }

        case ID: {
            break;
        }

        case TAG: {
            break;
        }

        default:
            return;
    }

    return result;
};

export default $;
