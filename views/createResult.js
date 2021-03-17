const createSummary = (summary) => {
  return summary.reduce((acc, val) => {
    const { quote, text, author } = val;
    acc += `<span class="summary__quote">${quote}</span>${author ? `<span class="summary__author">${author}</span>` : ""}<p class="summary__text">${text}</p>`;
    return acc;
  }, ``);
};

const createDetail = (detail) => {
  return detail.reduce((acc, val) => {
    const { head, body } = val;
    acc += `<span class="detail__head">${head}</span><p class="detail__body">${body}</p>`;
    return acc;
  }, ``);
};

const createPeople = (people) => {
  return (
    people.reduce((acc, val) => {
      const { name, imageUrl } = val;
      acc += `<span class="people__name">${name}</span><img class="people__image" src="${imageUrl}">`;
      return acc;
    }, `<span class="people__info">`) + `</span>`
  );
};

const createResult = (jsonData) => {
  const { type, content } = jsonData;
  const { title, summary, detail, people } = content;
  return /*html*/ `
    <div class="detail">
        <strong class="title">${type}: ${title}</strong>
        <div class="summary">
            ${createSummary(summary)}
        </div>
        <div class="detail">
             ${createDetail(detail)}
        </div>
        <div class="people">
            ${createPeople(people)}
        </div>
    </div>
    `;
};

module.exports = createResult;
