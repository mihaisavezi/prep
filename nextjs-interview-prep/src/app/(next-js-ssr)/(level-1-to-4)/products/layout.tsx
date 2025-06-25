export default function RootLayout({
  children, ...props
}: Readonly<{ children: React.ReactNode }>) {
  
  console.log(props);
  return (
    <>
    This is a child layout component
    {children}</>
  );
}
