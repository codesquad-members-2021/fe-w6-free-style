class MySelector {
    constructor() {
        this.stack = [];
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

    queryAll(selector, root=document) {
        if(!root.childNodes) return;
        if(root.className === selector) {
            this.stack.push(root);
        }

        root.childNodes.forEach((node) => {
            this.queryAll(selector,node);
        })

        return this.stack;
    }
}


export {MySelector};
