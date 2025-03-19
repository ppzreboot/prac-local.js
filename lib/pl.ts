import { json, clone } from './utils'

const key_set = new Set<string>()

export
interface I_prac_local_opts<T> {
    key: string
    initial_data: T
    validate: (data: any) => false | T
}

export
function prac_local<T>(opts: I_prac_local_opts<T>) {
    if (opts.key === '')
        throw new Error('prac-local: key cannot be empty')
    const key = 'prac-local.js ' + opts.key

    if (key_set.has(key))
        throw new Error(`prac-local: key "${opts.key}" already taken`) // use the raw key
    key_set.add(key)

    // backup initial data
    const initial_data = clone(opts.initial_data)

    const retrieve = () => {
        const data = localStorage.getItem(key)

        if (data === null)
            return clone(initial_data)

        const parsed_data = JSON.parse(data)

        const valid_data = opts.validate(parsed_data)
        if (valid_data === false)
            throw Error(`prac-local: (${opts.key}) data in local storage is invalid`)
        return valid_data
    }
    const save = (data: T) => {
        const valid_data = opts.validate(data)
        if (valid_data === false)
            throw Error(`prac-local: (${opts.key}) saving invalid data`)
        localStorage.setItem(key, json(valid_data))
    }

    return {
        save,
        retrieve,
        remove: () => localStorage.removeItem(key),
    }
}
