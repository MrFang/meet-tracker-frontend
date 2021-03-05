export interface Meeting {
    id?: number;
    title: string;
    date: string;
    time: string;
    contacts: Contact[];
}

export interface Contact {
    id?: number;
    firstName: string;
    secondName?: string;
    telephone?: string;
}

export interface UserCredentials {
    username: string;
    password: string;
}
