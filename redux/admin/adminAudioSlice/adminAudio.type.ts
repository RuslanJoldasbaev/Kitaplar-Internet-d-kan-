export interface IAudioAdmin {
    message: string,
    data: {
        id: number,
        name: string,
        author: {
            id: number,
            name: string
        },
        title: string,
        price: string,
        categories: [
            {
                id: 7,
                name: string
            }
        ],
        image: string,
        audio: string,
        rating: string
    }
}

export interface IDeleteAudio {
    message: string
}

export interface IPostAudio {
    data: {
        book: {
            id: number,
            name: string
        }
        dubauthor:{ 
            id: number,
            name: string 
        },
        id: number,
        name: string,
        url: string
    },
    message:string
}

export interface IAudios{
    message: string,
    data: {
        id: 21,
        name: string,
        audios: [
            {
                id: 12,
                name: string,
                url: string,
                dubauthor: {
                    id: number,
                    name: string
                }
            }
        ]
    },
    total: number
}