import { renderSearchFormBlock } from './search-form.js'
import { renderSearchStubBlock } from './search-results.js'
import {getFavoritesAmount, getUserData, renderUserBlock} from './user.js'
import { renderToast } from './lib.js'

const user = getUserData()
const favoritesAmount = getFavoritesAmount()

window.addEventListener('DOMContentLoaded', () => {
  renderUserBlock(user.username, user.avatarUrl, favoritesAmount)
  renderSearchFormBlock()
  renderSearchStubBlock()
  renderToast(
    {text: 'Это пример уведомления. Используйте его при необходимости', type: 'success'},
    {name: 'Понял', handler: () => {console.log('Уведомление закрыто')}}
  )
})
