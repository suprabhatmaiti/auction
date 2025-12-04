import React, { useEffect, useState } from "react";
import api from "../../utils/api";

export default function Body() {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await api.get("/get-unapproved-auctions");
        setAuctions(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAuctions();
  }, []);

  return (
    <div className="pl-16 pr-8 py-8 min-h-screen">
      <h1 className="font-bold text-2xl">Auction Approval</h1>
      <p className="text-sm md:text-base text-gray-600 mt-2">
        Review and manage pending auction submissions.
      </p>

      <div className="bg-white rounded-lg shadow-md p-4 mt-6 overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-2 md:px-4 py-2 text-left">Item Name</th>
              <th className="px-2 md:px-4 py-2 text-left">Seller</th>
              <th className="px-2 md:px-4 py-2 text-left">Category</th>
              <th className="px-2 md:px-4 py-2 text-left">Submission Date</th>
              <th className="px-2 md:px-4 py-2 text-left">Status</th>
              <th className="px-2 md:px-4 py-2 text-left">Action</th>
            </tr>
          </thead>

          <tbody className="text-center">
            {/* {auctions.map((auction) => (
              <tr key={auction.id}>
                <td>{auction.title}</td>
                <td>{auction.seller}</td>
                <td>{auction.category}</td>
                <td>{auction.submissionDate}</td>
                <td>{auction.status}</td>
              </tr>
            ))} */}
            <tr>
              <td>Item 1</td>
              <td>Seller 1</td>
              <td>Category 1</td>
              <td>submi</td>
              <td>Pending</td>
              <td>done</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
