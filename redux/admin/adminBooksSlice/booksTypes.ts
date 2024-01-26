export interface IAllBooksAdmin {
    message: string | undefined,
    data: {
        id: 6,
        name: string,
        author: {
            id: number,
            name: string
        },
        image: string,
        created_at: string,
        count?: number
    }[] | undefined
}

export interface IOneBook {
    message: string,
    data: {
        id: number,
        name: string,
        author: {
            id: number,
            name: string
        },
        title: string,
        price: string,
        categories:
        {
            id: number,
            name: string
        }[],
        image: string,
        audio: string,
        rating: string | null,
        baskets: number,
        favorite: number,
        comments: number
    }
}

export interface IBookPost {
    data: {
        audio: string|null,
        author: {
            id: number,
            name: string
        },
        baskets: number,
        categories: 
            {id: number, name: string}[],
        favorite: number,
        id: number,
        image: string|null,
        name: string,
        price: string,
        rating: null|number|string,
        title: string
    }
    message: string
}

export interface IAllBooks{
    message: string,
    data: 
        {
            id: number,
            name: string,
            author: {
                id: number,
                name: string
            },
            title: string,
            price: string,
            categories: {
                id: number,
                name: string
            }[],
            image: string,
            audio: string|undefined|null,
            rating: string,
            baskets: number,
            favorite: number
        }[],
        total: number
}