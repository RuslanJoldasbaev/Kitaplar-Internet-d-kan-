export interface ISearchBook{
    message: string,
    data: {
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
            }[],
        total: number
    }
}