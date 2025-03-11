# prac-local.js
`prac-local.js` is to provide a practical way to use `localStorage`.

## Usage

##### Install

``` bash
npm install prac-local
```

##### prac_local
``` ts
import { prac_local } from 'prac-local'

const some_data = prac_local({
  key: 'some-unique-string',
  initial_data: {
    name: 'PPz',
    year: 3,
  },
  validate: data =>
    typeof(data.name) === 'string'
    && typeof(data.year) === 'number'
  ,
})

// get from localStorage; if it exist, validate and return; otherwise, return initial_data
some_data.retrieve()
// write to localStorage
some_data.save({ /* ... */ })
// reset to initial_data
some_data.reset()
```

##### cached prac_local

``` ts
import { cpl } from 'prac-local'

const some_cached_data = cpl_prac_local({
  key: 'some-other-unique-string',
  initial_data: {
    name: 'PPz',
    year: 3,
  },
  validate: data =>
    typeof(data.name) === 'string'
    && typeof(data.year) === 'number'
  ,
})

// get from cache; if it exist, return; otherwise, return pl.retrieve()
some_cached_data.get()
// write to localStorage and update cache
some_cached_data.set({ /* ... */ })
// reset to initial_data
some_cached_data.reset()
```
