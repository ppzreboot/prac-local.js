import { prac_local, cpl } from 'prac-local'

main()

function main() {
  demo1()
  demo2()
  demo3()
  demo4()

  console.log('reload the page and see the saved data')
}

function demo1() {
  console.log('demo1: prac_loal')

  const initial_data = {
    name: 'PPz',
    year: 3,
  }
  const validate = (data: any) =>
    typeof(data.name) === 'string'
    && typeof(data.year) === 'number'

  const some_data = prac_local({
    key: 'some-unique-string',
    initial_data,
    validate,
  })

  let current_data = some_data.retrieve()

  console.log('first retrieve', current_data)
  console.assert(validate(current_data), 'the retrieved data is not valid')

  some_data.save({
    name: 'CCz',
    year: 2,
  })

  current_data = some_data.retrieve()
  console.log('second retrieve, after saving', current_data)
  console.assert(current_data.name === 'CCz', 'error in saving data')
  console.assert(current_data.year === 2, 'error in saving data')

  some_data.remove()
  current_data = some_data.retrieve()
  console.log('third retrieve, after removing', current_data)
  console.assert(current_data.name === 'PPz', 'after removing data, the name should be PPz')
  console.assert(current_data.year === 3, 'after removing data, the year should be 3')

  some_data.save({
    name: 'JJ',
    year: 1,
  })
  current_data = some_data.retrieve()
  console.log('fourth retrieve, after empty_save', current_data)
  console.assert(current_data.name === 'JJ', 'error in empty_save')
  console.assert(current_data.year === 1, 'error in empty_save')
}

function demo2() {
  try {
    console.log('demo2: prac_local unique key error')
    prac_local({
      key: 'some-unique-string',
      initial_data: {},
      validate: () => true,
    })
  } catch(e) {
    console.assert(
      e.message === 'key "some-unique-string" already taken',
      e.message,
    )
  }
}

function demo3() {
  console.log('demo3: prac_loal invalid raw data')

  const key = 'raw data'

  localStorage.setItem(
    'prac-local.js ' + key,
    JSON.stringify({
      name: 666
    }),
  )

  const some_data = prac_local({
    key,
    initial_data: {
      name: 'PPz',
    },
    validate: data => data.name === 'PPz',
  })

  try {
    some_data.retrieve()
  } catch(e) {
    console.assert(
      e.message === `prac-local: data (${key}) in local storage is invalid`,
      e.message,
    )
  }
}

function demo4() {
  console.log('demo4: cpl')

  const initial_data = {
    name: 'PPz',
    year: 3,
  }

  const validate = (data: any) =>
    typeof(data.name) === 'string'
    && typeof(data.year) === 'number'

  const some_data = cpl({
    key: 'cpl',
    initial_data,
    validate,
  })

  let current_data = some_data.get()

  console.log('first get', current_data)
  console.assert(validate(current_data), 'the retrieved data is not valid')

  some_data.set({
    name: 'CCz',
    year: 2,
  })

  current_data = some_data.get()
  console.log('second get, after setting', current_data)
  console.assert(current_data.name === 'CCz', 'error in setting data')
  console.assert(current_data.year === 2, 'error in setting data')

  some_data.reset()
  current_data = some_data.get()
  console.log('third get, after removing', current_data)
  console.assert(current_data.name === 'PPz', 'after removing data, the name should be PPz')
  console.assert(current_data.year === 3, 'after removing data, the year should be 3')

  some_data.set({
    name: 'JJ',
    year: 1,
  })
  current_data = some_data.get()
  console.log('fourth get, after empty_set', current_data)
  console.assert(current_data.name === 'JJ', 'error in empty_set')
  console.assert(current_data.year === 1, 'error in empty_set')
}

function type_error() {
  prac_local({
    key: 'type_error',
    initial_data: null, // there should be an error here
    validate: () => true,
  })

  interface I_data {
    name: string
  }

  prac_local<I_data | null>({
    key: 'type_error',
    initial_data: { name: 'PPz' }, // there should be an error here, but I don't know how to do it
    validate: () => true,
  })
}
