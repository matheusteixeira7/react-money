interface ITransactionListProps {
  title: string;
  value: string;
  transactionType: "income" | "outcome";
  category: string;
  date: string;
}

export const TransactionList = ({
  title,
  value,
  transactionType,
  date,
  category,
}: ITransactionListProps) => {
  const transactionTypeColor =
    transactionType === "income" ? "text-green-500" : "text-red-500";

  const transactionValue = transactionType === "income" ? "" : "-";

  return (
    <div className="px-6 mb-4">
      <div className="flex flex-col bg-white p-4 rounded-lg">
        <span className="text-sm">{title}</span>
        <span className={`text-xl ${transactionTypeColor}`}>
          {transactionValue + value}
        </span>

        <div className="flex justify-between text-sm text-text mt-5">
          <span>{category}</span>
          <span>
            {new Date(date).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
            })}
          </span>
        </div>
      </div>
    </div>
  );
};
