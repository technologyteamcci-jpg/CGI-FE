"use client";
import { setCookie } from "nookies";
import { useLogin } from "@/services/authentication.services";
import { useAuthStore, cookieKey } from "@/stores/auth.store";
import { useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";
import * as Yup from "yup";
import Image from "next/image";
import { Suspense, useEffect } from "react";
import Link from "next/link";
import { fadeInBackgroundElements } from "@/helpers/layoutFunctions";
import { useFormik } from "formik";
import { FiLock } from "react-icons/fi";
import { MdOutlineMailOutline } from "react-icons/md";
import { bigLogo, logo } from "@/lib/assets";


const validationSchema = Yup.object<{
    password: string;
    email: string;
}>().shape({
    password: Yup.string().required("Set your password"),
    email: Yup.string()
        .required("Email is required")
        .email("Provide a valid email address"),
});

export default function Page() {
    return (
        <Suspense>
            <LoginPage />
        </Suspense>
    );
}

function LoginPage() {
    const {
        setAccess,
        setAccount,
        // setClient
    } = useAuthStore();
    const { mutateAsync: _login, isPending } = useLogin();
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirectTo");

    useEffect(() => {
        fadeInBackgroundElements();
    }, []);

    const loginFormik = useFormik<{ password: string; email: string }>({
        validationSchema,
        validateOnMount: true,
        validateOnChange: true,
        initialValues: {
            password: "",
            email: "",
        },
        onSubmit: async ({ password, email }, { resetForm }) => {
            try {
                // setIsAuthenticating(true);
                const result = await _login({
                    email,
                    password,
                });

                // toast({
                //     title: "Login Completed!!",
                //     description: "You have been successfully logged in",
                //     status: "success",
                // });
                setAccess(result.credentials);
                setAccount(result.account);

                // if (result.generalOptions) {
                //     setGeneralOptions(result.generalOptions);
                // }

                // if (result.surveys) {
                //     setPendingSurvey(result.surveys);
                // }

                // if (result.client) {
                //     setClient(result.client);
                // }
                // if (result.customerSuccessManager) {
                //     setSuccessManager(result.customerSuccessManager);
                // }

                setCookie(null, cookieKey, result.credentials.access.token, {
                    path: "/",
                });

                setCookie(null, "PERMISSION", result.account.permissions || "", {
                    path: "/",
                });

                setCookie(null, "ROLE", result.account.role || "", {
                    path: "/",
                });

                // setCookie(null, "ACCESS", JSON.stringify(result.account.access), {
                //     path: "/",
                // });

                setCookie(null, "OTP_VERIFIED", "yes", {
                    path: "/",
                });
                // if (result.account.twoFA && !result.account.twoFA.enabled) {
                //   router.push('/verify-otp')
                //   return
                // }

                // if (result.account.mustCompleteRegistration) {
                //     router.push("/settings/registration-completion");
                //     return;
                // }
                if (redirectTo && (redirectTo as string).length > 0) {
                    router.push(redirectTo);
                    return;
                }

                const isMobile = window.innerWidth <= 768;
                // if (result.account.role === "client" && isMobile) {
                //     location.href = "/talent";
                //     return;
                // }

                location.href = "/dashboard";
            } catch (error) {
                // toast({
                //     description: "User or password incorrect",
                //     title: "Failed",
                //     status: "error",
                // });
                console.log("login error => ", error);
            }
        },
    });

    return (
        <section className="grow max-w-[488px] py-16 px-8 md:px-14 bg-white rounded-lg shadow-card">
            <div className="flex flex-col gap-8 items-center">
                <Link id="dashboard" href="/" className="hidden" />
                {/* <Link id="dashboard" href="/verify-otp" className='hidden' /> */}
                <Image src={bigLogo} alt="Practice 360 logo" height={48} />
                <h1 className="text-2xl font-semibold">Login to your account</h1>
                <form
                    id="login"
                    onSubmit={loginFormik.handleSubmit}
                    className="flex flex-col gap-[30px] w-full"
                >
                    <div className="flex flex-col gap-4 items-stretch w-full">
                        <div className="relative">

                            <MdOutlineMailOutline className="absolute top-[18px] left-3.5 w-[22px]" />
                            <input
                                id="email"
                                onChange={loginFormik.handleChange}
                                value={loginFormik.values.email}
                                type="email"
                                placeholder="Email Address"
                                className="w-full border b-gray-light rounded-md py-4 px-3 pl-14"
                            />
                        </div>

                        <div className="relative">
                            <FiLock className="absolute top-[18px] left-3.5 w-[22px]" />
                            <input
                                id="password"
                                onChange={loginFormik.handleChange}
                                value={loginFormik.values.password}
                                type="password"
                                placeholder="Password"
                                className="w-full border b-gray-light rounded-md py-4 px-3 pl-14"
                            />
                        </div>
                        <div className="flex flex-row justify-end">
                            <span
                                onClick={() => router.push("/forgot-password")}
                                className="text-[#4d93fb] cursor-pointer"
                            >
                                Forgot Password
                            </span>
                        </div>
                    </div>

                    <button
                        disabled={isPending}
                        className={clsx(
                            "w-full flex justify-center my-0 border-[#d71920] border text-gray-lightest py-4 px-5 text-base font-semibold leading-tight rounded-lg whitespace-nowrap",
                            isPending && "opacity-75 cursor-not-allowed",
                        )}
                        type="submit"
                    >
                        Log in
                    </button>

                    {/* <div>
                        <p className="text-center mb-5">
                            Don&apos;t have an account yet?
                            <span
                                onClick={() => router.push("/sign-up")}
                                className="text-[#4e95fe] cursor-pointer font-semibold"
                            >
                                {" "}
                                Sign up here
                            </span>
                        </p>
                    </div> */}
                </form>
            </div>
        </section>
    );
}
