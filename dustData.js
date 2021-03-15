const request = require("request");
const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const dustData = (sidoName, callback) => {
  const serviceKey =
    "tJSHfvCHbjGnll5ct5FeUTO0S70BCwNaXunsCf22XUCI11EHZWIUvxcOv6IMGCQo0d7Ga0USPnczrYzZ%2FZFGvA%3D%3D";
  const requestUrl =
    "http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty";
  let queryParams = "?" + encodeURIComponent("ServiceKey") + "=" + serviceKey; //서비스키
  queryParams +=
    "&" + encodeURIComponent("numOfRows") + "=" + encodeURIComponent("1");
  queryParams +=
    "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1");
  queryParams +=
    "&" + encodeURIComponent("dataTerm") + "=" + encodeURIComponent("DAILY"); //데이터측정시간

  queryParams +=
    "&" + encodeURIComponent("sidoName") + "=" + encodeURIComponent(sidoName); //시도 이름
  queryParams +=
    "&" + encodeURIComponent("ver") + "=" + encodeURIComponent("1.3");
  queryParams +=
    "&" + encodeURIComponent("_returnType") + "=" + encodeURIComponent("json");
  request(
    {
      url: requestUrl + queryParams,
      method: "GET",
    },
    function (error, response, body) {
      callback(body);
    }
  );
};

module.exports = dustData;
