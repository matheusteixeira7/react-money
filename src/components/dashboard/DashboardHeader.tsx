import { FiDollarSign } from "react-icons/fi";

interface IProps {
  openModal: () => void;
}

const DashboardHeader = ({ openModal }: IProps) => {
  return (
    <div>
      <header className="flex items-start justify-between bg-primary h-52 p-6">
        <div className="flex items-center">
          <div className="bg-secondary p-2 rounded-full mr-2">
            <FiDollarSign className="text-white text-xl " />
          </div>
          <span className="text-white font-semibold text-lg">Dev Money</span>
        </div>

        <button
          onClick={openModal}
          className="bg-button hover:bg-buttonHover active:bg-buttonActive transition-all font-semibold text-white py-2 px-4 rounded"
        >
          Nova transação
        </button>
      </header>
    </div>
  );
};

export { DashboardHeader };
