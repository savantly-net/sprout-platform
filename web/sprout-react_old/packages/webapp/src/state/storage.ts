// TODO: implement session storage

export const Storage = {
    local: {
        get: (key:string) => localStorage.getItem(key),
        remove: (key:string) => localStorage.removeItem(key),
        set: (key:string, value:any) => localStorage.setItem(key, value)
    },
    session: {
        get: (id:string) => localStorage.getItem(id),
        remove: (key:string) => localStorage.removeItem(key),
        set: (key:string, value:any) => localStorage.setItem(key, value)
    }
}