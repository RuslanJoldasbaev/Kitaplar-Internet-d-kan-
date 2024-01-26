export interface IPopular {
    data: {
        audio:string,
        author: {
            id: number,
            name: string
        },
        categories:{
            id: number,
            name: string
        }[],
        id:number,
        image:string,
        name:string,
        price:string,
        rating:null|string,
        title:string,
        baskets: number,
        favorite: number
    }[],
    message: string
}

export interface IRecomen {
    data: {
        audio:string,
        author: {
            id: number,
            name: string
        },
        categories:{
            id: number,
            name: string
        }[],
        id:number,
        image:string,
        name:string,
        price:string,
        rating:null |string,
        title:string,
        baskets: number,
        favorite: number
    }[],
    message: string
}

export interface IOneBook{
    message: string,
    data: {
        id: number,
        name: string,
        author: {
            id: number,
            name: string
        },
        title:string, 
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

export interface INewBooks{
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
            categories:
                {
                    id: number,
                    name: string
                }[],
            image: string,
            audio: string,
            rating: null|string,
            baskets: number,
            favorite: number
        }[]
}

export interface IBookCatgory{
    message:  string,
    data: {
        id: number,
        name: string,
        books: {
                id: number,
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
            }[],
        books_total: number
    }
}