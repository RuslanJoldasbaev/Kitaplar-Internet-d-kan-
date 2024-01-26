export interface ISiginIF {
    id: number,
    name: string,
    phone: string,
    image: null,
    role: string
}

export interface siginDataIF {
    name: string,
    password: string,
    phone: string,
    confirm_password: string
}

export interface loginDataIF {
    phone: string,
    password: string
}

export interface IErrorData{
    message: string
}