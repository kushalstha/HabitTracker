export default function Buttons({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
}) {
  const base = "px-4 py-2 rounded-full font-medium transition-all duration-150";

  const variants = {
    primary: "bg-black text-white hover:bg-gray-900",
    success: "bg-green-600 text-white hover:bg-green-700",
    neutral: "border border-black text-black bg-white hover:bg-black/5",
    danger: "text-red-600 border border-red-600 hover:bg-red-50",
    text: "text-gray-700 hover:text-black",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
