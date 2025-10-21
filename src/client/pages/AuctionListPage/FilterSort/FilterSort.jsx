import { useState } from "react";
import { MdOutlineCheckBoxOutlineBlank, MdOutlineCheckBox, MdCheckBox } from "react-icons/md";
import Categories from "./Categories";
import PriceRange from "./PriceRange";
import SortBy from "./SortBy";

function FilterSort({selectedCategories , setSelectedCategories }){
   return(
    <div>
        <Categories selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />
        <PriceRange/>
        <SortBy/>
    </div>
   )
}

export default FilterSort;