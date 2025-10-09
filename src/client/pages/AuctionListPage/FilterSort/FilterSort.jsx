import { useState } from "react";
import { MdOutlineCheckBoxOutlineBlank, MdOutlineCheckBox, MdCheckBox } from "react-icons/md";
import Categories from "./Categories";
import PriceRange from "./PriceRange";

function FilterSort(){
   return(
    <div>
        <Categories/>
        <PriceRange/>
    </div>
   )
}

export default FilterSort;