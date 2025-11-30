import { useReducer, useState } from "react";
import { IoRadioButtonOffOutline, IoRadioButtonOn } from "react-icons/io5";
import {
  formReducer,
  initialState,
  UPDATE_FIELD,
  RESET_FORM,
  SET_ERROR,
  SET_ROLE,
} from "./reducers/authReducer";
function RoleCheckBox() {
  const [state, dispatch] = useReducer(formReducer, initialState);

  console.log(state);

  const values = [
    { label: "Buyer", value: "buyer" },
    { label: "Seller", value: "seller" },
  ];

  const checkboxesValues = values.map((value) => {
    return (
      <div
        onClick={() => toggleSortByValues(value.value)}
        key={value.value}
        className="flex gap-2 items-center cursor-pointer text-violet-700"
      >
        <div>
          {state.role[value.value] ? (
            <IoRadioButtonOn />
          ) : (
            <IoRadioButtonOffOutline />
          )}
        </div>
        <div>
          <h2 className="text-violet-500">{value.label}</h2>
        </div>
      </div>
    );
  });

  const toggleSortByValues = (value) => {
    dispatch({
      type: SET_ROLE,
      role: value,
    });
  };

  return (
    <div className="border-b border-gray-200 pb-2  pr-4 ">
      <h2 className="font-semibold">Role</h2>
      <div className=" flex gap-4 flex-wrap">{checkboxesValues}</div>
    </div>
  );
}

export default RoleCheckBox;
