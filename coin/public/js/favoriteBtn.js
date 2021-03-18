function favoriteBtn(){
    let emptyStar = document.querySelector(".emptyStar")
    let emptyStarSmall = document.querySelectorAll(".emptyStarSmall")

    emptyStar.addEventListener("click",function() {
        emptyStar.classList.toggle("fillStar")
        if(emptyStar.className.split(" ").includes("fillStar")){
            localStorage.setItem("favorite_activate", true)
        } else {
            localStorage.setItem("favorite_activate", false)
        }
    })

    for(let i = 0; i < emptyStarSmall.length; i++){
        emptyStarSmall[i].addEventListener("click", function() {
            emptyStarSmall[i].classList.toggle("fillStarSmall")

            if(localStorage.getItem("favorite")){
                let arr = localStorage.getItem("favorite").split(",");
                let value = emptyStarSmall[i].id
                if(arr.includes(value)){
                    arr.splice(arr.indexOf(value), 1)
                } else {
                    arr.push(emptyStarSmall[i].id)
                }
                localStorage.setItem("favorite", arr)
            } else {
                let arr = []
                arr.push(emptyStarSmall[i].id)
                localStorage.setItem("favorite", arr)
            }
        })
    }
}

export { favoriteBtn }