const fetchApi = async() => {
  const data = await (await fetch('https://jsonplaceholder.typicode.com/posts?_page=1&_limit=1')).json();
  console.log(data);
}

fetchApi();
fetchApi();
fetchApi();
fetchApi();