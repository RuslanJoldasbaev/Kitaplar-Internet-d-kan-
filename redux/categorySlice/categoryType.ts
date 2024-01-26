export interface ICategory{
    message: string,
    data:{
            id: number,
            name: string,
            categories:[{
                    id: number,
                    name: string
                }]
        }[]
}