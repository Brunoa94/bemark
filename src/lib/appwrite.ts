import { Client, Account, Databases, Storage } from "appwrite";

const client = new Client();

client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("66649c4800237822b5c9").headers

export const account = new Account(client);

export const db = new Databases(client);

export const storage = new Storage(client);