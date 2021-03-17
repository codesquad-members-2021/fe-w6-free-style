import _ from './util.js';
import TitleView from './TitleView.js';
import DailyPriceView from './DailyPriceView.js';
import CandleChartView from './CandleChart/CandleChartView.js';

const load = () => {
  const receive = {
    $receiveInput: _.$('.receive_input'),
    $receiveButton: _.$('.receive_button')
  }
  const title = {
    url: 'https://polling.finance.naver.com/api/realtime',
    $receiveInput: receive.$receiveInput,
    $receiveButton: receive.$receiveButton,
    $tickerCode: _.$('.title__info--code'),
    $name: _.$('.title__info--name'),
    $price: _.$('.title__info--price'),
    $gap: _.$('.title__info--gap')
  }

  const titleView = new TitleView(title);

  const daily = {
    url: 'https://m.stock.naver.com/api/item/getTrendList.nhn?size=10',
    $receiveInput: receive.$receiveInput,
    $receiveButton: receive.$receiveButton,
    $tableBody: _.$('.table__body')
  }

  const dailyPriceView = new DailyPriceView(daily);

  // var url = 'https://fchart.stock.naver.com/siseJson.nhn?symbol=035720&requestType=1&startTime=20210103&endTime=20210208&timeframe=day'; //A local page
  // function aa(url, callback) {
  //   const xhr = new XMLHttpRequest();
  //   xhr.onreadystatechange = () => { if (xhr.readyState === 4) callback(eval(xhr.response)) };
  //   xhr.open('GET', url, true);
  //   xhr.send('');
  // }

  // const c = (data) => { console.log(data) }
  // aa(url, c)

  const candle = {
    url: 'https://fchart.stock.naver.com/siseJson.nhn',
    $boxChart: _.$('.box_chart__chart'),
  }

  const candleChartView = new CandleChartView(candle);
}

window.addEventListener('DOMContentLoaded', load);