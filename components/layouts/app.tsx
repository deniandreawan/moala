import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { signOut } from "next-auth/react";
import classNames from "classnames";
import { Menu } from "@headlessui/react";
import {
  BellIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  ChartBarIcon,
  BoltIcon,
  ListBulletIcon,
  ShoppingBagIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import useUser from "@hooks/useUser";

const TopBar: React.FC<{ className?: string }> = ({ className }) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const notificationsBtn = useRef(null);

  return (
    <div className={classNames("p-6 flex justify-between", className)}>
      <Image src="/assets/logo.svg" alt="Moala Logo" width={35} height={35} />
      <div className="text-base flex gap-3">
        <button
          className="relative"
          ref={notificationsBtn}
          onClick={() => setNotificationsOpen(!notificationsOpen)}
        >
          <BellIcon className="h-6 w-6" />
        </button>
        <Menu as="div" className="relative flex">
          <Menu.Button>
            <UserIcon className="h-6 w-6" />
          </Menu.Button>
          <Menu.Items className="absolute right-0 md:right-auto md:left-0 mt-8 w-44 origin-top-left rounded-md bg-white border-2 z-50">
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() =>
                      signOut({
                        callbackUrl: `${window.location.origin}/login`,
                      })
                    }
                    className={classNames(
                      "group flex w-full items-center gap-1 rounded-md px-2 py-2 text-sm font-bold",
                      {
                        "bg-blue-600 text-white": active,
                      }
                    )}
                  >
                    <ArrowRightOnRectangleIcon className="h-6 w-6" />
                    Logout
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Menu>
      </div>
    </div>
  );
};

const AppLayout: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { session, statusLoading } = useUser({
    redirectTo: "/login",
  });
  const router = useRouter();
  const links = [
    {
      link: "/app",
      title: "Overview",
      icon: ChartBarIcon,
    },
    {
      link: "/app/payments",
      title: "Payments",
      icon: ListBulletIcon,
    },
    {
      link: "/app/payments/new",
      title: "New payment",
      icon: BoltIcon,
    },
    {
      link: "/app/products",
      title: "Products",
      icon: ShoppingBagIcon,
    },
    {
      link: "/app/settings",
      title: "Settings",
      icon: Cog6ToothIcon,
    },
  ];

  if (!session && statusLoading) {
    return (
      <div className="flex justify-center items-center flex-col min-h-screen relative">
        <div className="animate-spin spinner" />
        <h3 className="mt-4 text-sm font-semibold">Please wait</h3>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex">
      <div className="hidden md:flex flex-col w-[250px] border-r-2 border-gray-200 flex-shrink-0">
        <TopBar />
        <div className="flex flex-col gap-5 p-6">
          {links.map((link) => (
            <Link key={link.link} href={link.link}>
              <a
                className={classNames("flex gap-3 items-center", {
                  "text-blue-600": router.pathname === link.link,
                })}
              >
                <link.icon className="h-6 w-6" />
                <span className="font-semibold text-sm">{link.title}</span>
              </a>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex-grow flex flex-col">
        <TopBar className="md:hidden" />
        {children}
        <div className="md:hidden flex justify-around p-6 sticky bottom-0 w-full backdrop-blur bg-white/25 mt-auto">
          {links.map((link) => (
            <Link key={link.link} href={link.link}>
              <a
                className={classNames("text-lg", {
                  "text-blue-700": router.pathname === link.link,
                })}
              >
                <link.icon className="h-6 w-6" />
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
