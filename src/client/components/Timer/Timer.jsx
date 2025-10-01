import { useEffect, useState } from "react";
import { CgStopwatch } from "react-icons/cg";


function Timer({initialTime = 60 }){

    const [time, setTime] = useState(initialTime)
    const [isRunning,setIsRunning] = useState(true)

    const formatTime = (time) => {
        const hours = Math.floor(time/3600);
        const minutes = Math.floor((time%3600)/60);
        const seconds = time % 60;
        return `${hours.toString().padStart(2,'0')} : ${minutes.toString().padStart(2,'0')} : ${seconds.toString().padStart(2,'0')}`
    }

    useEffect (()=>{
        let timer;
       if(isRunning){
            timer = setInterval(()=>{
                setTime((prevTime)=>{
                    if(prevTime > 0){
                        return prevTime - 1;
                    }
                    setIsRunning(false);
                    return 0;
                })}
            ,1000)
       }

        return ()=> clearInterval(timer);

    },[time,isRunning])


    return(
        <div>
            <CgStopwatch/>
            {formatTime(time)}
        </div>
    )
}

export default Timer;