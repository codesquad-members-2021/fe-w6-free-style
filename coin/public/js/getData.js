async function getTickData(){
    const response = await fetch('http://zelord.tk/api/coin')
    const myJson = await response.json();

    return myJson;
}

export { getTickData }
