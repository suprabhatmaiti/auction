import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import Auctions from "./Auctions";
import { approveAuction, getAuction } from "./AuctionHelper/AuctionHelper.jsx";
import LoadingOverlay from "../../components/LoadingOverlay/LoadingOverlay.jsx";
import { toast } from "react-toastify";

export default function Body() {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [reload, setReload] = useState(false);
  const [error, setError] = useState(null);
  const [totalpage, setTotalpage] = useState(0);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        setLoading(true);

        const data = await getAuction(page);
        setAuctions(data.auctions);
        const pg = data.pagination;
        setTotalpage(100);
        setPage(pg.currentPage);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAuctions();
  }, [reload]);

  const onPreviousClick = () => {
    if (page > 1) setPage(page - 1);
  };
  const onNextClick = () => {
    if (page < totalpage) setPage(page + 1);
  };

  const onApprove = async (id) => {
    try {
      setLoading(true);
      await approveAuction(id);
      toast.success("Auction approved successfully");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onReload = () => {
    setReload(!reload);
  };

  const auctionList = auctions.map((auction) => (
    <Auctions
      auction={auction}
      key={auction.id}
      approveAuction={onApprove}
      onReload={onReload}
    />
  ));

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisible = 3; // how many pages on each side of current page

    if (totalpage <= 7) {
      // show all if pages are small
      for (let i = 1; i <= totalpage; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1); // always show first page

      if (page > maxVisible + 2) {
        pageNumbers.push("..."); // left ellipsis
      }

      const start = Math.max(2, page - maxVisible);
      const end = Math.min(totalpage - 1, page + maxVisible);

      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }

      if (page < totalpage - (maxVisible + 1)) {
        pageNumbers.push("..."); // right ellipsis
      }

      pageNumbers.push(totalpage); // always show last page
    }

    return pageNumbers.map((number, index) => (
      <li
        key={index}
        onClick={() => typeof number === "number" && pageChange(number)}
        className={`flex items-center justify-center text-body bg-neutral-secondary-medium hover:bg-gray-100 transition-all cursor-pointer ${
          number === page ? "bg-blue-500 text-white font-bold" : ""
        }`}
      >
        <a className="flex items-center justify-center w-9 h-9 text-sm border border-default-medium">
          {number}
        </a>
      </li>
    ));
  };

  const pageChange = (e) => {
    const pageNum = Number(e.target.innerText);
    if (page === pageNum) return;
    setPage(page);
    setReload(!reload);
  };

  return (
    <>
      <div className="pl-16 pr-8 py-8 min-h-screen">
        <h1 className="font-bold text-2xl">Auction Approval</h1>
        <p className="text-sm md:text-base text-gray-600 mt-2">
          Review and manage pending auction submissions.
        </p>

        <div className="bg-white rounded-lg shadow-md p-4 mt-6 overflow-x-auto">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <table className="min-w-full border border-gray-200 text-sm my-4">
              <thead className="bg-gray-100 text-center text-gray-600">
                <tr className=" align-text-top">
                  <th className="px-2 md:px-4 py-2 ">Item Name</th>
                  <th className="px-2 md:px-4 py-2 ">Seller</th>
                  <th className="px-2 md:px-4 py-2 ">Category</th>
                  <th className="px-2 md:px-4 py-2 ">Submission Date</th>
                  <th className="px-2 md:px-4 py-2 ">Status</th>
                  <th className="px-2 md:px-4 py-2 ">Action</th>
                </tr>
              </thead>

              <tbody className="text-center font-semibold text-gray-800">
                {auctionList.length > 0 ? (
                  auctionList
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="py-6 text-center text-gray-500 font-medium"
                    >
                      No auctions found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
          <div className="flex justify-center mt-4">
            <nav aria-label="Page navigation example">
              <ul className="flex -space-x-px text-sm">
                <li
                  onClick={onPreviousClick}
                  className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading font-medium rounded-s-base text-sm px-3 h-9 focus:outline-none  hover:bg-gray-100 transition-all active:bg-white cursor-pointer"
                >
                  <button
                    disabled={page === 1}
                    className="disabled:text-gray-300"
                  >
                    Previous
                  </button>
                </li>
                {renderPageNumbers()}
                <li
                  onClick={onNextClick}
                  className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading font-medium rounded-e-base text-sm px-3 h-9 focus:outline-none cursor-pointer hover:bg-gray-100 transition-all active:bg-white"
                >
                  <button
                    disabled={page === totalpage}
                    className=" disabled:text-gray-300"
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
