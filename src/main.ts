import { prac_local } from 'prac-local'

demo1()

function demo1() {
  console.log('demo1')

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
