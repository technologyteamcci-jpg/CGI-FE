import { Metadata } from 'next';
import React, { Suspense } from 'react'

export const metadata: Metadata = {
    title: "CCI",
    description: "Celebration Church International Admin ",
};


export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <Suspense>
            <main className="w-screen bg-gray-200 h-screen absolute overflow-hidden">
                <div className="h-full w-full absolute top-0 left-0">
                    <div className="h-full w-full relative">
                        <div
                            id="design-element-1"
                            style={{
                                opacity: 0,
                                transform: "translateY(-100px)",
                                transition: "opacity 0.5s ease-in, transform 0.5s ease-in",
                            }}
                            className="absolute animate-fadeIn top-0 left-64 bg-[url(/ellipse.svg)] h-72 w-[650px] bg-cover bg-no-repeat"
                        />
                        <div
                            id="design-element-2"
                            style={{
                                opacity: 0,
                                transform: "translateY(100px)",
                                transition: "opacity 0.5s ease-in, transform 0.5s ease-in",
                            }}
                            className="absolute animate-fadeIn bottom-0 -left-20 bg-[url(/ellipse-2.svg)] h-72 w-[650px] bg-cover bg-no-repeat"
                        />
                        <div
                            id="design-element-3"
                            style={{
                                opacity: 0,
                                transform: "translateX(100px)",
                                transition: "opacity 0.5s ease-in, transform 0.5s ease-in",
                            }}
                            className="animate-fadeIn absolute -right-52 bg-[url(/stacked-boxes.svg)] h-[753px] w-[848px] bg-center bg-no-repeat"
                        />
                    </div>
                </div>
                <div className="h-full w-full px-6 md:px-0 absolute top-0 left-0 flex items-center justify-center">
                    {children}
                </div>
            </main>
        </Suspense>
    )
}
