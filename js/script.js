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
