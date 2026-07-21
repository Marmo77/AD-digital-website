import { useState } from "react";

interface ProjectImageProps {
    src: string;
    alt: string;
    className?: string;
    /** Ostatni element łańcucha, gdy wszystko inne zawiedzie */
    fallback?: string;
    /** Kolejne źródła próbowane po błędzie, np. gif -> image -> fallback */
    fallbacks?: string[];
}

export function ProjectImage({
    src,
    alt,
    className,
    fallback = "/fallback.jpg",
    fallbacks = [],
}: ProjectImageProps) {
    // Łańcuch źródeł bez duplikatów i pustych wartości
    const chain = [src, ...fallbacks, fallback].filter(
        (s, i, arr): s is string => Boolean(s) && arr.indexOf(s) === i,
    );
    const [index, setIndex] = useState(0);

    return (
        <img
            src={chain[index]}
            alt={alt}
            className={className}
            loading="lazy"
            onError={() => {
                setIndex((i) => (i < chain.length - 1 ? i + 1 : i));
            }}
        />
    );
}
