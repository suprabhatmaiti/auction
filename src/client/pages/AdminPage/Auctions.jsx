import React from "react";
import { ImCross, ImCheckmark, ImEye } from "react-icons/im";

export default function Auctions({ auction, approveAuction, onReload }) {
  const submitdate = new Date(auction.created_at);

  const onApproveClick = async () => {
    await approveAuction(auction.id);
    onReload();
  };

  return (
    <tr
      key={auction.id}
      className=" border-b border-gray-200 hover:bg-gray-100 align-baseline align"
    >
      <td className="px-6 py-4 text-left ">{auction.title}</td>
      <td className="px-6 py-4 ">{auction.seller_name}</td>
      <td className="px-6 py-4 ">{auction.category}</td>
      <td className="px-6 py-4 ">{submitdate.toLocaleDateString()}</td>
      <td
        className={`px-6 py-4 ${
          auction.is_approved ? "text-green-600 " : "text-orange-600"
        }  `}
      >
        {auction.is_approved ? "Approved" : "Pending"}
      </td>
      <td className="px-6 py-4 flex gap-2 justify-center items-center text-xl">
        <button className="border border-gray-200 p-1 rounded-sm cursor-pointer hover:scale-125 transition-all active:scale-80">
          <ImEye />
        </button>
        <button className="text-red-600 bg-red-200 p-1 rounded-sm cursor-pointer hover:scale-125 transition-all active:scale-80">
          <ImCross />
        </button>
        <button
          onClick={onApproveClick}
          className="bg-green-200 p-1 rounded-sm text-green-600 cursor-pointer hover:scale-125 transition-all active:scale-80"
        >
          <ImCheckmark />
        </button>
      </td>
    </tr>
  );
}
