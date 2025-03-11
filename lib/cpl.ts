// cpl: cached practical localstorage

import { cached } from './cached'
import { prac_local, I_prac_local_opts } from './pl'

export
function cpl<T>(opts: I_prac_local_opts<T>) {
  const { get, set } = cached(prac_local(opts))
  return {
    get,
    set,
    reset: () => set(opts.initial_data),
  }
}
