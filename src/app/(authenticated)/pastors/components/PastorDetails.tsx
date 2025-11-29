"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IPastor } from "@/interfaces/pastors";

interface PastorDetailsProps {
    pastor: IPastor;
    editing?: boolean
}

export function PastorDetails({ pastor, editing }: PastorDetailsProps) {
    const [isEditing, setIsEditing] = useState(editing ?? false);

    const toggleEdit = () => setIsEditing((prev) => !prev);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium">
                    {isEditing ? "Edit Pastor" : "Pastor Information"}
                </h2>

                <Button onClick={toggleEdit} variant={isEditing ? "default" : "outline"}>
                    {isEditing ? "Save Changes" : "Edit"}
                </Button>
            </div>

            {/* PERSONAL INFO */}
            <section className="space-y-2">
                <h3 className="text-sm font-semibold">Personal Information</h3>

                <div className="grid grid-cols-2 gap-3">
                    <Input
                        disabled={!isEditing}
                        defaultValue={pastor.firstName}
                        placeholder="First Name"
                    />
                    <Input
                        disabled={!isEditing}
                        defaultValue={pastor.lastName}
                        placeholder="Last Name"
                    />
                    <Input
                        disabled={!isEditing}
                        defaultValue={pastor.otherNames}
                        placeholder="Other Names"
                    />
                    <Input
                        disabled={!isEditing}
                        defaultValue={pastor.gender}
                        placeholder="Gender"
                    />
                    <Input
                        disabled={!isEditing}
                        defaultValue={pastor.dateOfBirth?.toString()}
                        placeholder="Date of Birth"
                    />
                </div>
            </section>

            {/* CONTACT INFO */}
            <section className="space-y-2">
                <h3 className="text-sm font-semibold">Contact Information</h3>

                <div className="grid grid-cols-2 gap-3">
                    <Input
                        disabled={!isEditing}
                        defaultValue={pastor.email}
                        placeholder="Email"
                    />
                    <Input
                        disabled={!isEditing}
                        defaultValue={pastor.phone}
                        placeholder="Phone"
                    />

                    <Input
                        disabled={!isEditing}
                        defaultValue={pastor.address?.street}
                        placeholder="Street"
                    />
                    <Input
                        disabled={!isEditing}
                        defaultValue={pastor.address?.city}
                        placeholder="City"
                    />
                    <Input
                        disabled={!isEditing}
                        defaultValue={pastor.address?.state}
                        placeholder="State"
                    />
                    <Input
                        disabled={!isEditing}
                        defaultValue={pastor.address?.country}
                        placeholder="Country"
                    />
                </div>
            </section>

            {/* FAMILY INFO */}
            <section className="space-y-2">
                <h3 className="text-sm font-semibold">Family Status</h3>

                <div className="grid grid-cols-2 gap-3">
                    <Input
                        disabled={!isEditing}
                        defaultValue={pastor.maritalStatus}
                        placeholder="Marital Status"
                    />
                    <Input
                        disabled={!isEditing}
                        defaultValue={pastor.spouseName}
                        placeholder="Spouse Name"
                    />
                    <Input
                        disabled={!isEditing}
                        defaultValue={pastor.numberOfChildren?.toString()}
                        placeholder="Number of Children"
                    />
                </div>
            </section>

            {/* EMERGENCY CONTACT */}
            <section className="space-y-2">
                <h3 className="text-sm font-semibold">Emergency Contact</h3>

                <div className="grid grid-cols-2 gap-3">
                    <Input
                        disabled={!isEditing}
                        defaultValue={pastor.emergencyContact?.name}
                        placeholder="Name"
                    />
                    <Input
                        disabled={!isEditing}
                        defaultValue={pastor.emergencyContact?.phone}
                        placeholder="Phone"
                    />
                    <Input
                        disabled={!isEditing}
                        defaultValue={pastor.emergencyContact?.relationship}
                        placeholder="Relationship"
                    />
                </div>
            </section>

            {/* MINISTRY INFO */}
            <section className="space-y-2">
                <h3 className="text-sm font-semibold">Ministry Information</h3>

                <Input
                    disabled={!isEditing}
                    defaultValue={pastor.ordinationDate?.toString()}
                    placeholder="Ordination Date"
                />

                <Input
                    disabled={!isEditing}
                    defaultValue={pastor.bio}
                    placeholder="Bio"
                />
            </section>

            {/* SOCIAL LINKS */}
            <section className="space-y-2">
                <h3 className="text-sm font-semibold">Social Links</h3>

                <div className="grid grid-cols-2 gap-3">
                    <Input
                        disabled={!isEditing}
                        defaultValue={pastor.socialLinks?.facebook}
                        placeholder="Facebook"
                    />
                    <Input
                        disabled={!isEditing}
                        defaultValue={pastor.socialLinks?.twitter}
                        placeholder="Twitter"
                    />
                    <Input
                        disabled={!isEditing}
                        defaultValue={pastor.socialLinks?.instagram}
                        placeholder="Instagram"
                    />
                    <Input
                        disabled={!isEditing}
                        defaultValue={pastor.socialLinks?.linkedin}
                        placeholder="LinkedIn"
                    />
                </div>
            </section>
        </div>
    );
}
