export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full w-screen overflow-x-hidden bg-white text-black">
   
        {children}
    </div>
      
  );
}