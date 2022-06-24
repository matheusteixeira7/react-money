import { NextPageContext } from "next";
import { getSession, signIn } from "next-auth/react";

import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FiDollarSign } from "react-icons/fi";
import { ImFacebook2 } from "react-icons/im";

export default function SignIn() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-white md:bg-background">
      <div className="w-full max-w-sm rounded-md bg-white p-6 md:drop-shadow-lg">
        <header className="mb-6 flex flex-col">
          <div className="flex flex-col items-center">
            <div className="mb-2 rounded-full bg-secondary p-2">
              <FiDollarSign className="text-4xl text-white" />
            </div>
            <span className="text-lg font-semibold text-titles">Vinance</span>
          </div>
          <span className="text-center text-titles">
            Faça seu login para continuar
          </span>
        </header>

        <section className="flex flex-col">
          <input
            type="email"
            placeholder="E-mail"
            className="rounded-[4px] border-text placeholder:text-text"
          />
          <button className="my-6  rounded-[4px] bg-primary p-3 font-semibold text-white transition-all ease-in-out hover:brightness-110 active:brightness-90">
            Continuar
          </button>
        </section>

        <div className="relative mb-6 flex items-center">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="mx-4 flex-shrink text-titles">ou</span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>

        <section className="flex flex-col items-start">
          <button className="mb-3 flex w-full items-center rounded-[4px] border border-text px-6 py-3 transition-all ease-in-out hover:bg-gray-100 active:bg-gray-200">
            <FcGoogle className="text-xl" />
            <span className="ml-3 text-base text-titles">
              Entrar com Google
            </span>
          </button>

          <button className="mb-3 flex w-full items-center rounded-[4px] border border-text px-6 py-3 transition-all ease-in-out hover:bg-gray-100 active:bg-gray-200">
            <ImFacebook2 className="text-xl text-blue-800" />
            <span className="ml-3 text-base text-titles">
              Entrar com Facebook
            </span>
          </button>

          <button
            onClick={() =>
              signIn("github", { callbackUrl: "http://localhost:3000/" })
            }
            className="flex w-full items-center rounded-[4px] border border-text px-6 py-3 transition-all ease-in-out hover:bg-gray-100 active:bg-gray-200"
          >
            <FaGithub className="text-xl text-titles" />
            <span className="ml-3 text-base text-titles">
              Entrar com Github
            </span>
          </button>
        </section>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
