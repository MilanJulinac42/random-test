import type { CSSProperties, ReactNode, MouseEvent } from "react";

type CommonProps = {
  children: ReactNode;
  /** Visual variant — both render a white pill with dark text; differs only in shadow color. */
  variant?: "dark-on-light" | "light-on-dark";
  /** When true, hides the trailing arrow circle and centers the label text. */
  hideArrow?: boolean;
  className?: string;
  style?: CSSProperties;
  disabled?: boolean;
  /** Extra attributes (e.g. `data-hero-anim`, `data-quiz-anim`). Spread onto the root element. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: `data-${string}`]: any;
};

type AnchorProps = CommonProps & {
  as: "a";
  href: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  type?: never;
};

type ButtonProps = CommonProps & {
  as: "button";
  href?: never;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
};

type Props = AnchorProps | ButtonProps;

const baseStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 14,
  height: 56,
  padding: "8px 8px 8px 28px",
  borderRadius: 12,
  border: "none",
  background: "#FFFFFF",
  color: "#0D0D0D",
  fontSize: 16,
  fontWeight: 600,
  letterSpacing: "-0.005em",
  textDecoration: "none",
  cursor: "pointer",
  whiteSpace: "nowrap",
  // GPU-friendly transitions only
  transition:
    "transform 420ms cubic-bezier(0.32, 0.72, 0, 1), box-shadow 420ms cubic-bezier(0.32, 0.72, 0, 1)",
  willChange: "transform",
};

const iconCircleStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 40,
  height: 40,
  borderRadius: 12,
  background: "rgba(0,0,0,0.08)",
  transition:
    "transform 420ms cubic-bezier(0.32, 0.72, 0, 1), background-color 420ms cubic-bezier(0.32, 0.72, 0, 1)",
  flexShrink: 0,
  willChange: "transform",
};

function ArrowIcon() {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowButton(props: Props) {
  const {
    children,
    variant = "dark-on-light",
    hideArrow = false,
    className,
    style,
    disabled,
    ...rest
  } = props;

  const shadow =
    variant === "dark-on-light"
      ? "0 1px 0 rgba(255,255,255,0.9) inset, 0 6px 18px rgba(0,0,0,0.06)"
      : "0 1px 0 rgba(255,255,255,0.9) inset, 0 12px 36px rgba(0,0,0,0.18)";
  const shadowHover =
    variant === "dark-on-light"
      ? "0 1px 0 rgba(255,255,255,0.95) inset, 0 14px 36px rgba(0,0,0,0.12)"
      : "0 1px 0 rgba(255,255,255,0.95) inset, 0 18px 48px rgba(0,0,0,0.28)";

  const composed: CSSProperties = {
    ...baseStyle,
    ...(hideArrow && { justifyContent: "center", padding: "8px 28px" }),
    boxShadow: shadow,
    opacity: disabled ? 0.55 : 1,
    cursor: disabled ? "wait" : baseStyle.cursor,
    ...style,
  };

  const enter = (el: HTMLElement) => {
    if (disabled) return;
    el.style.boxShadow = shadowHover;
    const icon = el.querySelector<HTMLElement>(".reno-arrowbtn-icon");
    if (icon) {
      icon.style.transform = "translate(2px, -1px) scale(1.05)";
      icon.style.backgroundColor = "rgba(0,0,0,0.12)";
    }
  };
  const leave = (el: HTMLElement) => {
    el.style.boxShadow = shadow;
    el.style.transform = "scale(1)";
    const icon = el.querySelector<HTMLElement>(".reno-arrowbtn-icon");
    if (icon) {
      icon.style.transform = "translate(0, 0) scale(1)";
      icon.style.backgroundColor = "rgba(0,0,0,0.08)";
    }
  };
  const press = (el: HTMLElement) => {
    if (disabled) return;
    el.style.transform = "scale(0.985)";
  };
  const release = (el: HTMLElement) => {
    if (disabled) return;
    el.style.transform = "scale(1)";
  };

  const content = hideArrow ? (
    <span>{children}</span>
  ) : (
    <>
      <span>{children}</span>
      <span className="reno-arrowbtn-icon" style={iconCircleStyle}>
        <ArrowIcon />
      </span>
    </>
  );

  if (props.as === "a") {
    const { href, onClick, ...anchorRest } = rest as AnchorProps;
    return (
      <a
        href={href}
        onClick={(e) => onClick?.(e)}
        className={className}
        style={composed}
        onMouseEnter={(e) => enter(e.currentTarget)}
        onMouseLeave={(e) => leave(e.currentTarget)}
        onMouseDown={(e) => press(e.currentTarget)}
        onMouseUp={(e) => release(e.currentTarget)}
        {...anchorRest}
      >
        {content}
      </a>
    );
  }

  const { type = "button", onClick, ...buttonRest } = rest as ButtonProps;
  return (
    <button
      type={type}
      onClick={(e) => onClick?.(e)}
      disabled={disabled}
      className={className}
      style={composed}
      onMouseEnter={(e) => enter(e.currentTarget)}
      onMouseLeave={(e) => leave(e.currentTarget)}
      onMouseDown={(e) => press(e.currentTarget)}
      onMouseUp={(e) => release(e.currentTarget)}
      {...buttonRest}
    >
      {content}
    </button>
  );
}
