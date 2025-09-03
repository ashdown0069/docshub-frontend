import { Logo } from "@/components/Header/components/Logo";
import { Button } from "@/components/ui/button";
import React from "react";
import { GuestLoginButton } from "./components/GuestLoginButton";
import { GuestLoginButton2 } from "./components/GuestLoginButton2";
import LogInContainer from "./components/loginform/logInContainer";
const page = async () => {
  return (
    <>
      <header className="flex h-16 items-center justify-between px-5">
        <Logo />
        <div>
          <Button
            variant={"ghost"}
            className="bg-brand-100 hover:bg-brand-400 hover:text-white"
          >
            Contact
          </Button>
        </div>
      </header>
      <main className="container mx-auto mt-16 flex flex-col items-center justify-center">
        <section className="h-fit rounded-lg px-10 py-5 shadow-xl">
          <h2 className="h2 my-3 text-center">Welcome back!</h2>
          <h3 className="h3 my-3 text-center">Log In to DocsHub</h3>
          <div className="mt-14 flex flex-col gap-5">
            <LogInContainer />
            {/* <GoogleLoginButton /> */}
            <GuestLoginButton />
            <GuestLoginButton2 />
          </div>
        </section>
      </main>
    </>
  );
};

export default page;
