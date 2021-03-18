class KeywordsPresentational {
  constructor({$target}) {
    const keywords = [
      "사랑하는 사람을 찾듯이 사랑하는 일을 찾아라.",
      "가장 훌륭한 일은 모험과 도전 정신으로 이뤄진다.",
      "먼저 행동으로 옮기고 나서 말하라.",
      "사람은 어려움 속에서 성장한다.", 
      "변화의 첫 걸음은 행동에 옮기는 것이다.",
      "삶은 무엇을 얼마나 절실히 바랬느냐의 합계이다.",
      "당신은 뭔가 더 대단한 것을 해낼 수 있다.",
      "창조성은 노력을 습관화하는데서 싹튼다.",
      "위기를 기회로 만들어라.",
      "하나둘셋 빰빰맨 화이팅"
    ]

    const idx = parseInt(Math.random()*10-1);
    this.render(keywords[idx]);
  }
  render(keyword) {

  }
}