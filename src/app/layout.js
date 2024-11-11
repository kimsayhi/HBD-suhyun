
export const metadata = {
  openGraph: {
    title: "사랑하는 수현이에게",
    description: "생일축하해 수현아",
    images: [
      { url: "/gift-box.jpg", width: 800, height: 400, alt: "선물상자이미지" },
    ],
  },
};

export default function layout({ children }) {
  return <>{children}</>;
}

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
