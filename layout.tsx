export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-MZ">
      <head>
        <title>Fluxo Cidadão — Maputo</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-[#0f0f12] text-slate-100 antialiased">{children}</body>
    </html>
  );
}
