// do something!
import { category } from './Nav.js';

var createNewsItem;
const NewsList = () => {
  
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const get = (e) => document.querySelector(e);
  
  const apiKey = '940d0281b1a7464b8394ded98d264e8e';
  const pageSize = 5;
  let page = 1;


  const createNewsList = () => {
    get('#root').innerHTML += `
    <div class="news-list-container">
      <article class="news-list">
      </article>
      <div class="scroll-observer">
        <img src="img/ball-triangle.svg" alt="Loading..." />
      </div>
    </div> `    
  }

  const getNewsItem = (itemList) => {
    let itemHTML = ''
    itemList.forEach(item => { 
      itemHTML +=
      `<section class="news-item">
          <div class="thumbnail">
            <a href=${item.url} target="_blank" rel="noopener noreferrer">
              <img
                src=${item.urlToImage}
                alt="thumbnail" />
            </a>
          </div>
          <div class="contents">
            <h2>
              <a href=${item.url} target="_blank" rel="noopener noreferrer">
                ${item.title}
              </a>
            </h2>
            <p>
              ${item.description}
            </p>
          </div>
        </section>`
    });
    return itemHTML;
  }


  createNewsItem = async(categoryChange = false) => {
    if (categoryChange === true){
      page = 1;
      get('.news-list').innerHTML = '';
      return
    }
    let url = `https://newsapi.org/v2/top-headlines?country=kr&category=${category.active === 'all' ? '' : category.active}&page=${page}&pageSize=${pageSize}&apiKey=${apiKey}`;
    await sleep(1000);
    fetch(url).then((res) => {
      return res.json();
    }).then((data) => {
      get('.news-list').innerHTML += getNewsItem(data.articles);
    })
    page += 1;
  }



  const callback = (entries,io) => {
    entries.forEach(async(entry) => {
      if (entry.isIntersecting) {
        createNewsItem(false)
      }
    });
  };

  const createIntersectionObserver = () => { 
    const io = new IntersectionObserver(callback , { threshold: 0.3 });
    io.observe(get('.scroll-observer'))
    setInterval(() => {
      io.unobserve(get('.scroll-observer'))
      io.observe(get('.scroll-observer'))
    }, 5000)
  }

  const init = () => {
    createNewsList();
    createIntersectionObserver();
  }
  init();

}

export default NewsList;
export {createNewsItem};



