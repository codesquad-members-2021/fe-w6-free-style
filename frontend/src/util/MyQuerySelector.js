// document.myquerySelector => 네이티브 타입을 수정하지 말자. 안티패턴
// $(document).myquerySelector => jquery의 모습을 해보자.

/*
  description:
  1) _$(startElementString : queryString)
    => return (customized-state with querySelector function)
  
  // HIGHLY RECOMMEND
  2) _$(startElementString : queryString).querySelector(query: queryString)
    => return HTMLDOMElement;
  
  3) _$().querySelector(query: queryString) : It's OK but start from rootnode which is document.body

  4) $document.querySelector(query: queryString): It also OK but find from rootnode which is document.body
*/

import $document from "./MyDocument.js"

const _$ = (startElement = document.body) => {
  if (typeof startElement === "string") {
    return $document.startFromSelector(startElement);
  } else {
    return $document;
  }
}

export default _$;