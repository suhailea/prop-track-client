import { Globe, Leaf } from "lucide-react";

const todos = [
  {
    icon: (
      <Leaf className="w-7 h-7 text-green-500 bg-green-100 rounded-lg p-1.5" />
    ), // substitute for Envato
    title: "Envato Post",
    checkout: 10,
    amount: "$219.5 Total Amount",
    percent: 46,
    color: "text-green-500",
  },
  {
    icon: (
      <Globe className="w-7 h-7 text-pink-500 bg-pink-100 rounded-lg p-1.5" />
    ), // substitute for Gumroad
    title: "Gumroad Web",
    checkout: 15,
    amount: "$384.0 Total Amount",
    percent: 61,
    color: "text-pink-500",
  },
  {
    icon: (
      <Globe className="w-7 h-7 text-blue-500 bg-blue-100 rounded-lg p-1.5 border border-blue-300" />
    ), // substitute for Behance
    title: "Behance Case Study",
    checkout: 8,
    amount: "",
    percent: 27,
    color: "text-blue-500",
  },
];

export default function TodoList() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm p-6 border border-gray-100 dark:border-gray-800 w-full max-w-md">
      <div className="flex items-center justify-between mb-4">
        <div className="text-lg font-semibold text-gray-900 dark:text-white">
          To-do List
        </div>
        <button className="text-blue-500 text-sm font-medium hover:underline">
          View All
        </button>
      </div>
      <ul className="divide-y divide-gray-100 dark:divide-gray-800">
        {todos.map((todo, idx) => (
          <li key={idx} className="flex items-center py-4 gap-3">
            <div>{todo.icon}</div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-gray-900 dark:text-white text-sm">
                {todo.title}
              </div>
              <div className="flex items-center text-xs text-gray-400 mt-1 gap-2">
                <span>
                  {todo.checkout.toString().padStart(2, "0")} Checkout
                </span>
                {todo.amount && <span className="ml-2">|</span>}
                {todo.amount && <span>{todo.amount}</span>}
              </div>
            </div>
            <div className="font-semibold text-gray-700 dark:text-gray-200 text-base min-w-[32px] text-right">
              {todo.percent}%
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
