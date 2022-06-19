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

  return (
    <div className="px-6 mb-4">
      <div className="flex flex-col bg-white p-4 rounded-lg">
        <span className="text-sm">{title}</span>
        <span className={`text-xl ${transactionTypeColor}`}>{value}</span>

        <div className="flex justify-between text-sm text-text mt-5">
          <span>{category}</span>
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
};
