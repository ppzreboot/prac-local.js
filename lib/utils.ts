export
function json(data: any) {
    return JSON.stringify(data)
}

export
function clone<T>(data: T) {
    return JSON.parse(json(data)) as T
}
