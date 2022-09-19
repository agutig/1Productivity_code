import React from 'react'
import {useState ,useEffect} from 'react'
import '../styles/chrono.css'

function Chrono(props){


    const [count , setCount] = useState(0);

    const [pauseDelay , setpauseDelay ] = useState(0);

    const [date , setDate] = useState(Date.now());

    const [ stopCount , setStopCount] = useState(true);
    const [format , setFormat] = useState({hour: "00" , minutes: "00" , seconds: "00" ,mSeconds:"00"});


    useEffect(() => {
        
        if(!stopCount){
            let interval = setInterval(() => { setCount(pauseDelay + (Date.now() - date))},100)
            secondsToFormat()
            
            return(() => {
                clearInterval(interval)
            })

        }

    },[count , stopCount]);


    function secondsToFormat(){
        let milliseconds = parseInt((count % 1000) / 100)
        let seconds = Math.floor((count / 1000) % 60)
        let minutes = Math.floor((count / (1000 * 60)) % 60)
        let hours = Math.floor((count / (1000 * 60 * 60)) % 24)
        setFormat({hour: ("0"+hours).slice(-2) , minutes: ("0" + minutes).slice(-2) , seconds: ("0"+seconds).slice(-2)})
    }

    function pauseChrono(){
        setDate(Date.now())
        setpauseDelay(count)
        setStopCount(!stopCount)
    }


    function stopChrono(){
        
        if (stopCount){
            return(<button className='chronoButton' onClick={() => pauseChrono()}>▶</button>);
        }else{
            return(<button className='chronoButton' onClick={() => pauseChrono()}>| |</button>);
        }
    }

    function resetChrono(){
        setDate(Date.now())
        setCount(0)
        secondsToFormat()

    }

    
    function closeChrono(){
        let refreshedList = props.list.filter( listClock => listClock.id !== props.component.id)
        props.refresh( refreshedList)
    }
    

    return(
        <div className='chronoBox'>
                <p className='chonoText'>{format.hour + ":" + format.minutes + ":" + format.seconds }</p>
                {stopChrono()}
                <button className='chronoButton' onClick={() =>  resetChrono()}>◼</button>
                <button className='chronoButton' onClick={() =>  closeChrono()}>X</button>
        </div>
    );

}


export default Chrono;