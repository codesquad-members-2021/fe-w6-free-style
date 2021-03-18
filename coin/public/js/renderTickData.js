import { getTickData } from './getData.js';
import { coinKoName } from './coinName.js';
import { favoriteBtn } from './favoriteBtn.js';

const board = document.querySelector("#board");
const DIV_CLASSNAME = "flex divide-x-2 divide-gray-200 m-auto h-auto"

async function renderTick(){
    const myJson = await getTickData();
    const jsonKey = Object.keys(myJson);
    let LS = [];
    if(localStorage.getItem('favorite')){
        LS = localStorage.getItem('favorite').split(",")
    } 
    board.innerHTML = ""
    for(let i = 0; i < jsonKey.length; i++){
        let newDiv = document.createElement("div");
        let isFilled = "emptyStarSmall"
        newDiv.className = DIV_CLASSNAME;
        newDiv.id = `${jsonKey[i]}`
        if(coinKoName[jsonKey[i]]){
            
            if(LS.includes(jsonKey[i])){
                isFilled = "fillStarSmall"
            } 
            newDiv.innerHTML = [
                `<button id=${jsonKey[i]} class="bg-cover emptyStarSmall ${isFilled}"></button>`,
                `<div class="w-1/4">${coinKoName[jsonKey[i]]}</div>`,
                `<div class="w-1/4">${parseInt(myJson[jsonKey[i]]['ask']).toLocaleString( 'ko-KR', { style: 'currency', currency: 'KRW' } ) }원</div>`,
                `<div class="w-1/4">${myJson[jsonKey[i]]['changePercent']}%</div>`,
                `<div class="w-1/4">${Math.round(myJson[jsonKey[i]]['volume'])}</div>`,
            ].join("");
            
            board.appendChild(newDiv)
        }
    }
    favoriteBtn()
    console.log("render")
}

async function renderTickFavorite(){
    const myJson = await getTickData();
    const jsonKey = Object.keys(myJson);
    let LS = [];
    if(localStorage.getItem('favorite')){
        LS = localStorage.getItem('favorite').split(",")
    } 
    board.innerHTML = ""
    for(let i = 0; i < jsonKey.length; i++){
        let newDiv = document.createElement("div");
        let isFilled = "emptyStarSmall"
        let favorite = localStorage.getItem("favorite").split(",")
        newDiv.className = DIV_CLASSNAME;
        newDiv.id = `${jsonKey[i]}`
        if(coinKoName[jsonKey[i]] && favorite.includes(jsonKey[i]) ){
            
            if(LS.includes(jsonKey[i])){
                isFilled = "fillStarSmall"
            } 
            newDiv.innerHTML = [
                `<button id=${jsonKey[i]} class="bg-cover emptyStarSmall ${isFilled}"></button>`,
                `<div class="w-1/4">${coinKoName[jsonKey[i]]}</div>`,
                `<div class="w-1/4">${parseInt(myJson[jsonKey[i]]['ask']).toLocaleString( 'ko-KR', { style: 'currency', currency: 'KRW' } ) }원</div>`,
                `<div class="w-1/4">${myJson[jsonKey[i]]['changePercent']}%</div>`,
                `<div class="w-1/4">${Math.round(myJson[jsonKey[i]]['volume'])}</div>`,
            ].join("");
            
            board.appendChild(newDiv)
        }
    }
    favoriteBtn()
    console.log("renderFavorite")
}

async function repeatRenderTick(){
    let render = setTimeout(function tick(){
        if(localStorage.getItem("favorite_activate") && localStorage.getItem("favorite_activate").split().includes("true")){
            renderTickFavorite();
        }else{
            renderTick();
        }
        render = setTimeout(tick, 1000);
    },0)
}

export { repeatRenderTick }
