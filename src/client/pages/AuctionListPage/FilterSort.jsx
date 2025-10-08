import { useState } from "react";
import { MdOutlineCheckBoxOutlineBlank,MdOutlineCheckBox, MdCheckBox } from "react-icons/md";


function FilterSort(){
    const [checkedCategories, setCheckedCategories] = useState({});

    const categories=[
        {id:'Antiques', label:'Antiques'},
        {id:'Electronics', label:'Electronics'},
        {id:'Vehicles', label:'Vehicles'},
        {id:'Art', label:'Art'},
        {id:'Jewelry', label:'Jewelry'},
        {id:'Collectibles', label:'Collectibles'},
    ]

    const toggleCategories = (id) => {
    setCheckedCategories((prev) => {
        return ({
            ...prev,
            [id]: !prev[id],
            })
    });
  };

    const renderedCategories = categories.map((category)=>{
        return(
            <div onClick={()=>toggleCategories(category.id)} key={category.id} 
                className="flex justify-start items-center px-2 cursor-pointer hover:shadow-sm rounded-lg  text-violet-600"
            >
                {checkedCategories[category.id]?<MdCheckBox/>:<MdOutlineCheckBoxOutlineBlank/>}
                <h2 className="text-gray-700">{category.label}</h2>
            </div>
        )
    })

    return(
        <div>
            <h2 className="font-bold text-xl mb-8">Filter & Sort</h2>
            <div>
                <h2 className="font-semibold ">Categories</h2>
                {renderedCategories}
            </div>
        </div>
    )
}

export default FilterSort;