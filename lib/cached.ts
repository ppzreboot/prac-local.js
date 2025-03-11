import { clone } from './utils'

export
interface I_cached_opts<T> {
  retrieve: () => T
  save: (data: T) => void
}

export
function cached<T>(opts: I_cached_opts<T>) {
  let value: T | null = null

  return {
    get: () => {
      if (value === null)
        value = clone(opts.retrieve())
      return clone(value)
    },
    set: (data: T) => {
      value = clone(data)
      opts.save(data)
    },
  }
}
