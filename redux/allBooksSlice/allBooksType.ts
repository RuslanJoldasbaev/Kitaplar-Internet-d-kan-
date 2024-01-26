export interface IAllBooks {
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
        rating: null|string,
        baskets: 0,
        favorite: number
    }[],
    total:number
}

export interface ICategoryBook {
    message: string,
    data: {
        id: number,
        name: string,
        books: 
            {
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
                rating: string,
                baskets: number,
                favorite: number
            }[]|[],
        books_total: number
    }
}