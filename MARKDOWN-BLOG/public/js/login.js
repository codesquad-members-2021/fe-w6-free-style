console.log("hello js");

const loginForm = document.querySelector(".login-form");
const login = document.querySelectorAll(".login-form input");
const loginInput = login[0];
const loginSubmit = login[1];

// debugger;

function validateMyFrom() {

    if(loginInput.value == "1234") {
        loginForm.setAttribute("action", "/");
    } else {
        loginForm.setAttribute("action", "/login/fail");
    }
    loginForm.submit();
}

// 

// loginForm.submit(function (e) {
//     e.preventDefault();
//     let target = e.target.getAttribute("type");
//     debugger;
//     if(target !== "submit") return;

//     if(loginInput.innerText == "1234") {
//         loginForm.setAttribute("action", "/login/fail");
//     } else {
//         loginForm.setAttribute("action", "/");
//     }
   
// })




