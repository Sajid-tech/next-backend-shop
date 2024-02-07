"use client"
import { useSession, signIn, signOut } from "next-auth/react"
export default function Home() {


  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }

  return <>
    <div className="flex flex-col  min-h-screen justify-center items-center  max-w-4xl m-auto">
      <h1 className=" text-4xl font-bold max-w-lg text-center">Welcome to the admin of the website</h1>
      <p className="font-medium my-4">An account is needed to view this page
      </p>

      <button
        onClick={() => signIn()}
        className="inline-block rounded border border-blue-600 px-12 py-3 text-sm font-medium text-blue-600 hover:bg-blue-600 hover:text-white focus:outline-none focus:ring active:bg-blue-500"
      >
        Sign In With Google
      </button>
    </div>

  </>

}
