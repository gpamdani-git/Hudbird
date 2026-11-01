import React from "react";

export interface HudbirdIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number | string;
}

/**
 * Official Hudbird brandmark "h" icon.
 * Vector-accurate, responsive, and adheres to currentColor.
 */
export const HudbirdIcon: React.FC<HudbirdIconProps> = ({
  className = "w-6 h-6",
  size,
  style,
  ...props
}) => {
  const sizeStyles = size ? { width: size, height: size, ...style } : style;

  return (
    <svg
      viewBox="0 0 81 123"
      fill="currentColor"
      className={className}
      style={sizeStyles}
      aria-hidden="true"
      {...props}
    >
      <path d="M 11.5,0 A 11.5,11.5 0 0,1 23,11.5 L 23,44 C 25,38 36,35 48,35 C 64,35 80.5,45 80.5,65 L 80.5,111.5 A 11.25,11.25 0 0,1 58,111.5 L 58,65 C 58,57 50,53.5 40.5,53.5 C 31,53.5 23,58 23,67 L 23,111.5 A 11.5,11.5 0 0,1 0,111.5 L 0,11.5 A 11.5,11.5 0 0,1 11.5,0 Z" />
    </svg>
  );
};

export const HudbirdLogo: React.FC<HudbirdIconProps> = HudbirdIcon;
