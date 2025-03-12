// cpl: cached practical localstorage

import { cache } from './cache'
import { prac_local, I_prac_local_opts } from './pl'

export
function cpl<T>(opts: I_prac_local_opts<T>) {
  const { get, set } = cache(prac_local(opts))
  return {
    get,
    set,
    reset: () => set(opts.initial_data),
  }
}
