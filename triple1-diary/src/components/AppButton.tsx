type Props = {
    children: React.ReactNode;
    onClick?: () => void;
};

export default function AppButton({children, onClick}: Props) {
    return (
        <button
            onClick={onClick}
            className="
                font-serif
                px-6 py-3 rounded-lg
                border border-[var(--ink)]
                transition-all duration-300
                hover:shadow-[0_0_20px_var(--ink)]
                hover:scale-105
            "
        >
            {children}
        </button>
    )
}