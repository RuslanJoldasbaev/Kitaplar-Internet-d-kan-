export interface IAudioAvtor{
    message: string|undefined,
    data: 
        {
            id: number,
            name: string
        }[]|undefined,
    total: number|undefined
}

export interface IAvtorPost{
    message: string,
    data: {
        id: number,
        name: string
    }
}

export interface IOneAvtor{
    message: string,
    data: {
        id: number,
        name: string
    }
}