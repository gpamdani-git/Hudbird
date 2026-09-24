import re

with open("src/components/templates/ModernAppTemplate.tsx", "r") as f:
    content = f.read()

matrix_component = """
const MatrixText = ({ children }: { children: React.ReactNode }) => {
  const text = typeof children === "string" ? children : "";
  const [displayText, setDisplayText] = React.useState(text);
  const [isHovering, setIsHovering] = React.useState(false);
  
  React.useEffect(() => {
    if (!isHovering || !text) {
      setDisplayText(text);
      return;
    }
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$*";
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration || letter === " ") {
              return text[index];
            }
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join("")
      );
      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 1 / 3;
    }, 20);
    
    return () => clearInterval(interval);
  }, [isHovering, text]);

  if (!text) return <>{children}</>;

  return (
    <span
      className="relative inline-flex items-center overflow-hidden cursor-pointer"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <span className={`transition-colors duration-300 ${isHovering ? "text-rose-500 dark:text-rose-400 font-medium" : ""}`}>
        {displayText}
      </span>
      {isHovering && (
        <motion.span
          layoutId="navbar-hover"
          className="absolute -bottom-1 left-0 right-0 h-[2px] bg-rose-500 dark:bg-rose-400 shadow-[0_0_8px_rgba(225,29,72,0.8)]"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          exit={{ opacity: 0, scaleX: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </span>
  );
};

export const ModernAppTemplate = () => {"""

content = content.replace("export const ModernAppTemplate = () => {", matrix_component)

with open("src/components/templates/ModernAppTemplate.tsx", "w") as f:
    f.write(content)

