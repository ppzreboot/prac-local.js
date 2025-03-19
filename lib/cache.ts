import { type prac_local } from './pl'
import { clone } from './utils'

export
function cache<T>(pl: ReturnType<typeof prac_local<T>>) {
  let value: T | null = null

  return {
    get: () => {
      if (value === null)
        value = clone(pl.retrieve())
      return clone(value)
    },
    set: (data: T) => {
      pl.save(data)
      value = clone(data)
    },
    reset: () => {
      pl.remove()
      value = null
    },
  }
}
