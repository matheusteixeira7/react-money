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
      <BsArrowUpCircle className="text-2xl text-green-500" />
    ) : transactionType === "outcome" ? (
      <BsArrowDownCircle className="text-2xl text-red-500" />
    ) : (
      <BsCurrencyDollar className="text-2xl text-white" />
    );

  const cardBgColor =
    transactionType === "total" && value >= 0
      ? "bg-secondary"
      : transactionType === "total" && value < 0
      ? "bg-red-400"
      : "bg-white";

  const cardTextColor =
    transactionType === "total" ? "text-white" : "text-titles";

  const LastTransactionTextColor =
    transactionType === "total" ? "text-white" : "text-text";

  return (
    <div className={`mr-4 rounded-lg p-6 ${cardBgColor} min-w-[240px]`}>
      <header className="flex justify-between">
        <span className={`${cardTextColor} text-sm font-normal`}>{title}</span>
        {transactionIcon}
      </header>

      <div className="mt-10 flex flex-col">
        <span className={`text-3xl font-medium ${cardTextColor}`}>
          {value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
            currencyDisplay: "symbol",
          })}
        </span>
        <span
          className={`text-sm font-normal ${LastTransactionTextColor} ${
            transactionType === "total" ? "hidden" : ""
          }`}
        >
          {lastTransaction === ""
            ? ""
            : `Última ${
                transactionType === "outcome" ? "saída" : "entrada"
              } dia ${new Date(lastTransaction).toLocaleDateString("pt-BR")}`}
        </span>
      </div>
    </div>
  );
};
