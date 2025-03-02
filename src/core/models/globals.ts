import { UserDatabaseI } from "./user";

export interface ProductI{
    name: string;
    img: string;
    description?: string;
    categories?: string[];
    price: number;
    badge?: string;
    id?: string;
    users?: UserDatabaseI;
    $id?: string;
}