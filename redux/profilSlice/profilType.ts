export interface IProfil {
    user: {
        id: number,
        name: string,
        phone: string,
        image: string,
        role: string
    },
    count_purchased: number,
    count_order: number,
    count_comment: number,
    count_favorite: number,
    count_basket: number
}

export interface IGetProfil{
    message: string,
    data: IProfil
}

