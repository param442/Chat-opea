export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <div className="h-screen w-full">{children}</div>;
}
