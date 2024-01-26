export interface IComents{
    message: string,
    data: 
        {
            id: number,
            comment: string,
            rating: string,
            user: string,
            created_at: string
        }[]
}
export interface IComentInfo{
    message: string,
    data: {
        comments_count: number,
        rating: string,
        clicks: string
    }
}