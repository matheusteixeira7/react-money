import {
  BsArrowDownCircle,
  BsArrowUpCircle,
  BsCurrencyDollar,
} from "react-icons/bs";

interface IMainCardProps {
  title: string;
  value: number;
  transactionType: string;
  lastTransaction: string;
}

export const MainCard = ({
  title,
  value,
  transactionType,
  lastTransaction,
}: IMainCardProps) => {
  const transactionIcon =
    transactionType === "income" ? (
      <BsArrowUpCircle className="text-green-500 text-2xl" />
    ) : transactionType === "outcome" ? (
      <BsArrowDownCircle className="text-red-500 text-2xl" />
    ) : (
      <BsCurrencyDollar className="text-white text-2xl" />
    );

  const cardBgColor = transactionType === "total" ? "bg-secondary" : "bg-white";
  const cardTextColor =
    transactionType === "total" ? "text-white" : "text-titles";
  const LastTransactionTextColor =
    transactionType === "total" ? "text-white" : "text-text";

  return (
    <div className={`p-6 rounded-lg min-w-fit mr-4 ${cardBgColor}`}>
      <header className="flex justify-between">
        <span className={`${cardTextColor} text-sm font-normal`}>{title}</span>
        {transactionIcon}
      </header>

      <div className="flex flex-col mt-10">
        <span className={`font-medium text-3xl ${cardTextColor}`}>
          {value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
            currencyDisplay: "symbol",
          })}
        </span>
        <span className={`font-normal text-sm ${LastTransactionTextColor}`}>
          Última entrada dia {lastTransaction}
        </span>
      </div>
    </div>
  );
};
