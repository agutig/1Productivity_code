import React from 'react'
import {useState ,useEffect} from 'react'
import '../styles/timer.css'
import sound from '../assets/sound_notification.mp3'


function Timer(props){


    const [count , setCount] = useState(0);

    const [deadline, setDeadline] = useState(Math.trunc(new Date().getTime() /1000));
    const [date, setDate] = useState(Math.trunc(new Date().getTime() /1000));

    const [ hours , setHours] = useState(0);
    const [ minutes , setMinutes] = useState(0);
    const [ seconds , setSeconds] = useState(0);

    const [ stopCount , setStopCount] = useState(false);
    const [format , setFormat] = useState({hour: "00" , minutes: "00" , seconds: "00"});


    useEffect(() => {
 
        let magic = Math.trunc((deadline) - (date)) 
        console.log(magic)
        console.log(stopCount)

        if(magic >= 0 && !stopCount){
            console.log("pene")
            let interval = setInterval(() => { setCount(magic) },1000)
            secondsToFormat()
            setDate(Math.trunc(new Date().getTime() /1000))

            if (magic === 1){
                let not = new Audio(sound);
                not.pause();
                not.currentTime = 0;   
                not.play();
            }
            
            return(() => {
                clearInterval(interval)
            })

        }

    },[count ,deadline, date , stopCount, hours, minutes,seconds]);


    function formatToSeconds(hours, minutes, seconds){
        return (parseInt(hours)*3600 + parseInt(minutes)*60 + parseInt(seconds))
    }

    function secondsToFormat(){
        let hour = Math.trunc(count/3600)
        let minutes =  Math.trunc((count - hour*3600)/60)
        let seconds = Math.trunc((count - (hour*3600 + minutes*60))) 
        setFormat({hour: ("0"+hour).slice(-2) , minutes: ("0" + minutes).slice(-2) , seconds: ("0"+seconds).slice(-2)})
    }

    function startTimer(){
        
        let timeToStop = formatToSeconds(hours,minutes,seconds)
        let actual = Math.trunc (new Date().getTime() / 1000)
        setDeadline(actual + timeToStop)
        setDate(actual)
        secondsToFormat()
    }

    function pauseTimer(){
        startTimer()
        let actual = Math.trunc (new Date().getTime() / 1000)
        setDate(actual)
        setDeadline(actual + count-1) 
        setStopCount(!stopCount)
        
    }

    function stopTimer(){

        if (stopCount){
            return(<button className='buttonBoxButton' onClick={() => pauseTimer()}>Resume timer</button>);
        }else{
            return(<button className='buttonBoxButton' onClick={() => pauseTimer()}>Stop timer</button>);
        }
    }

    function closeTimer(){
        let refreshedList = props.list.filter( listClock => listClock.id !== props.component.id)
        props.refresh( refreshedList)
    }

    return(
        <div className='fullContainer'>
            
            <div className='inputTimeBox'>
                <div className='timeSelectorBox'>
                    <p className='timeSelectorText'>Hours</p>
                    <input type='number' min="0" placeholder='00' className='inputTime' onChange={ev => setHours(ev.target.value)}/>
                </div>

                <div className='timeSelectorBox'>
                    <p className='timeSelectorText'>Minutes</p>
                    <input type='number' min="0" placeholder='00' className='inputTime'  onChange={ev => setMinutes(ev.target.value)}/>
                </div>

                <div className='timeSelectorBox'>
                    <p className='timeSelectorText'>Seconds</p>
                    <input type='number' min="0" step="1" placeholder='00' className='inputTime'  onChange={ev => setSeconds(ev.target.value)}/>
                </div>

                <div className='buttonsBox'>
                    <button className='buttonBoxButton' onClick={() => startTimer()}>Start timer</button>
                    {stopTimer()}
                    <button className='buttonBoxButton' onClick={() => closeTimer()}>X</button>
                </div>
                
            </div>

            <div className='timerContainer'>
                <p className='clockText'>{format.hour + ":" + format.minutes + ":" + format.seconds}</p>
                
            </div>

            <p className='br'><br></br></p>

        </div>
    );

}


export default Timer;