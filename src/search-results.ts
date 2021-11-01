import { renderBlock } from './lib.js'
import {Place} from "./search-form";

export function renderSearchStubBlock () {
  renderBlock(
    'search-results-block',
    `
    <div class="before-results-block">
      <img src="img/start-search.png" />
      <p>Чтобы начать поиск, заполните форму и&nbsp;нажмите "Найти"</p>
    </div>
    `
  )
}

export function renderEmptyOrErrorSearchBlock (reasonMessage) {
  renderBlock(
    'search-results-block',
    `
    <div class="no-results-block">
      <img src="img/no-results.png" />
      <p>${reasonMessage}</p>
    </div>
    `
  )
}

const toggleFavoriteItem = (event) => {
  const id = +event.target.id

  let favoritesList: Array<Partial<Place>> = JSON.parse(localStorage.getItem('favoriteItems'))
  let exist = false
  if (favoritesList) {
    for (let i = 0; i < favoritesList.length; i++) {
      if (favoritesList[i].id === id) {
        exist = true
        favoritesList.splice(i,1)
      }
    }
    if (!exist) {
      favoritesList.push({ id: id})
    }
  } else {
    favoritesList = [
      {
        id: id
      }
    ]
  }
  localStorage.setItem('favoriteItems', JSON.stringify(favoritesList))
}

const favoriteActive = (id: number): string => {
  let favoritesList: Array<Partial<Place>> = JSON.parse(localStorage.getItem('favoriteItems'))
  if (favoritesList) {
    const exist = favoritesList.find(el => el.id === id)
    return exist ? 'active' : ''
  }
  return ''
}

export function renderSearchResultsBlock (places: Array<Place>) {
  let html = `<div class="search-results-header">
        <p>Результаты поиска</p>
        <div class="search-results-filter">
            <span><i class="icon icon-filter"></i> Сортировать:</span>
            <select>
                <option selected="">Сначала дешёвые</option>
                <option selected="">Сначала дорогие</option>
                <option>Сначала ближе</option>
            </select>
        </div>
    </div>
    <ul class="results-list">`

  for (let place of places) {
    html += `<li class="result">
        <div class="result-container">
          <div class="result-img-container">
            <div class="favorites ${favoriteActive(place.id)}" id="${place.id}"></div>
            <img class="result-img" src="${place.image}" alt="">
          </div>	
          <div class="result-info">
            <div class="result-info--header">
              <p>${place.name}</p>
              <p class="price">${place.price}&#8381;</p>
            </div>
            <div class="result-info--map"><i class="map-icon"></i> ${place.remoteness}км от вас</div>
            <div class="result-info--descr">${place.description}</div>
            <div class="result-info--footer">
              <div>
                <button id="${place.id}">Забронировать</button>
              </div>
            </div>
          </div>
        </div>
      </li>`
  }

  html += `</ul>`

  renderBlock('search-results-block', html)

  const favorites = document.querySelectorAll('.favorites')
  favorites.forEach((element) => {
    element.addEventListener('click', toggleFavoriteItem)
  })
}
