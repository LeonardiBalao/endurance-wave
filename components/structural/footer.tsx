import Link from "next/link";
import Logo from "./navigation/logo";

export const Footer = () => {
  return (
    <footer id="footer" className="mt-14 bg-secondary">
      <hr className="mx-auto" />
      <section className="p-20 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
        <div className="col-span-full xl:col-span-2 mb-4">
          <Logo
            className="justify-center flex flex-col"
            width={50}
            showSlogan
          />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Follow us</h3>
          <div>
            <Link
              rel="noreferrer noopener"
              href="#"
              className="opacity-60 hover:opacity-100"
            >
              Facebook
            </Link>
          </div>
          <div>
            <Link
              rel="noreferrer noopener"
              href="#"
              className="opacity-60 hover:opacity-100"
            >
              Twitter
            </Link>
          </div>
          <div>
            <Link
              rel="noreferrer noopener"
              href="#"
              className="opacity-60 hover:opacity-100"
            >
              Instagram
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Platforms</h3>
          <div>
            <Link
              rel="noreferrer noopener"
              href="#"
              className="opacity-60 hover:opacity-100"
            >
              Web
            </Link>
          </div>
          <div>
            <Link
              rel="noreferrer noopener"
              href="#"
              className="opacity-60 hover:opacity-100"
            >
              Mobile
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">About us</h3>
          <div>
            <Link
              rel="noreferrer noopener"
              href="#"
              className="opacity-60 hover:opacity-100"
            >
              How it works
            </Link>
          </div>
          <div>
            <Link
              rel="noreferrer noopener"
              href="#"
              className="opacity-60 hover:opacity-100"
            >
              FAQ
            </Link>
          </div>
        </div>
      </section>
      <section className="container pb-14 text-center">
        <h3>
          &copy; 2024 - Criado por{" "}
          <Link
            rel="noreferrer noopener"
            href="#"
            className="text-primary transition-all border-primary hover:border-b-2"
          >
            MBX
          </Link>
        </h3>
      </section>
    </footer>
  );
};
