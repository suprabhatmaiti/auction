import React from "react";
import api from "../../../utils/api";

export const getAuction = async (page) => {
  try {
    const { data } = await api.get("/api/auction/get-unapproved-auctions", {
      withCredentials: true,
      params: {
        page: page,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const approveAuction = async (id) => {
  try {
    const { data } = await api.post(`api/auction/approve-auction/${id}`);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
