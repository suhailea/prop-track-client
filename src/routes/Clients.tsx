import ClientLayout from "@/components/layouts/ClientLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MessageSquare, Eye } from "lucide-react";
import React from "react";

// Mock order data
const orders = [
  {
    order: "#1002",
    date: "11 Feb, 2024",
    customer: "Wade Warren",
    payment: "Pending",
    total: "$20.00",
    delivery: "N/A",
    items: "2 items",
    fulfillment: "Unfulfilled",
  },
  {
    order: "#1004",
    date: "13 Feb, 2024",
    customer: "Esther Howard",
    payment: "Success",
    total: "$22.00",
    delivery: "N/A",
    items: "3 items",
    fulfillment: "Fulfilled",
  },
  {
    order: "#1007",
    date: "15 Feb, 2024",
    customer: "Jenny Wilson",
    payment: "Pending",
    total: "$25.00",
    delivery: "N/A",
    items: "1 items",
    fulfillment: "Unfulfilled",
  },
  {
    order: "#1009",
    date: "17 Feb, 2024",
    customer: "Guy Hawkins",
    payment: "Success",
    total: "$27.00",
    delivery: "N/A",
    items: "5 items",
    fulfillment: "Fulfilled",
  },
  {
    order: "#1011",
    date: "19 Feb, 2024",
    customer: "Jacob Jones",
    payment: "Pending",
    total: "$32.00",
    delivery: "N/A",
    items: "4 items",
    fulfillment: "Unfulfilled",
  },
  {
    order: "#1013",
    date: "21 Feb, 2024",
    customer: "Kristin Watson",
    payment: "Success",
    total: "$25.00",
    delivery: "N/A",
    items: "3 items",
    fulfillment: "Fulfilled",
  },
  {
    order: "#1015",
    date: "23 Feb, 2024",
    customer: "Albert Flores",
    payment: "Pending",
    total: "$28.00",
    delivery: "N/A",
    items: "2 items",
    fulfillment: "Unfulfilled",
  },
  {
    order: "#1018",
    date: "25 Feb, 2024",
    customer: "Eleanor Pena",
    payment: "Success",
    total: "$35.00",
    delivery: "N/A",
    items: "1 items",
    fulfillment: "Fulfilled",
  },
  {
    order: "#1019",
    date: "27 Feb, 2024",
    customer: "Theresa Webb",
    payment: "Pending",
    total: "$20.00",
    delivery: "N/A",
    items: "2 items",
    fulfillment: "Unfulfilled",
  },
];

const paymentPill = {
  Pending: "bg-orange-50 text-orange-600 border border-orange-200",
  Success: "bg-green-50 text-green-600 border border-green-200",
};
const fulfillmentPill = {
  Unfulfilled: "bg-red-50 text-red-500 border border-red-200",
  Fulfilled: "bg-green-50 text-green-600 border border-green-200",
};

export function Clients() {
  return (
    <ClientLayout>
      <div className="min-h-screen text-gray-900">
        <Table className="w-full border border-gray-200">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead>Order</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Delivery</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Fulfillment</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.order} className="hover:bg-gray-50">
                <TableCell className="font-semibold text-gray-800">{order.order}</TableCell>
                <TableCell className="text-gray-500">{order.date}</TableCell>
                <TableCell className="text-gray-700">{order.customer}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${paymentPill[order.payment as keyof typeof paymentPill]}`}>
                    <span className="w-2 h-2 rounded-full bg-current mr-1" />
                    {order.payment}
                  </span>
                </TableCell>
                <TableCell>{order.total}</TableCell>
                <TableCell>{order.delivery}</TableCell>
                <TableCell>{order.items}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${fulfillmentPill[order.fulfillment as keyof typeof fulfillmentPill]}`}>
                    <span className="w-2 h-2 rounded-full bg-current mr-1" />
                    {order.fulfillment}
                  </span>
                </TableCell>
                <TableCell className="flex gap-2 justify-center">
                  <button className="p-2 rounded hover:bg-gray-100 text-gray-500" title="Message">
                    <MessageSquare className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded hover:bg-gray-100 text-gray-500" title="View">
                    <Eye className="w-4 h-4" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </ClientLayout>
  );
}
