export interface IPastor {
    _id: string;
    firstName: string;
    lastName: string;
    otherNames?: string;

    email: string;
    phone: string;

    address?: {
        street?: string;
        city?: string;
        state?: string;
        country?: string;
    };

    dateOfBirth?: Date;
    gender?: "male" | "female";

    maritalStatus?: "single" | "married" | "widowed" | "divorced";
    spouseName?: string;
    numberOfChildren?: number;

    emergencyContact?: {
        name?: string;
        phone?: string;
        relationship?: string;
    };

    ordinationDate?: Date;
    profileImage?: string;
    bio?: string;

    socialLinks?: {
        facebook?: string;
        twitter?: string;
        instagram?: string;
        linkedin?: string;
    };

    createdAt?: Date;
    updatedAt?: Date;
}