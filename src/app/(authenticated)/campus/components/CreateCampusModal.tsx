"use client";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { IPastor } from "@/interfaces/pastors";
import { useCreateCampus } from "@/services/campus.services";
import { toast } from "sonner";

interface CreateCampusModalProps {
    isOpen: boolean;
    onClose: () => void;
    pastors: IPastor[] | [];
}

const CampusSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    state: Yup.string().required("State is required"),
    country: Yup.string().required("Country is required"),
    residentPastorId: Yup.string().required("Resident Pastor is required"),
    location: Yup.object().shape({
        long: Yup.number().required("Longitude required"),
        lat: Yup.number().required("Latitude required"),
    }),
});

export default function CreateCampusModal({
    isOpen,
    onClose,
    pastors,
}: CreateCampusModalProps) {
    if (!isOpen) return null;
    const { mutateAsync: _saveCampus } = useCreateCampus();

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white rounded-xl p-6 w-[450px] shadow-xl border border-gray-200">
                <h2 className="text-xl font-semibold mb-6">Create Campus</h2>

                <Formik
                    initialValues={{
                        name: "",
                        state: "",
                        country: "",
                        pastorsIds: [],
                        residentPastorId: "",
                        location: { long: 0, lat: 0 },
                    }}
                    validationSchema={CampusSchema}
                    validateOnBlur={false}
                    validateOnChange={false}
                    onSubmit={async (values, { setSubmitting }) => {
                        try {
                            await _saveCampus({ payload: values });
                            console.log("Submitting Pastor:", values);
                            onClose();
                        } catch (e) {
                            toast.error("Error when creating campus", { position: "top-right" })
                        }
                        finally {
                            toast.success("Campus created successfully", { position: "top-right" })
                            setSubmitting(false);
                        }
                    }}
                >
                    {({ errors, touched, isSubmitting }) => (
                        <Form className="space-y-4">

                            {/* Name */}
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium">Campus Name</label>
                                <Field
                                    name="name"
                                    className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter campus name"
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-xs">{errors.name}</p>
                                )}
                            </div>

                            {/* State */}
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium">State</label>
                                <Field
                                    name="state"
                                    className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter state"
                                />
                                {errors.state && (
                                    <p className="text-red-500 text-xs">{errors.state}</p>
                                )}
                            </div>

                            {/* Country */}
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium">Country</label>
                                <Field
                                    name="country"
                                    className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter country"
                                />
                                {errors.country && (
                                    <p className="text-red-500 text-xs">{errors.country}</p>
                                )}
                            </div>

                            {/* PastorsIds */}
                            {/* <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium">Assign Pastors</label>
                                <Field
                                    as="select"
                                    name="pastorsIds"
                                    multiple
                                    className="border border-gray-300 p-2 rounded-md h-24 focus:ring-2 focus:ring-blue-500"
                                >
                                    {pastors.map((p) => (
                                        <option key={p.id} value={p.id}>
                                            {p.name}
                                        </option>
                                    ))}
                                </Field>
                            </div> */}

                            {/* Resident Pastor */}
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium">Resident Pastor</label>
                                <Field
                                    as="select"
                                    name="residentPastorId"
                                    className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select Pastor</option>
                                    {pastors.map((p) => (
                                        <option key={p._id} value={p._id}>
                                            {p.firstName} {p.lastName}
                                        </option>
                                    ))}
                                </Field>
                                {errors.residentPastorId && (
                                    <p className="text-red-500 text-xs">{errors.residentPastorId}</p>
                                )}
                            </div>

                            {/* Location */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-medium">Longitude</label>
                                    <Field
                                        name="location.long"
                                        type="number"
                                        className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500"
                                    />
                                    {errors.location?.long && (
                                        <p className="text-red-500 text-xs">{errors.location.long}</p>
                                    )}
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-medium">Latitude</label>
                                    <Field
                                        name="location.lat"
                                        type="number"
                                        className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500"
                                    />
                                    {errors.location?.lat && (
                                        <p className="text-red-500 text-xs">{errors.location.lat}</p>
                                    )}
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end gap-3 pt-4">
                                <Button
                                    variant="outline"
                                    onClick={onClose}
                                    type="button"
                                    className="px-4"
                                >
                                    Cancel
                                </Button>

                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-4"
                                >
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
