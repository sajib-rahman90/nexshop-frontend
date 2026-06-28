/**
 * Custom Button component — uses native HTML elements.
 * Drop-in replacement for HeroUI Button with identical prop API.
 * Uses onClick (works everywhere) instead of React Aria's onPress.
 */

import Link from "next/link";
import { Loader2 } from "lucide-react";

const SIZE_CLASSES = {
  sm: "px-3 py-1.5 text-xs h-8",
  md: "px-4 py-2 text-sm h-10",
  lg: "px-6 py-2.5 text-base h-12",
};

const VARIANT_COLOR_CLASSES = {
  // color → variant → classes
  primary: {
    solid: "bg-blue-500 hover:bg-blue-600 text-white shadow-sm shadow-blue-500/20",
    flat: "bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-300",
    bordered: "border-2 border-blue-500 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20",
    light: "hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-500",
    ghost: "hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-500",
  },
  default: {
    solid: "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-100",
    flat: "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300",
    bordered: "border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800",
    light: "hover:bg-gray-100 dark:hover:bg-gray-800",
    ghost: "hover:bg-gray-100 dark:hover:bg-gray-800",
  },
  danger: {
    solid: "bg-red-500 hover:bg-red-600 text-white",
    flat: "bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/50 text-red-600 dark:text-red-300",
    bordered: "border border-red-400 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20",
    light: "hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500",
    ghost: "hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500",
  },
  secondary: {
    solid: "bg-emerald-500 hover:bg-emerald-600 text-white",
    flat: "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-300 hover:bg-emerald-100",
    bordered: "border border-emerald-400 text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20",
    light: "hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-emerald-500",
    ghost: "hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-emerald-500",
  },
};

export function Button({
  children,
  onClick,
  onPress,       // React Aria alias — mapped to onClick
  href,          // renders as <Link>
  as: As,        // custom element (ignored, handled via href)
  variant = "solid",
  color = "default",
  size = "md",
  isLoading = false,
  isDisabled = false,
  disabled,
  startContent,
  endContent,
  className = "",
  type = "button",
  isIconOnly = false,
  fullWidth = false,
  ...rest
}) {
  const colorKey = color in VARIANT_COLOR_CLASSES ? color : "default";
  const variantKey = variant in VARIANT_COLOR_CLASSES[colorKey] ? variant : "solid";

  const base = [
    "inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-150 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
    SIZE_CLASSES[size] || SIZE_CLASSES.md,
    VARIANT_COLOR_CLASSES[colorKey][variantKey],
    fullWidth ? "w-full" : "",
    isIconOnly ? "!px-0 aspect-square" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const isActuallyDisabled = isDisabled || disabled || isLoading;

  const handleClick = (e) => {
    if (isActuallyDisabled) return;
    if (onPress) onPress(e);
    if (onClick) onClick(e);
  };

  const content = (
    <>
      {isLoading && <Loader2 size={15} className="animate-spin shrink-0" />}
      {!isLoading && startContent && <span className="shrink-0">{startContent}</span>}
      {children}
      {!isLoading && endContent && <span className="shrink-0">{endContent}</span>}
    </>
  );

  // Render as Next.js Link when href is provided
  if (href && !isActuallyDisabled) {
    return (
      <Link href={href} className={base} {...rest}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={isActuallyDisabled}
      className={base}
      {...rest}
    >
      {content}
    </button>
  );
}

export default Button;
