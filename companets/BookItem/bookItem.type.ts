export interface IBooksType {
    audio: string,
    author: {
        id: number,
        name: string
    },
    categories: {
        id: number,
        name: string
    }[],
    id: number,
    image: string,
    name: string,
    price: string,
    rating: null | string,
    title: string,
    baskets: number,
    favorite: number

}