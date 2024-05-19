export interface IUser {
    id: number
    name: string
    email: string
    phone: string
    position: string
    position_id: string
    registration_timestamp: number
    photo: string
}

export interface IResponsePositionsLoader {
    success: boolean
    positions: IPosition[]
}

export interface IPosition {
    id: number,
    name: string
}
