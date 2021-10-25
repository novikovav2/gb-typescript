import { renderBlock } from './lib.js'

interface SearchFormData {
  city: string,
  checkIn: Date,
  checkOut: Date,
  price: number
}

interface Place {

}

interface searchCallback {
  (error? :Error, results?: Place[]): void
}

const callback: searchCallback = (error, result) => {
  if (error == null) {
    console.log(result)
  } else {
    console.error(error)
  }
}

const generateStartDate = (): Date => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow
}

const generateEndDate = (start: Date): Date => {
  const endDate = new Date(start)
  endDate.setDate(endDate.getDate() + 2)
  return endDate
}

const search = (data: SearchFormData, callback: (error? :Error, results?: Place[]) => void): void => {
  setTimeout(() => {
    if (Math.random() > 0.5) {
      callback(null, [])
    } else {
      const error = new Error('Something bad happened')
      callback(error)
    }
  }, 3000)
}

export function renderSearchFormBlock (start = generateStartDate(), end = generateEndDate(start)) {
  if (end < start) {
    end = generateEndDate(start)
  }
  const currentDay = new Date()
  const lastDay = new Date(currentDay.getFullYear(), currentDay.getMonth() + 2, 0)

  renderBlock(
    'search-form-block',
    `
    <form id="search">
      <fieldset class="search-filedset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" type="text" disabled value="Санкт-Петербург" />
            <input type="hidden" disabled value="59.9386,30.3141" />
          </div>
          <!--<div class="providers">
            <label><input type="checkbox" name="provider" value="homy" checked /> Homy</label>
            <label><input type="checkbox" name="provider" value="flat-rent" checked /> FlatRent</label>
          </div>--!>
        </div>
        <div class="row">
          <div>
            <label for="check-in-date">Дата заезда</label>
            <input id="check-in-date" type="date" 
            value=${start.toISOString().split('T')[0]} 
            min=${currentDay.toISOString().split('T')[0]} 
            max=${lastDay.toISOString().split('T')[0]} 
            name="checkin" />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" type="date" 
            value=${end.toISOString().split('T')[0]} 
            min=${currentDay.toISOString().split('T')[0]} 
            max=${lastDay.toISOString().split('T')[0]} 
            name="checkout" />
          </div>
          <div>
            <label for="max-price">Макс. цена суток</label>
            <input id="max-price" type="text" value="" name="price" class="max-price" />
          </div>
          <div>
            <div><button type="submit">Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `
  )

  const form = document.getElementById("search")
  form.addEventListener('submit', (event) => {
    event.preventDefault()
    const city = <HTMLInputElement>document.getElementById('city')
    const checkIn = <HTMLInputElement>document.getElementById('check-in-date')
    const checkOut = <HTMLInputElement>document.getElementById('check-out-date')
    const price = <HTMLInputElement>document.getElementById('max-price')

    const searchQuery: SearchFormData = {
      city: city.value,
      checkIn: new Date(checkIn.value),
      checkOut: new Date(checkOut.value),
      price: +price.value
    }

    search(searchQuery, callback)
  })
}
