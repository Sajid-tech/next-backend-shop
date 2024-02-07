import Image from "next/image";

export default function Home() {
  return <>
    <div className="flex flex-col  min-h-screen justify-center items-center  max-w-4xl m-auto">
      <h1 className=" text-4xl font-bold max-w-lg text-center">Welcome to the admin of the website</h1>
      <p className="font-medium my-4">An account is needed to view this page
      </p>

      <button
        className="inline-block rounded border border-blue-600 px-12 py-3 text-sm font-medium text-blue-600 hover:bg-blue-600 hover:text-white focus:outline-none focus:ring active:bg-blue-500"
        href="/download"
      >
        Sign In With Google
      </button>
    </div>

  </>

}
