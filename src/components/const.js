const personBox = [
  {
    name: '확진자',
    number: 0,
    change: 0,
    color: 'rgb(235, 83, 116)',
  },
  {
    name: '사망자',
    number: 0,
    change: 0,
    color: 'rgb(136, 136, 136)',
  },
  {
    name: '완치자',
    number: 0,
    change: 0,
    color: 'rgb(23, 138, 23)',
  },
  {
    name: '검사자',
    number: 0,
    change: 0,
    color: 'rgb(86, 115, 235)',
  },
];

const todayLeft = {
  title: '오늘 확진자수',
  unit: '명',
};

const todayCenterData = {
  textCenter: ['어제', '1주전'],
  number: [0, 0],
};
const todayRightData = {
  textRight: ['2주전', '1달전'],
  number: [0, 0],
};

export { personBox, todayLeft, todayCenterData, todayRightData };
