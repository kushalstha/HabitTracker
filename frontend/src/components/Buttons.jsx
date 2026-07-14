export default function Buttons({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
}) {
  const base = "px-3 py-1 rounded";

  const variants = {
    primary: "bg-green-600 text-white",
    neutral: "bg-gray-400 text-white",
    danger: "text-red-400 text-sm hover:text-red-600",
    text: "text-gray-500",
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
