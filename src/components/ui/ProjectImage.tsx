import { useState } from "react";

interface ProjectImageProps {
    src: string;
    alt: string;
    className?: string;
    fallback?: string;
}

export function ProjectImage({
    src,
    alt,
    className,
    fallback = "/fallback.jpg",
}: ProjectImageProps) {
    const [imgSrc, setImgSrc] = useState(src);
    const [hasError, setHasError] = useState(false);

    return (
        <img
            src={imgSrc}
            alt={alt}
            className={className}
            loading="lazy"
            onError={() => {
                if (!hasError) {
                    setHasError(true);
                    setImgSrc(fallback);
                }
            }}
        />
    );
}