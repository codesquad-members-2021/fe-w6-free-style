export const requestfetch = async (METHOD, url, data, func) => {
   let requestData;
   let dataForm = {
      'value': data,
   }

   if (METHOD === 'POST') {
      requestData = await fetch(url, {
         method: METHOD,
         headers: {
            'Content-Type': 'application/json;charset=utf-8'
         },
         body: JSON.stringify(dataForm)
      });
   } else {
      requestData = await fetch(url, {
         method: METHOD,
         headers: {
            'Content-Type': 'application/json;charset=utf-8'
         },
      });
   }
   let response = await requestData.json();
   response.forEach(func);
}