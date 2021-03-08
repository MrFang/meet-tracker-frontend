export interface Meeting {
    id?: number;
    title: string;
    startDate: string;
    startTime: string;
    duration: number;
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
