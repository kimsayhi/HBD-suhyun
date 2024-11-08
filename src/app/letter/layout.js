export const metadata = {
  openGraph: {
    title: "메시지 남기기",
    description: "수현이에게 생일 메시지를 남겨주세요",
    images: [
      { url: "/meta-img.jpg", width: 800, height: 800, alt: "편지이미지" },
    ],
  },
};
export default function layout({ children }) {
  return <>{children}</>;
}
