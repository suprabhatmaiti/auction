import Dropdown from "../components/Dropdown/Dropdown";
import {useState} from 'react';

function DropdownPage(){
    const [selection,setSelection] = useState(null);

    const options = [
        {label:'Male',value:'male'},
        {label:'Female', value:'female' },
        {label:'Others', value:'others' },

    ]
    return(
        <div className="min-h-screen">
            <div>
                <Dropdown options={options} placeholder='Select Gender' onSelect={setSelection} selection={selection}/>
            </div>
        </div>
    );
}

export default DropdownPage;