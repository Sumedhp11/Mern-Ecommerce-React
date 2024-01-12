import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ITEMS_PER_PAGE } from "../../app/constants";
import {
  fetchAllOrdersAysnc,
  selectOrders,
  selectTotalOrders,
  updateOrderAsync,
} from "../order/orderSlice";

import { PencilIcon, EyeIcon } from "@heroicons/react/24/outline";
function AdminOrders() {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);

  const [editableOrderId, setEditableOrderId] = useState(-1);

  const handleEdit = (order) => {
    setEditableOrderId(order.id);
  };
  const handleShow = (order, e) => {};
  const handleUpdate = (order, e) => {
    const updatedOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
    setEditableOrderId(-1);
  };

  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-purple-200 text-purple-600";
      case "dispatched":
        return "bg-yellow-200 text-yellow-600";
      case "delievered":
        return "bg-green-200 text-green-600";
      case "cancelled":
        return "bg-red-200 text-red-600";
      default:
        return "bg-purple-200 text-purple-600";
    }
  };
  useEffect(() => {
    dispatch(fetchAllOrdersAysnc({}));
  }, [dispatch]);

  return (
    <>
      {/* component */}
      <div className="overflow-x-auto">
        <div className=" bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
          <div className="w-full ">
            <div className="bg-white shadow-md rounded my-6">
              <table className="min-w-max w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Order Number</th>
                    <th className="py-3 px-6 text-left">Items</th>
                    <th className="py-3 px-6 text-center">Total Amount</th>

                    <th className="py-3 px-6 text-center">Status</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {orders?.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="mr-2"></div>
                          <span className="font-medium">{order.id}</span>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-left">
                        {order.items.map((item) => (
                          <div className="flex items-center">
                            <div className="mr-2">
                              <img
                                className="w-6 h-6 rounded-full"
                                src={item.thumbnail}
                                alt="thumbnail"
                              />
                            </div>
                            <span>
                              {item.title} - {item.quantity}
                            </span>
                          </div>
                        ))}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex items-center justify-center">
                          $ {order.totalAmount}
                        </div>
                      </td>

                      <td className="py-3 px-6 text-center">
                        {order.id === editableOrderId ? (
                          <select onChange={(e) => handleUpdate(order, e)}>
                            <option value="pending">Pending</option>
                            <option value="dispatched">Dispatched</option>
                            <option value="delievered">Delievered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        ) : (
                          <span
                            className={`${chooseColor(
                              order.status
                            )} py-1 px-3 rounded-full text-xs`}
                          >
                            {order.status}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex item-center justify-center">
                          <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                            <EyeIcon
                              className="w-6 h-4"
                              onClick={(e) => handleShow(order)}
                            />
                          </div>
                          <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                            <PencilIcon
                              className="w-6 h-4"
                              onClick={(e) => handleEdit(order)}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminOrders;
