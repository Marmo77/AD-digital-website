const ShinyText = ({
  text,
  disabled = false,
  speed = 4,
  className = "",
}: {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}) => {
  const animationDuration = `${speed}s`;

  return (
    <span
      className={`text-transparent bg-clip-text inline-block ${
        disabled ? "" : "animate-shine"
      } ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(120deg, hsl(var(--primary)) 40%, rgba(255, 255, 255, 0.9) 50%, hsl(var(--primary)) 60%)",
        backgroundSize: "200% auto",
        WebkitBackgroundClip: "text",
        animationDuration: animationDuration,
      }}
    >
      {text}
    </span>
  );
};

export default ShinyText;
