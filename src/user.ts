import {renderBlock} from './lib.js'
import {Place} from "./search-form";

class User {
  username: string = 'Wade Warren'
  avatarUrl: string = '/img/avatar.png'
}

export function renderUserBlock (username: string, avatarUrl: string, favoriteItemsAmount = 0) {
  const favoritesCaption = favoriteItemsAmount >= 1 ? favoriteItemsAmount : 'ничего нет'
  const hasFavoriteItems = favoriteItemsAmount >= 1

  renderBlock(
    'user-block',
    `
    <div class="header-container">
      <img class="avatar" src=${avatarUrl} alt=${username} />
      <div class="info">
          <p class="name">${username}</p>
          <p class="fav">
            <i class="heart-icon${hasFavoriteItems ? ' active' : ''}"></i>${favoritesCaption}
          </p>
      </div>
    </div>
    `
  )
}

export function getUserData (): User {
  const data: unknown = JSON.parse(localStorage.getItem('user'))

  if (data instanceof User) {
    return data
  } else {
    return new User()
  }
}

export function getFavoritesAmount (): number | null {
  const favoritesList: Array<Partial<Place>>|undefined = JSON.parse(localStorage.getItem('favoriteItems'))
console.log(favoritesList)

  if (favoritesList && favoritesList.length > 0) {
    return favoritesList.length
  } else {
    return null
  }

}
