import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type Item = {
  title: string;
  description: string;
  icon: React.ElementType; // e.g., Lucide icon component
  onClick?: () => void;    // optional click handler
};

export const HoverEffect = ({
  items,
  className,
}: {
  items: Item[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-8",
        className
      )}
    >
      {items.map((item, idx) => (
        <div
          key={item.title}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={item.onClick}
          role={item.onClick ? "button" : undefined}
          tabIndex={item.onClick ? 0 : -1}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full rounded-3xl bg-gradient-to-br from-blue-200/40 to-slate-200/30 dark:from-blue-900/30 dark:to-slate-800/30"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.18 } }}
                exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.1 } }}
              />
            )}
          </AnimatePresence>

          <Card className="group">
            <div className="flex flex-col items-start text-left">
              <IconBadge Icon={item.icon} />
              <CardTitle className="mt-4">{item.title}</CardTitle>
              <CardDescription className="mt-3">{item.description}</CardDescription>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        // Base
        "relative z-10 w-full h-full overflow-hidden rounded-2xl",
        // Background / border / shadow
        "bg-white/70 dark:bg-slate-900/60 backdrop-blur-sm",
        "border border-slate-200/60 dark:border-slate-700/60",
        "shadow-sm hover:shadow-lg transition-shadow",
        // Spacing
        "p-5",
        // Subtle motion on hover
        "group-hover:-translate-y-0.5 transition-transform duration-200",
        className
      )}
    >
      {/* Soft blue corner sheen */}
      <div className="pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full bg-blue-200/40 dark:bg-blue-700/20 blur-3xl" />
      <div className="relative z-20">{children}</div>
    </div>
  );
};

export const IconBadge = ({ Icon }: { Icon: React.ElementType }) => {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-xl",
        "h-12 w-12",
        "bg-blue-50 dark:bg-blue-900/30",
        "ring-1 ring-blue-200/60 dark:ring-blue-800/50",
        "group-hover:scale-105 transition-transform"
      )}
    >
      <Icon className="h-6 w-6 text-blue-600 dark:text-blue-300" />
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4
      className={cn(
        "font-semibold tracking-wide",
        "text-slate-900 dark:text-slate-100",
        className
      )}
    >
      {children}
    </h4>
  );
};

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "text-sm leading-relaxed",
        "text-slate-600 dark:text-slate-300",
        className
      )}
    >
      {children}
    </p>
  );
};