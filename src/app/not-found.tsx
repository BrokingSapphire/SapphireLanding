import Link from "next/link"
import Astronaut from "@/components/not-found/Astronaut";

export default function NotFound() {
  return (
    <div className="flex items-center min-h-screen px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16 xl:max-w-7xl mx-auto flex p-auto">
      <div className="w-full space-y-6 text-center">
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Lost in Heaven!</h1>
          <p className="text-gray-500">Sorry, we couldn&#x27;t find the page you&#x27;re looking for.</p>
        </div>
        <Link
          href="/"
          className="inline-flex h-10 items-center rounded-md border border-gray-200 border-gray-200 bg-white shadow-sm px-8 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
          prefetch={false}
        >
          Return to Home Page
        </Link>
      </div>
      <div className="w-half bg-white flex items-center justify-center hidden lg:flex">
        <Astronaut />
        {/* ...other content... */}
      </div>
    </div>
  )
}