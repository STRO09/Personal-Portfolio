// components/Card.tsx
import React from "react";
import { ExternalLink, LucideIcon } from "lucide-react";

interface CardProps {
    icon: LucideIcon;
    title: string;
    description?: string;
    items?: string[];
    dotColor?: string;
    tags?: string[];
    href?: string;
}

export default function Card({
    icon: Icon,
    title,
    description,
    items,
    dotColor = "bg-indigo-400",
    tags,
    href,
}: CardProps) {
    const isLink = Boolean(href);
    const Wrapper = isLink ? "a" : "div";
    const wrapperProps = isLink
        ? { href, target: "_blank", rel: "noopener noreferrer" }
        : {};

    return (
        <Wrapper
            {...wrapperProps}
            className="group glass-panel p-6 flex flex-col justify-between min-h-[300px] transition-all duration-500 hover:-translate-y-1"
        >
            <div>
                <div className="flex items-center justify-between mb-4">
                    <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/10">
                        <Icon className="h-5 w-5" />
                    </div>
                    {isLink && (
                        <ExternalLink className="h-4 w-4 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
                    )}
                </div>

                <h3 className="font-syne text-lg font-bold text-zinc-100 mb-2 group-hover:text-indigo-300 transition-colors">
                    {title}
                </h3>

                {description && (
                    <p className="text-sm text-zinc-400 leading-relaxed">{description}</p>
                )}

                {items && (
                    <ul className="space-y-2 text-sm text-zinc-400 mt-2">
                        {items.map((item, i) => (
                            <li key={i} className="flex items-center gap-2">
                                <span className={`h-1.5 w-1.5 rounded-full ${dotColor}`}></span>
                                {item}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {tags && (
                <div className="flex flex-wrap gap-2 mt-6">
                    {tags.map((tag, i) => (
                        <span
                            key={i}
                            className="text-[10px] font-mono px-2.5 py-1 rounded bg-white/5 text-zinc-400"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}
        </Wrapper>
    );
}