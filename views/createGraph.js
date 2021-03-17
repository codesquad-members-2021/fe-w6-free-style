const types = ["E", "I", "S", "N", "T", "F", "J", "P"];
const typekinds = ["energy", "information", "decision", "lifestyle"];

const createType = (scores) => {
  return scores.reduce((acc, val, idx) => {
    const template = `<span class="type__direction ${idx % 2 === 0 ? "left" : "right"}"><span class="type__result ${types[idx]} width_${val}"></span></span>`;
    acc += idx % 2 === 0 ? `<div class="type ${typekinds[Math.floor(idx / 2)]}">${template}` : `${template}</div>`;
    return acc;
  }, ``);
};

const createGraph = (scores) => {
  return /*html*/ `
    <div class="graph">
        ${createType(scores.split(""))}
    </div> 
    `;
};

module.exports = createGraph;
