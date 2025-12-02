import Bookshelf from "../components/Bookshelf";

export default function Library () {
    return (
        <div className="flex flex-col gap-4 justify-center items-center h-screen">
            <p className="font-serif text-4xl text-[var(--ink)]">📚 Library Page</p>

            <Bookshelf></Bookshelf>
        </div>
    )
}