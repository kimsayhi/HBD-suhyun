import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <div className="flex w-full justify-center  mt-[50px] px-4">
          {children}
        </div>
      </body>
    </html>
  );
}
