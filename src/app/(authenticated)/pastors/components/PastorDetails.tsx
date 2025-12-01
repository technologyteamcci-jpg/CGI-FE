"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IPastor } from "@/interfaces/pastors";
import { Formik, Form, Field, FieldProps } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { useUpdatePastor } from "@/services/pastors.services";

interface PastorDetailsProps {
    pastor: IPastor;
    editing?: boolean;
}

export function PastorDetails({ pastor, editing = false }: PastorDetailsProps) {
    const [isEditing, setIsEditing] = useState(editing);
    const { mutateAsync: _updatePastor } = useUpdatePastor();

    const toggleEdit = () => setIsEditing((prev) => !prev);

    const validationSchema = Yup.object({
        firstName: Yup.string().required("Required"),
        lastName: Yup.string().required("Required"),
        email: Yup.string().email().required(),
        phone: Yup.string().required(),
    });

    return (
        <Formik<IPastor>
            initialValues={pastor}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
                try {
                    await _updatePastor({ payload: values, pastorId: values._id });
                } catch (e) {
                    toast.error("Error when updating pastor record", { position: "top-right" })
                }
                finally {
                    toast.success("Pastor's record Updated ", { position: "top-right" })
                    setSubmitting(false);
                }
            }}
        >
            {({ values, errors }) => (
                <Form className="space-y-6">
                    {/* HEADER */}
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-medium">
                            {isEditing ? "Edit Pastor" : "Pastor Information"}
                        </h2>

                        <Button
                            type={isEditing ? "submit" : "button"}
                            onClick={!isEditing ? toggleEdit : undefined}
                            variant={isEditing ? "default" : "outline"}
                        >
                            {isEditing ? "Save Changes" : "Edit"}
                        </Button>
                    </div>

                    {/* PERSONAL INFO */}
                    <section className="space-y-2">
                        <h3 className="text-sm font-semibold">Personal Information</h3>

                        <div className="grid grid-cols-2 gap-3">
                            <Field name="firstName">
                                {({ field }: FieldProps) => (
                                    <Input {...field} disabled={!isEditing} placeholder="First Name" />
                                )}
                            </Field>

                            <Field name="lastName">
                                {({ field }: FieldProps) => (
                                    <Input {...field} disabled={!isEditing} placeholder="Last Name" />
                                )}
                            </Field>

                            <Field name="otherNames">
                                {({ field }: FieldProps) => (
                                    <Input {...field} disabled={!isEditing} placeholder="Other Names" />
                                )}
                            </Field>

                            <Field name="gender">
                                {({ field }: FieldProps) => (
                                    <Input {...field} disabled={!isEditing} placeholder="Gender" />
                                )}
                            </Field>

                            <Field name="dateOfBirth">
                                {({ field }: FieldProps) => (
                                    <Input
                                        {...field}
                                        type="date"
                                        disabled={!isEditing}
                                        placeholder="Date of Birth"
                                    />
                                )}
                            </Field>
                        </div>
                    </section>

                    {/* CONTACT INFO */}
                    <section className="space-y-2">
                        <h3 className="text-sm font-semibold">Contact Information</h3>

                        <div className="grid grid-cols-2 gap-3">
                            <Field name="email">
                                {({ field }: FieldProps) => (
                                    <Input {...field} disabled={!isEditing} placeholder="Email" />
                                )}
                            </Field>

                            <Field name="phone">
                                {({ field }: FieldProps) => (
                                    <Input {...field} disabled={!isEditing} placeholder="Phone" />
                                )}
                            </Field>

                            {/* Address */}
                            <Field name="address.street">
                                {({ field }: FieldProps) => (
                                    <Input {...field} disabled={!isEditing} placeholder="Street" />
                                )}
                            </Field>
                            <Field name="address.city">
                                {({ field }: FieldProps) => (
                                    <Input {...field} disabled={!isEditing} placeholder="City" />
                                )}
                            </Field>
                            <Field name="address.state">
                                {({ field }: FieldProps) => (
                                    <Input {...field} disabled={!isEditing} placeholder="State" />
                                )}
                            </Field>
                            <Field name="address.country">
                                {({ field }: FieldProps) => (
                                    <Input {...field} disabled={!isEditing} placeholder="Country" />
                                )}
                            </Field>
                        </div>
                    </section>

                    {/* FAMILY INFO */}
                    <section className="space-y-2">
                        <h3 className="text-sm font-semibold">Family Status</h3>

                        <div className="grid grid-cols-2 gap-3">
                            <Field name="maritalStatus">
                                {({ field }: FieldProps) => (
                                    <Input
                                        {...field}
                                        disabled={!isEditing}
                                        placeholder="Marital Status"
                                    />
                                )}
                            </Field>
                            <Field name="spouseName">
                                {({ field }: FieldProps) => (
                                    <Input
                                        {...field}
                                        disabled={!isEditing}
                                        placeholder="Spouse Name"
                                    />
                                )}
                            </Field>
                            <Field name="numberOfChildren">
                                {({ field }: FieldProps) => (
                                    <Input
                                        {...field}
                                        type="number"
                                        disabled={!isEditing}
                                        placeholder="Number of Children"
                                    />
                                )}
                            </Field>
                        </div>
                    </section>

                    {/* EMERGENCY CONTACT */}
                    <section className="space-y-2">
                        <h3 className="text-sm font-semibold">Emergency Contact</h3>

                        <div className="grid grid-cols-2 gap-3">
                            <Field name="emergencyContact.name">
                                {({ field }: FieldProps) => (
                                    <Input {...field} disabled={!isEditing} placeholder="Name" />
                                )}
                            </Field>
                            <Field name="emergencyContact.phone">
                                {({ field }: FieldProps) => (
                                    <Input {...field} disabled={!isEditing} placeholder="Phone" />
                                )}
                            </Field>
                            <Field name="emergencyContact.relationship">
                                {({ field }: FieldProps) => (
                                    <Input
                                        {...field}
                                        disabled={!isEditing}
                                        placeholder="Relationship"
                                    />
                                )}
                            </Field>
                        </div>
                    </section>

                    {/* MINISTRY INFO */}
                    <section className="space-y-2">
                        <h3 className="text-sm font-semibold">Ministry Information</h3>

                        <Field name="ordinationDate">
                            {({ field }: FieldProps) => (
                                <Input
                                    {...field}
                                    type="date"
                                    disabled={!isEditing}
                                    placeholder="Ordination Date"
                                />
                            )}
                        </Field>

                        <Field name="bio">
                            {({ field }: FieldProps) => (
                                <Input {...field} disabled={!isEditing} placeholder="Bio" />
                            )}
                        </Field>
                    </section>

                    {/* SOCIAL LINKS */}
                    <section className="space-y-2">
                        <h3 className="text-sm font-semibold">Social Links</h3>

                        <div className="grid grid-cols-2 gap-3">
                            <Field name="socialLinks.facebook">
                                {({ field }: FieldProps) => (
                                    <Input {...field} disabled={!isEditing} placeholder="Facebook" />
                                )}
                            </Field>

                            <Field name="socialLinks.twitter">
                                {({ field }: FieldProps) => (
                                    <Input {...field} disabled={!isEditing} placeholder="Twitter" />
                                )}
                            </Field>

                            <Field name="socialLinks.instagram">
                                {({ field }: FieldProps) => (
                                    <Input {...field} disabled={!isEditing} placeholder="Instagram" />
                                )}
                            </Field>

                            <Field name="socialLinks.linkedin">
                                {({ field }: FieldProps) => (
                                    <Input {...field} disabled={!isEditing} placeholder="LinkedIn" />
                                )}
                            </Field>
                        </div>
                    </section>
                </Form>
            )}
        </Formik>
    );
}
