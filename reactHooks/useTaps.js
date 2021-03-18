//tab(다른 객체)와 index를 이용하여 재랜더링 하기﻿
export const useTabs = (initialTab, allTabs) => {
    if (!allTabs || !Array.isArray(allTabs)) {
      return;
    }
    const [currentIndex, setCurrentIndex] = useState(initialTab);
  
    return {
      currentItem: allTabs[currentIndex],
      changeItem: setCurrentIndex
    };
};
  

// const content = [
//     {
//       tab: "Section 1",
//       content: "I'm the content of the Section 1"
//     },
//     {
//       tab: "Section 2",
//       content: "I'm the content of the Section 2"
//     }
//   ];
  
  
//   const App = () => {
//     const { currentItem, changeItem } = useTabs(0, content);
//     return (
//       <div className="App">
//         {content.map((section, i) => (
//           <button onClick={() => changeItem(i)}>{section.tab}</button>
//         ))}
//         <div>{currentItem.content}</div>
//       </div>
//     );