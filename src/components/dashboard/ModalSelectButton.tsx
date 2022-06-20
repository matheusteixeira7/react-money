import { BsArrowDownCircle, BsArrowUpCircle } from "react-icons/bs";

interface IProps {
  isActive: boolean;
  title: string;
  type: "income" | "outcome";
  onClick: () => void;
}

export const ModalSelectButton = ({ isActive, title, type }: IProps) => {
  const transactionType = type === "income" ? "text-green-500" : "text-red-500";
  const icon =
    type === "income" ? (
      <BsArrowUpCircle className={`mr-2 ${transactionType} text-2xl`} />
    ) : (
      <BsArrowDownCircle className={`mr-2 ${transactionType} text-2xl`} />
    );

  const bgColor =
    isActive && type === "income"
      ? "bg-green-100"
      : isActive && type === "outcome"
      ? "bg-red-100"
      : "bg-white";

  return (
    <button
      className={`flex justify-center items-center ${bgColor} border border-gray-300 py-3 px-4 rounded`}
    >
      {icon}
      <span className="">{title}</span>
    </button>
  );
};
