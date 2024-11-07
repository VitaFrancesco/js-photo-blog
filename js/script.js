/**
 * 
 * @param {String} tagnName 
 * @param {Array} classList 
 * @param {Array} content 
 * @param {Function} callback 
 * @returns 
 */
function myCreateElement(
    tagnName,
    classList = [],
    content = [],
    callback = false
  ) {
    // Creo l'elemento
    const el = document.createElement(tagnName);
  
    // Aggiungo le classi
    if (classList.length > 0) {
      el.classList.add(...classList);
    }
  
    // Esegui la callback passando l'elemento
    if (callback) {
      callback(el);
    }
  
    // Contenuto
    if (Array.isArray(content)) {
      for (let i = 0; i < content.length; i++) {
        el.appendChild(content[i]);
      }
    } else if (content instanceof HTMLElement) {
      el.appendChild(content);
    } else if (typeof content === "string") {
      el.innerHTML = content;
    } else {
      console.error("Non posso aggiungere l'elemento");
    }
    return el;
};

function overlayShow (urlOverlay) {
  const overlayImg = document.querySelector('.overlay-body > img');
  overlayImg.src = urlOverlay;
  overlay.classList.remove('d-none');
};

function createPosts (array, frag) {
  
  array.forEach(({ url, title }) => {
      const postEl = myCreateElement('div', ["col-resp"],
          [
              myCreateElement('div', ['card'],
              [
                  myCreateElement('div', ['img-264px'],
                  [
                      myCreateElement('img', [], [], (el) => (el.src = url))
                  ]),
                  myCreateElement('p', ['text-post'],`${title}`),
                  myCreateElement('img', ['pin'], [], (el) => (el.src = './/img/pin.svg'))
              ])
          ]);
      frag.appendChild(postEl);
      const cardEl = postEl.children[0];
      cardEl.addEventListener('click', function () {
        overlayShow(url);
      })
  });
};

axios.get('https://jsonplaceholder.typicode.com/photos', { // oppure 'url...?_limit=6'
    params: {
        _limit: 6,
    },
})
    .then((res) => {
        const postsEl = res.data;
        const fragment = document.createDocumentFragment();
        createPosts(postsEl, fragment);
        postContainer.appendChild(fragment);
    })
    .catch((err) => {
        console.log(err);
    });

const postContainer = document.getElementById("posts-container");
console.log(postContainer);


const xButtonOverlay = document.getElementById('button-overlay');
const overlay = document.querySelector('.overlay');


xButtonOverlay.addEventListener('click', function (event) {
  event.stopPropagation(); // fermo la propagazione dell'evento
  overlay.classList.add('d-none');
  console.log('click bottone');
});
overlay.addEventListener('click', function (event) {
  console.log(event.target.tagName);
  if (event.target.tagName === 'IMG') {return}; // se target(dove si scatena l'evento click) è un immagine -> tagName allora fermo la funzione
  overlay.classList.add('d-none');
  console.log('click overlay');
});