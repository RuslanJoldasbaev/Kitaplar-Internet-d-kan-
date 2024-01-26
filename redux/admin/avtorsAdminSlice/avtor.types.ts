export interface Iavtors {
    message: string | undefined,
    data: {
        id: number,
        name: string
    }[] | undefined,
    total: number | undefined
}
export interface IAvtorDelete {
    message: string
}

export interface IPostAvtor {
    message: string,
    data: {
        id: number,
        name: string
    }
}

export interface IOneAvtor {
    message: string,
    data: {
        id: number,
        name: string,
        books: {
            id: 1,
            name: string,
            author: {
                id: number,
                name: string
            },
            title: string,
            price: string,
            image: string,
            audio: string,
            rating: string,
            baskets: number,
            favorite: number
        }[]
    }
}