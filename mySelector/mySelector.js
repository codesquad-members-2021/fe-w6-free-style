class MySelector {
    constructor() {

    }

    query(selector,root=document) {
        if(!root.childNodes) return;
        if(root.className === selector) return root;
    
        let answer;
        root.childNodes.forEach((node) => {
            if(this.query(selector,node)) answer = this.query(selector,node);
        })
    
        return answer;    
    }
}


export {MySelector};
