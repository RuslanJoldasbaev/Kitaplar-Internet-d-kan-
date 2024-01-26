export interface IUsersAdmin{
    message: string |undefined,
    data: 
        {
            id: number,
            name: string,
            phone: string,
            image: null|string,
            role: string
        }[] |undefined,
    total:number|undefined
}

export interface IAdminAdd{
    message: string,
    data: {
        id: number,
        name: string,
        phone: string,
        image: null|string,
        role: string
    }
}