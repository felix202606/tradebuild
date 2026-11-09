export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        colorScheme: "light",
        background: "#fff",
        color: "#101112",
        position: "fixed",
        inset: 0,
        height: "100dvh",
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
}
