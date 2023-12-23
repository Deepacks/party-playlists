export function AnimatedBackground({ children }: React.PropsWithChildren) {
  return (
    <>
      <div className="h-full relative z-10">{children}</div>
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
    </>
  )
}
