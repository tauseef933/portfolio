import type { AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const styles: Record<Variant, string> = {
  primary: "bg-accent text-on-accent hover:bg-accent/90",
  secondary: "border border-line bg-surface text-ink hover:border-muted/60",
  ghost: "text-ink hover:text-accent",
};

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  children: ReactNode;
};

/** A link styled as a button. External links open in a new tab automatically. */
export default function Button({ variant = "secondary", className = "", href = "#", children, ...rest }: Props) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex h-11 items-center justify-center gap-2 rounded-lg px-5 text-sm font-medium transition-colors duration-200 ${
        variant === "ghost" ? "px-1" : ""
      } ${styles[variant]} ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
}
