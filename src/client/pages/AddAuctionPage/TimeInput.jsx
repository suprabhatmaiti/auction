import React, { useReducer, useState } from "react";
import Input from "../../components/Input/Input";

export default function TimeInput({ onChange, auctionRunTime }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <div className="flex gap-4">
      <Input
        type="number"
        name="days"
        label="Days"
        placeholder="Days"
        value={auctionRunTime.days}
        onChange={handleChange}
        className="border p-2 w-30 rounded "
      />

      <Input
        type="number"
        name="hours"
        label="Hours"
        placeholder="Hours"
        value={auctionRunTime.hours}
        onChange={handleChange}
        className="border p-2 w-30 rounded"
      />

      <Input
        type="number"
        name="minutes"
        label="Minutes"
        placeholder="Minutes"
        value={auctionRunTime.minutes}
        onChange={handleChange}
        className="border p-2 w-30 rounded"
      />

      <Input
        type="number"
        name="seconds"
        label="Seconds"
        placeholder="Seconds"
        value={auctionRunTime.seconds}
        onChange={handleChange}
        className="border p-2 w-40 rounded"
      />
    </div>
  );
}
