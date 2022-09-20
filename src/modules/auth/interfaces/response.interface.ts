export interface LoginResponse {
    message? : string ,
    success? : boolean ,
    accessToken? : string ,
    refreshToken? : string ,
    statusCode?: number
}

export interface RegisterResponse {
    message? : string ,
    success? : boolean , 
    statusCode? : number
}