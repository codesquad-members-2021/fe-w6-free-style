import React from 'react';

function General() {
  const style = {
    position: 'absolute',
    top: '-999px',
  };

  return (
    <div className="gnb" style={style}>
      <a href="/live/">실시간</a>
      <a href="/daily/">일별</a>
      <a href="/rates/">확진율</a>
      <a href="/world/">세계</a>
      <a href="/city/0/">서울</a>
      <a href="/city/8/">경기</a>
      <a href="/city/1/">부산</a>
    </div>
  );
}

export default General;
