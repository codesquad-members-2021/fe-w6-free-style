# fe-w6-free-style

### flow

1. 질문 -> 답변
2. 모든 질문에 답변 후 Url(express /web?type=entp&scores=909090)
3. /result?type=entp&scores=909090 -> 어떤 일을 해줘야하나??

### 만들어야 할 페이지

1. 인덱스 페이지(/)

   1. 대문 같은 존재
   2. 16가지의 mbti를 볼 수 있게 되어있음
   3. index.html
   4. res.send("/index.html");
   5. 여기는 index만의 html, css

2. 챗봇에서 사용자가 연결되어 들어오는 페이지
   1. url의 쿼리스트링에 해당하는 mbti 정보를 보여주는 페이지
   2. 설명, 이미지 등이 있음
   3. 사용자가 이 페이지로 들어오는 경우 html 파일을 보내줌
   4. 서버에서 `/result?type=entp&scores=90909054`에 대한 응답으로 html 템플레이팅한 결과를 보냄
   5. 사용자가 해당 url 누르면 자신의 mbti 결과 확인 가능

### 만들어야 하는 API

1. mbti의 데이터를 가지고 있으며 해당 데이터를 json 데이터로 응답
   1. 현재 `http://localhost:3000/result?type=ESFJ&scores=90909090`로, 로컬에서 테스트중
   2. 실제는 `http://34.64.132.100:3000/result?type={}&scores={}`
   3. 요기서 16가지의 데이터를 보내줌
