const query = (selector,root=document) => {
    if(!root.childNodes) return;
    if(root.className === selector) return root;

    let answer;
    root.childNodes.forEach((node) => {
        if(query(selector,node)) answer = query(selector,node);
    })

    return answer;    
}

query("one");