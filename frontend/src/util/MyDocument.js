class $document {
  constructor(){};
}

// static method
$document.querySelector = function(query, $parent = undefined) { 
  const finder = $document.finderCreate(query);
  return $document.find(query, finder, $parent);
}

$document.find = function(query, finder = null, $parent = document.body, stack = []) {
  // DFS 리프노드 종료 조건
  if ($parent === "") {
    return false;
  }
  
  // 개발자가 잘못해서 자기 자신을 찾는 경우
  if (finder.attribute === $parent[finder.findby] ) {
    console.log($parent)
    return $parent;
  }
  
  
  for (const child of [...$parent.children]) {
    if (finder.attribute !== child[finder.findby]) {
      stack.push(child);
      const result = $document.find(query, finder, child, stack);
      if (result) {
        return result;
      }
      stack.pop();
    } else {
      return child;
    }
  }
}

$document.finderCreate = function(query) {
  const classPattern = /[.]/g;
  const idPattern = /[#]/g;
  const finder = {};
  
  if (query.match(classPattern)) {
    query.split(classPattern).map((element, idx) => {
      if (idx === 0) { finder.tag = element }
      else if (idx === 1) { finder.attribute = element }
    });
    finder.findby = "className";
    return finder;
  } 
  else if (query.match(idPattern)) {
    query.split(idPattern).map((element, idx) => {
      if (idx === 0) { finder.tag = element }
      else if (idx === 1) { finder.attribute = element }
    });
    finder.findby = "id";
    return finder;
  }
}

// MyQuerySelector와 함께 하용하는 경우
$document.startFromSelector = function(query) {
  const $parent = $document.querySelector(query);
  
  // 체이닝의 형태처럼 작동하도록 클로저 활용
  const state = {
    querySelector: (query) => {
      return $document.querySelector(query, $parent);
    }
  }
  return state;
}

export default $document;