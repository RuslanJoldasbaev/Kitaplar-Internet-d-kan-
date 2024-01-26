export interface IOrder{
    message: string,
    data: 
        {
            id: number,
            created_at:string,
            status: string,
            book: {
                id: number,
                name: string
            },
            user: {
                id: number,
                name: string,
                phone:string
            }
        }[]
}

export interface IOrderUpdate{
        message: string
}

export interface IAllOrders{
    message: string,
    data: 
        {
            id: number,
            created_at:string,
            status: string,
            book: {
                id: number,
                name: string
            },
            user: {
                id: number,
                name: string,
                phone:string
            }
        }[],
    total:number
}