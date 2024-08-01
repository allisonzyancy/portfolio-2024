import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import '../styles/globals.css';
import '../styles/styles.scss';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-900 leading-relaxed text-slate-400 antialiased selection:bg-pink-300 selection:text-teal-900">
        <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24 lg:py-0">
          {children}
        </div>
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
