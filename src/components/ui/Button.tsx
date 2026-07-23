type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

export function Button({
  children,
  onClick,
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="
        bg-yellow-400
        hover:bg-yellow-500
        transition-colors
        duration-200
        text-gray-900
        font-semibold
        px-5
        py-3
        rounded-xl
        shadow-md
      "
    >
      {children}
    </button>
  );
}