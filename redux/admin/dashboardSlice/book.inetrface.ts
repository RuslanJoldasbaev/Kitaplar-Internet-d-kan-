export interface IBooksDash{
    message: string,
    data: 
        {
            id: number,
            name: string,
            author: {
                id: number,
                name: string
            },
            image: string,
            created_at:string
        }[]
}

export interface IUsersDash{
    message: string,
    data:
        {
            id: number,
            name: string,
            phone: string,
            image: null|string,
            role: string
        }[]
}