let faces = [];

document.querySelector('.search').addEventListener('click', function () {
  let sha = document.querySelector('#search-query').value;

  document.querySelector('#search-query').value = "";

  fetchData(sha);
});

const fetchData = (sha) => {
  const url = 'https://api.github.com/repos/facebook/react/commits/' + sha;

  fetch(url, {
    method: 'GET',
    dataType: 'json'
  })
    .then(data => data.json())
    .then(data => addFace(data));
};

const addFace = (data) => {
  faces.push(
    {
      login: data.author.login,
      avatar_url: data.author.avatar_url
    }
  )

  renderFaces()
}

const renderFaces = () => {
  document.querySelector('.faces').replaceChildren();

  for (let i = 0; i < faces.length; i++) {
    let face = faces[i];

    const template = `
    <div class="col-md-4">
      <div class="face">
        <h3>Login: ${face.login}
        <img src="${face.avatar_url}"/>
      </div>
    </div>`;

    document.querySelector('.faces').insertAdjacentHTML('beforeend', template);
  };
};