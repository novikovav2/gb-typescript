import { renderBlock } from './lib.js'

export function renderUserBlock (username: string, avatarUrl: string, favoriteItemsAmount: number) {
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
