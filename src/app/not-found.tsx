import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="py-20">
        <div className="container-x max-w-2xl text-center">
          <p className="eyebrow">404</p>
          <h1 className="mt-2 text-4xl font-semibold">That page isn't here</h1>
          <p className="mt-4 text-lg text-muted">The link may be old. Try one of these instead.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/" className="btn btn-primary">Home</Link>
            <Link href="/plumbing-services/" className="btn btn-secondary">Services</Link>
            <Link href="/locations/" className="btn btn-secondary">Locations</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
