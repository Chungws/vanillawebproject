/* eslint-disable */
async function* postGenerator() {
  const pages = [...Array(11).keys()].slice(1);
  while (true) {
    for (const page of pages) {
      const data = await (await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}`)).json();
      yield Object.values(data);
    }
  }
}

let count = 0;
const renderNewPosts = (posts) => {
  const main = document.querySelector('main');

  posts.forEach((post) => {
    const { id, title, body } = post;
    const article = document.createElement('article');
    main.appendChild(article);
    article.innerHTML = `
<div>${id + 100 * count}</div>
<h2>${title}</h2>
<p>${body}</p>
`;
    if (id === 100) {
      count += 1;
    }
  });
};

const iterator = postGenerator();
window.addEventListener('load', async () => {
  const res = await iterator.next();
  renderNewPosts(res.value);
});

window.addEventListener('scroll', async () => {
  if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight * 0.8) {
    const pages = await iterator.next();
    renderNewPosts(pages.value);
  }
});

document.querySelector('input').addEventListener('input', (e) => {
  const text = e.target.value;
  Array.from(document.querySelectorAll('article')).forEach((article) => {
    const show = Array.from(article.children).find((child) => child.textContent.includes(text));
    if (show) {
      article.classList.remove('hidden');
    } else {
      article.classList.add('hidden');
    }
  });
});
