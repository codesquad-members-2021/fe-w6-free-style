// 210315_2219
class CustomQuerySelector {
    constructor(strSelector, target = document.documentElement) {
        this.types = {
            CLASS: 'className',
            ID: 'id',
            TAG: 'tagName',
        };

        this.selector = strSelector;
        this.target = target;
        this.arrCheck = [];

        return this.findNode(strSelector, target);
    }

    findType = (strSelector = '') => {
        const { CLASS, ID, TAG } = types;

        const firstChar = strSelector.charAt(0);
        switch (firstChar) {
            case '.':   return CLASS;
            case '#':   return ID;
            default:    return TAG;                
        };        
    };

    findNode = (strSelector, target) => {
        console.log(strSelector, target);

        return;
        let result;
        const { CLASS, ID, TAG } = this.types;
        
        if (!target) return;
        const type = findType(strSelector);

        switch (type) {
            case CLASS: {
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
}

export default CustomQuerySelector;
