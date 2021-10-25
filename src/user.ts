import {renderBlock} from './lib.js'

class User {
  username: string = 'Wade Warren'
  avatarUrl: string = '/img/avatar.png'
}

export function renderUserBlock (username: string, avatarUrl: string, favoriteItemsAmount = 0) {
  const favoritesCaption = favoriteItemsAmount > 1 ? favoriteItemsAmount : 'ничего нет'
  const hasFavoriteItems = favoriteItemsAmount > 1

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
  const data = +JSON.parse(localStorage.getItem('favoritesAmount'))

  if (isNaN(data)) {
    return null
  } else {
    return data
  }
}
