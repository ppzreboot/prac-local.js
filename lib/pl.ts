import { json, clone } from './utils'

const key_set = new Set<string>()

export
interface I_prac_local_opts<T> {
    key: string
    initial_data: T
    validate: (data: any) => boolean
}

export
function prac_local<T>(opts: I_prac_local_opts<T>) {
    if (key_set.has(opts.key))
        throw new Error(`key "${opts.key}" already taken`)
    key_set.add(opts.key)

    // backup initial data
    const initial_data = clone(opts.initial_data)

    const retrieve = () => {
        const data = localStorage.getItem(opts.key)

        if (data === null)
            return clone(initial_data)

        const parsed_data = JSON.parse(data)

        if (opts.validate(parsed_data))
            return parsed_data as T

        throw Error(`prac-local: data (${opts.key}) in local storage is invalid`)
    }
    const save = (data: T) => {
        localStorage.setItem(opts.key, json(data))
    }

    return {
        save,
        retrieve,
        reset: () => save(initial_data),
    }
}
