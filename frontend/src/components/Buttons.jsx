export default function Buttons({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
}) {
  const base = "px-5 py-3 rounded-full font-medium transition-all duration-200 inline-flex items-center justify-center";

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
      disabled={disabled}
      className={`${base} ${variants[variant]} ${
        disabled ? "opacity-60 cursor-not-allowed" : ""
      } ${className}`}
    >
      {children}
    </button>
  );
}
