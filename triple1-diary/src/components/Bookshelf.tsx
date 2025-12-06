type Props = {
    children: React.ReactNode;
}

export default function Bookshelf ({children}: Props) {
    return (
        <div 
            className="
                py-3
                w-full h-auto
                bg-opacity-10 
                border border-6 border-[var(--ink)] rounded-lg 
                flex gap-6 justify-center
            "
        >
            {children}
        </div>
    )
};