"use client";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { IPastor } from "@/interfaces/pastors";
import { useCreatePastor } from "@/services/pastors.services";
import { toast } from "sonner";

interface CreatePastorModalProps {
    isOpen: boolean;
    onClose: () => void;
}

/* -------------------- Validation Schema -------------------- */
const PastorSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),

    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone number is required"),

    gender: Yup.string().oneOf(["male", "female"]).required("Gender is required"),

    maritalStatus: Yup.string().oneOf([
        "single",
        "married",
        "widowed",
        "divorced"
    ]),
});

export default function CreatePastorModal({
    isOpen,
    onClose,
}: CreatePastorModalProps) {
    if (!isOpen) return null;
    const { mutateAsync: _savePastor } = useCreatePastor();


    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white rounded-xl p-6 w-[500px] shadow-xl border border-gray-200 
                max-h-[90vh] overflow-y-auto">
                {/* <div className="bg-white rounded-xl p-6 w-[500px] shadow-xl border border-gray-200"> */}

                <h2 className="text-xl font-semibold mb-6">Create Pastor</h2>

                <Formik<IPastor>
                    initialValues={{
                        _id: "",
                        firstName: "",
                        lastName: "",
                        otherNames: "",
                        email: "",
                        phone: "",

                        address: {
                            street: "",
                            city: "",
                            state: "",
                            country: "",
                        },

                        dateOfBirth: undefined,
                        gender: undefined,
                        maritalStatus: undefined,
                        spouseName: "",
                        numberOfChildren: undefined,

                        emergencyContact: {
                            name: "",
                            phone: "",
                            relationship: "",
                        },

                        ordinationDate: undefined,
                        profileImage: "",



                    }}
                    validationSchema={PastorSchema}
                    validateOnBlur={false}
                    validateOnChange={false}
                    onSubmit={async (values, { setSubmitting }) => {
                        try {
                            await _savePastor({ payload: values });
                            onClose();
                        } catch (e) {
                            toast.error("Error when creating pastors record", { position: "top-right" })
                        }
                        finally {
                            toast.success("Pastor record Saved", { position: "top-right" })
                            setSubmitting(false);
                        }
                    }}
                >
                    {({ errors, isSubmitting }) => (
                        <Form className="space-y-4 ">

                            {/* First Name */}
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium">First Name</label>
                                <Field
                                    name="firstName"
                                    className="border border-gray-300 p-2 rounded-md"
                                />
                                {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
                            </div>

                            {/* Last Name */}
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium">Last Name</label>
                                <Field
                                    name="lastName"
                                    className="border border-gray-300 p-2 rounded-md"
                                />
                                {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}
                            </div>

                            {/* Other Names */}
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium">Other Names</label>
                                <Field
                                    name="otherNames"
                                    className="border border-gray-300 p-2 rounded-md"
                                />
                            </div>

                            {/* Email */}
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium">Email</label>
                                <Field
                                    name="email"
                                    type="email"
                                    className="border border-gray-300 p-2 rounded-md"
                                />
                                {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                            </div>

                            {/* Phone */}
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium">Phone</label>
                                <Field
                                    name="phone"
                                    className="border border-gray-300 p-2 rounded-md"
                                />
                                {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
                            </div>

                            {/* Address */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium">State</label>
                                    <Field
                                        name="address.state"
                                        className="border border-gray-300 p-2 rounded-md w-full"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Country</label>
                                    <Field
                                        name="address.country"
                                        className="border border-gray-300 p-2 rounded-md w-full"
                                    />
                                </div>
                            </div>

                            {/* Gender */}
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium">Gender</label>
                                <Field
                                    as="select"
                                    name="gender"
                                    className="border border-gray-300 p-2 rounded-md"
                                >
                                    <option value="">Select gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </Field>
                                {errors.gender && <p className="text-red-500 text-xs">{errors.gender}</p>}
                            </div>

                            {/* Marital Status */}
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium">Marital Status</label>
                                <Field
                                    as="select"
                                    name="maritalStatus"
                                    className="border border-gray-300 p-2 rounded-md"
                                >
                                    <option value="">Select</option>
                                    <option value="single">Single</option>
                                    <option value="married">Married</option>
                                    <option value="widowed">Widowed</option>
                                    <option value="divorced">Divorced</option>
                                </Field>
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end gap-3 pt-4">
                                <Button
                                    variant="outline"
                                    onClick={onClose}
                                    type="button"
                                >
                                    Cancel
                                </Button>

                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? "Creating..." : "Create"}
                                </Button>
                            </div>

                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
