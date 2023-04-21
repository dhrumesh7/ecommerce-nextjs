import Header from "./Header";
import Footer from "../Footer";
export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main style={{ minHeight: 'calc(100vh - 150px)' }}>{children}</main>
      <Footer />
    </>
  );
}
