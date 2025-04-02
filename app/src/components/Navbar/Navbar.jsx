import Link from "next/link";

export default function Navbar() {
  return (
    <div className="bg-red-900 w-full p-4 mx-auto max-w-7xl hidden lg:flex flex-grow "> 
      <div className="flex gap-12">
        <Link href="/">
          <button className="btn btn-primary bg-white text-green-600 hover:bg-green-500 hover:text-white border-none">
            Home
          </button>
        </Link>
        <Link href="#event-list">
          <button className="btn btn-primary bg-white text-green-600 hover:bg-green-500 hover:text-white border-none">
            Events
          </button>
        </Link>
        <Link href="/create">
          <button className="btn btn-primary bg-white text-green-600 hover:bg-green-500 hover:text-white border-none">
            Create Event
          </button>
        </Link>
        <Link href="/signup">
          <button className="btn btn-primary text-white hover:text-white border-none">
            Sign Up
          </button>
        </Link>
        <Link href="/login">
          <button className="btn btn-secondary text-white border-green-600 hover:bg-green-500 hover:text-white">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
}
