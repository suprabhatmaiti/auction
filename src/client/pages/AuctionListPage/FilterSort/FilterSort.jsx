import { useState } from "react";
import { MdOutlineCheckBoxOutlineBlank, MdOutlineCheckBox, MdCheckBox } from "react-icons/md";
import Categories from "./Categories";
import PriceRange from "./PriceRange";
import SortBy from "./SortBy";

function FilterSort(){
   return(
    <div>
        <Categories/>
        <PriceRange/>
        <SortBy/>
    </div>
   )
}

export default FilterSort;