import { useEffect, useRef, useState } from "react";

function Dropdown({options,placeholder, onSelect, selection}){
    const [isOpen, setIsOpen] = useState(false);
    
    const divRef=useRef();

    useEffect(()=>{
        const handler = (event)=>{
            if(!divRef.current.contains(event.target)){
                setIsOpen(false);
            }
        }
        document.addEventListener('click',handler,true);
        return ()=>{
            document.removeEventListener('click',handler,true);
        }
    },[])

    const handleSelectOption = (item) => {
        setIsOpen(false);
        onSelect(item);
    }
    const handleIsOpen = ()=>{
        setIsOpen(!isOpen);
    }

    const renderedItems=options.map((item)=>{
        return(
            <div onClick={()=>handleSelectOption(item)} key={item.value}>{item.label}</div>
        )
    })

    
    return(
        <div ref={divRef}>
            <div  onClick={handleIsOpen}> {selection ? selection.label:placeholder || 'Select...'}</div>
            {isOpen && <div>{renderedItems}</div>}
        </div>
    );
}

export default Dropdown;