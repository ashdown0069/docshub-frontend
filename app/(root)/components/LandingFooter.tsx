import Image from "next/image";
import React from "react";
import { Logo } from "@/components/Header/components/Logo";

const footerQuickLink = [
  {
    title: "HOME",
    path: "/",
  },
  {
    title: "Price",
    path: "/",
  },
  {
    title: "Feature",
    path: "/",
  },
  {
    title: "Contact",
    path: "/",
  },
];
const footerSupport = [
  {
    title: "Help center",
    path: "/",
  },
  {
    title: "Privacy",
    path: "/",
  },
  {
    title: "Cookie policy",
    path: "/",
  },
  {
    title: "ESG",
    path: "/",
  },
];
export const LandingFooter = () => {
  return (
    <footer className="bg-gray-900 py-12 text-gray-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col justify-between space-y-8 md:flex-row md:space-y-0">
          <div className="flex w-full flex-col items-start space-y-6 md:w-1/3">
            <div>
              <Logo />
            </div>
            <div>
              <h4 className="mb-4 text-lg font-semibold">Connect With Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <Image
                    width={30}
                    height={30}
                    alt="facebook icon"
                    src={"/assets/icons/facebook.svg"}
                  />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Image
                    width={30}
                    height={30}
                    alt="x icon"
                    src={"/assets/icons/x.svg"}
                  />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Image
                    width={30}
                    height={30}
                    alt="instagram icon"
                    src={"/assets/icons/instagram.svg"}
                  />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="w-full md:w-1/3">
            <h4 className="mb-4 text-lg font-semibold">Quick Links</h4>
            <ul className="flex flex-col space-y-2">
              {footerQuickLink.map((item) => (
                <li key={item.title}>
                  <a
                    href={item.path}
                    className="hover:text-white sm:text-sm md:text-base"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* support Links */}
          <div className="w-full md:w-1/3">
            <h4 className="mb-4 text-lg font-semibold">Support</h4>
            <ul className="flex flex-col space-y-2">
              {footerSupport.map((item) => (
                <li key={item.title}>
                  <a
                    href={item.path}
                    className="hover:text-white sm:text-sm md:text-base"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-800 pt-6 text-center">
          <p className="text-sm text-gray-500 sm:text-xs md:text-sm">
            © 2024 DocsHub. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
