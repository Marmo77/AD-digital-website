import { companyData } from "../../data/company";

interface LogoProps {
  className?: string;
  showText?: boolean;
  textColorClass?: string;
}

export function Logo({ className = "", showText = true, textColorClass = "text-foreground/80" }: LogoProps) {
  return (
    <div className={`flex items-end gap-[0.35rem] ${className}`}>
      <svg 
        viewBox="0 0 175 85" 
        className="w-auto h-8 lg:h-9 text-primary transition-colors shrink-0 overflow-visible" 
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <mask id="cutGap">
            <rect width="200" height="100" fill="white" />
            <polygon points="45,95 95,-10 107,-10 57,95" fill="black" />
          </mask>
        </defs>

        <g mask="url(#cutGap)">
           {/* Letter A with solid top, no upper cutout */}
           <path d="M10,85 L43,15 L63,15 L96,85 L76,85 L68,64 L38,64 L30,85 Z" />
        </g>

        {/* Letter D */}
        <path d="M92,15 H125 L155,50 L125,85 H92 V15 Z M108,32 V68 H120 L135,50 L120,32 Z" />
        
        {/* Dot */}
        <circle cx="165" cy="78" r="7" />
      </svg>
      {showText && (
        <span className={`font-semibold text-lg lg:text-xl tracking-tight leading-none translate-y-[0.2rem] transition-colors duration-300 ${textColorClass}`}>
          digital
        </span>
      )}
    </div>
  );
}
