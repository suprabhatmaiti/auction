import React, { useState } from "react";
import Input from "./Input/Input";

export default function TimeInput({ onChange }) {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  function handleChange(e) {
    setTime({ ...time, [e.target.name]: e.target.value });
    const totalMs =
      time.days * 86400000 +
      time.hours * 3600000 +
      time.minutes * 60000 +
      time.seconds * 1000;
    onChange(totalMs);
    // console.log(totalMs);
    // // onChange(time);
  }

  return (
    <div className="flex gap-4">
      <Input
        type="number"
        name="days"
        label="Days"
        placeholder="Days"
        value={time.days}
        onChange={handleChange}
        className="border p-2 w-30 rounded "
      />

      <Input
        type="number"
        name="hours"
        label="Hours"
        placeholder="Hours"
        value={time.hours}
        onChange={handleChange}
        className="border p-2 w-30 rounded"
      />

      <Input
        type="number"
        name="minutes"
        label="Minutes"
        placeholder="Minutes"
        value={time.minutes}
        onChange={handleChange}
        className="border p-2 w-30 rounded"
      />

      <Input
        type="number"
        name="seconds"
        label="Seconds"
        placeholder="Seconds"
        value={time.seconds}
        onChange={handleChange}
        className="border p-2 w-40 rounded"
      />
    </div>
  );
}
