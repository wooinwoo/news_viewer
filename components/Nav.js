// do something!
import { createNewsItem } from './NewsList.js';

var category = {
  active : 'all'
}
category = new Proxy(category,{
  get(target,prop){
    return prop in target ? target[prop] : null
  }
})

const Nav = () => {
  const get = (e) => document.querySelector(e);

  const createNav = () => {
    get('#root').innerHTML = `
      <nav class="category-list">
        <ul>
          <li id="all" class="category-item active">전체보기</li>
          <li id="business" class="category-item">비즈니스</li>
          <li id="entertainment" class="category-item">엔터테인먼트</li>
          <li id="health" class="category-item">건강</li>
          <li id="science" class="category-item">과학</li>
          <li id="sports" class="category-item">스포츠</li>
          <li id="technology" class="category-item">기술</li>
        </ul>
      </nav> `
  }

  const changeCategory = (e) => {
    if (e.target.classList.value !== 'category-item') return
    get('.category-list .category-item.active').classList.remove('active')
    e.target.classList.add('active')
    category.active = e.target.id
    createNewsItem(true)
  }

  const setEvent = () => { 
    get('.category-list').addEventListener('click', changeCategory)
  }

  const init = () => {
    createNav()
    document.addEventListener('DOMContentLoaded', ()=> {
    setEvent()
    })
  }

  init()

}

export default Nav;
export { category };