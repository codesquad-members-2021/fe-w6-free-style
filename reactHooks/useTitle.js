//title 변경시 변경된 title로 업데이트
const useTitle = (initialTitle) => {
    const [title, setTitle] = useState(initialTitle);
  
    const updateTitle = () => {
      const htmlTitle = document.querySelector("title");
      htmlTitle.innerText = title;
    };
    useEffect(updateTitle, [title]);
    return setTitle;
};
  

// const App = () => {
//     const titleUpdater = useTitle("Loading...");
//     setTimeout(() => titleUpdater("home"), 5000);
//     return (
//       <div className="App">
//         <h1>hello</h1>
//       </div>
//     );
//   };