import { signOut } from "next-auth/react";
import { FiDollarSign } from "react-icons/fi";
import { MdLogout } from "react-icons/md";

interface IProps {
  openModal: () => void;
}

const DashboardHeader = ({ openModal }: IProps) => {
  return (
    <div>
      <header className="h-52 bg-primary py-6">
        <div className="m-auto flex max-w-4xl justify-between px-6">
          <div className="flex items-center">
            <div className="mr-2 rounded-full bg-secondary p-2">
              <FiDollarSign className="text-xl text-white" />
            </div>

            <span className="text-sm font-semibold text-white md:text-lg">
              Vinance
            </span>
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={openModal}
              className="my-6 rounded-[4px] bg-primary p-3 font-semibold text-white brightness-125 transition-all ease-in-out hover:brightness-90 active:brightness-90"
            >
              Nova transação
            </button>

            <span
              title="Fazer logout"
              onClick={() => signOut({ callbackUrl: "/signin" })}
            >
              <MdLogout className="ml-4 cursor-pointer text-2xl text-white transition-all ease-in-out hover:brightness-110 active:brightness-90" />
            </span>
          </div>
        </div>
      </header>
    </div>
  );
};

export { DashboardHeader };
