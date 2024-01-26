export interface IKorzinaProdukt{
    message: string|undefined,
    data: {
        id: number,
        name:  string,
        author: {
            id: number,
            name: string
        },
        title:string,
        price: string,
        image:string
    }[]|undefined,
    summa:number|undefined
}

export interface IFavoriteProdukt{
    message: string|undefined,
    data: {
        id: number,
        name:  string,
        author: {
            id: number,
            name: string
        },
        title: string,
        price: string,
        image: string
    }[]|undefined
}

