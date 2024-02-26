"use client"
import React from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'


const Header = () => {

    const { data: session } = useSession()



    const router = useRouter()
    const { pathname } = router;


    const active = 'text-green-600 transition hover:text-green-500/75 p-3 rounded-md bg-gray-200'
    const inActive = 'text-gray-500 transition hover:text-gray-500/75 p-3'


    if (session) {
        return <>
            <header className="bg-white border-b-2 sticky z-50 top-0">
                <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex-1 md:flex md:items-center md:gap-12">
                            <Link className="block text-teal-600" href="/">
                                <span className="sr-only">Home</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
                                </svg>

                            </Link>
                        </div>

                        <div className="md:flex md:items-center md:gap-12">
                            <nav aria-label="Global" className="hidden md:block">
                                <ul className="flex items-center gap-6 text-lg">
                                    <li>
                                        <Link className={location.pathname === '/' ? active : inActive} href="/"> Dashboard </Link>
                                    </li>
                                    <li>
                                        <Link className={location.pathname === '/products' ? active : inActive} href="/products"> Products </Link>
                                    </li>
                                    {/* <li>
                                        <Link className={location.pathname === '/categories' ? active : inActive} href="/categories"> Categories </Link>
                                    </li> */}
                                    <li>
                                        <Link className={location.pathname === '/orders' ? active : inActive} href="/orders"> Orders </Link>
                                    </li>
                                    <li>
                                        <Link className={location.pathname === '/settings' ? active : inActive} href="/settings"> Settings </Link>
                                    </li>


                                </ul>
                            </nav>

                            <div className="flex items-center gap-4">
                                <div className="sm:flex sm:gap-4">
                                    {/* login icon  */}
                                    <Link
                                        href={"/settings"}
                                    >
                                        <div className="h-10 w-10">
                                            <Image
                                                className="h-full w-full rounded-full object-cover object-center"
                                                width={100}
                                                height={100}
                                                src={session.user.image}
                                                alt=""
                                            />
                                        </div>
                                    </Link>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <header className="md:hidden w-full flex justify-around items-center my-3 border-b fixed top-12 bg-green-200 z-50">
                <div className="inline-flex gap-8 p-1">
                    <Link
                        href={'/'}
                        className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-md text-accent hover:text-orange-700 focus:relative ${pathname === ('/') ? 'text-primary' : ""} `}
                    >



                        Dashboard
                    </Link>

                    <Link
                        href={'/products'}
                        className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-md text-accent hover:text-orange-700 focus:relative ${pathname === ('/products') ? 'text-primary' : ""} `}
                    >



                        Products
                    </Link>

                    <Link
                        href={'/orders'}
                        className={`inline-flex items-center gap-2 rounded-md  px-4 py-2 text-md text-accent hover:text-orange-700 focus:relative  ${pathname === ('/cart') ? 'text-primary' : ""} `}
                    >

                        Orders
                    </Link>
                </div>
            </header>
        </>
    }
}

export default Header