import type { NextPage } from "next";
import Image from "next/future/image";
import Head from "next/head";
import Link from "next/link";
// import onlineDemo from "public/assets/demos/online.png";
// import inPersonDemo from "public/assets/demos/in-person.png";
// import quickDemo from "public/assets/demos/quick.png";
// import tipsDemo from "public/assets/demos/tips.png";
// import productsDemo from "public/assets/demos/products.png";
import ipadDemo from "../public/assets/demos/ipad.png";
// import rapydLogo from "public/assets/rapyd-logo.png";
// import MajesticonsBriefcaseLine from "~icons/majesticons/briefcase-line";
// import MajesticonsGlobeEarth2Line from "~icons/majesticons/globe-earth-2-line";
// import MajesticonsDollarCircleLine from "~icons/majesticons/dollar-circle-line";
// import MajesticonsMoneyHandLine from "~icons/majesticons/money-hand-line";

const Home: NextPage = () => {
  return (
    <div className="overflow-hidden">
      <Head>
        <title>
          Moala - The easiest way to collect payments online and in-person
        </title>
      </Head>
      <div className="bg-gradient hero overflow-hidden relative min-h-[min(800px,100vh)] md:max-h-[800px] flex flex-col">
        <nav className="flex items-center justify-between p-6 w-full max-w-6xl self-center">
          <div className="flex items-center gap-2">
            <Image
              src="/assets/logo.svg"
              alt="Moala Logo"
              width={35}
              height={35}
            />
            <span className="font-bold text-lg cursor-default">Moala</span>
          </div>
          <Link href="/app">
            <a className="rounded-md border-2 bg-blue-600 font-semibold text-white hover:bg-blue-700 hover:border-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500 transition delay-100 ease-linear text-sm shadow-tiny py-2 px-5">
              Get started
            </a>
          </Link>
        </nav>
        <div className="flex flex-col md:flex-row w-full max-w-6xl pt-12 self-center justify-center flex-grow">
          <div className="w-full self-center px-6 pb-12 z-20">
            <h1 className="text-4xl leading-snug font-extrabold">
              <span className="md:block">Payments Made Easy</span>
            </h1>
            <p className="text-lg font-medium text-gray-800 my-6">
              Ditch your archaic point-of-sale hardware and switch to a modern
              payment processing toolkit. Charge cards from all major card
              networks or create and share gorgeous payment links to pay online.
            </p>
            <Link href="/app">
              <a className="rounded-md border-2 bg-blue-600 font-semibold text-white hover:bg-blue-700 hover:border-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500 transition delay-100 ease-linear text-sm shadow-tiny py-2 px-5 inline-block">
                Get started
              </a>
            </Link>
          </div>
          <div className="w-full relative hidden md:block">
            <Image
              className="h-full w-auto absolute bottom-0 max-w-none rounded-t-3xl shadow-2xl"
              src={ipadDemo}
              alt="iPad demo"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
