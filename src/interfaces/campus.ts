export interface ICampus {
    name: string;
    state: string;
    country: string;
    pastorsIds?: string[];
    residentPastorId: string; // FK to Pastor model
    location?: {
        long: number;
        lat: number;
    };
    createdAt?: Date;
    updatedAt?: Date;
}


export interface CreateCampusPayload {
    name: string;
    state: string;
    country: string;
    residentPastorId: string;
    location?: {
        long: number;
        lat: number;
    };
}