export const isPromise = (obj: any): obj is Promise<any> => {
    return (obj != null && 'resolve' in obj);
}
