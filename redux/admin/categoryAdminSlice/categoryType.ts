export interface ICategoryAdmin {
        message: string | undefined,
        data: {
                id: number,
                name: string,
                categories: [{
                        id: number,
                        name: string
                }]
        }[] | undefined | []
}

export interface IDeleteCategory {
        message: string
}

export interface IAddCategory {
        message: string,
        data: {
                id: 11,
                name: string,
                books: [{}],
                books_total: null
        }
}