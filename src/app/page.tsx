import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1>Go To Lessons Page</h1>
        <Link
          className="border border-black p-3 rounded-xl mt-10 hover:bg-black hover:text-white"
          href="/lessons"
        >
          Lessons
        </Link>

        <Link
          className="border border-black p-3 rounded-xl mt-10 hover:bg-black hover:text-white"
          href="/dashboard"
        >
          Dashboard
        </Link>
      </div>
    </>
  );
}
