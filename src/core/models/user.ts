export interface AuthenticatedUserI{
    email: string,
    id: string,
    icon?: string
}

export interface UserDatabaseI{
    email: string,
    password: string,
    icon?: string
    $id?: string
}