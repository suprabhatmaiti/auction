import { useState } from "react";
import { MdCheckBox, MdOutlineCheckBoxOutlineBlank } from "react-icons/md";

function Categories(){
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
                className="flex justify-start items-center cursor-pointer hover:shadow-sm rounded-lg  text-violet-600"
            >
                {checkedCategories[category.id]?<MdCheckBox/>:<MdOutlineCheckBoxOutlineBlank/>}
                <h2 className="text-gray-700">{category.label}</h2>
            </div>
        )
    })

    return(
        <div className="border-b border-gray-200 pb-2">
            <h2 className="font-bold text-xl mb-8">Filter & Sort</h2>
            <div>
                <h2 className="font-semibold ">Categories</h2>
                {renderedCategories}
            </div>
        </div>
    )
}

export default Categories;