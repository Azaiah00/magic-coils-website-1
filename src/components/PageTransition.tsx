export default function PageTransition({ children }: { children: React.ReactNode }) {
  // Critical page content stays visible in the server response. Individual
  // components can still enhance their UI after hydration, but the entire
  // page must never depend on JavaScript to appear.
  return <div>{children}</div>;
}
