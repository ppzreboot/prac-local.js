const key_set = new Set<string>()

function json(data: any) {
    return JSON.stringify(data)
}

function clone<T>(data: T) {
    return JSON.parse(json(data)) as T
}

export
function prac_local<T>(key: string, initial_data: T) {
    if (key_set.has(key))
        throw new Error(`key "${key}" already taken`)
    key_set.add(key)

    // backup initial data
    initial_data = clone(initial_data)

    const get = () => {
        const data = localStorage.getItem(key)
        return data === null
            ? clone(initial_data)
            : JSON.parse(data) as T
    }
    const save = (data: T) => {
        localStorage.setItem(key, json(data))
    }

    return {
        save,
        get,
        reset: () => save(initial_data),
    }
}
