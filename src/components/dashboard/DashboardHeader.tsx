import { FiDollarSign } from "react-icons/fi";

interface IProps {
  openModal: () => void;
}

const DashboardHeader = ({ openModal }: IProps) => {
  return (
    <div>
      <header className="bg-primary h-52 py-6">
        <div className="flex justify-between max-w-4xl px-6 m-auto">
          <div className="flex items-center">
            <div className="bg-secondary p-2 rounded-full mr-2">
              <FiDollarSign className="text-white text-xl" />
            </div>
            <span className="text-white font-semibold text-sm md:text-lg">
              Dev Money
            </span>
          </div>
          <button
            onClick={openModal}
            className="bg-button hover:bg-buttonHover active:bg-buttonActive transition-all font-semibold text-white py-2 px-4 rounded text-sm md:text-lg ml-4 md:ml-0"
          >
            Nova transação
          </button>
        </div>
      </header>
    </div>
  );
};

export { DashboardHeader };
