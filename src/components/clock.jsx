import React from 'react'
import {useState ,useEffect} from 'react'
import '../styles/clock.css'

function Clock(props){

    //Clock mechanism
    const [data,getData] = useState( new Date());

    useEffect(() => {
        setInterval(() => getData (new Date()), 1000);
    },[]);

    //


    // Date adaptation

    const [date,getDate] = useState({
        hour:"1",
        minutes: "2",
        seconds: "43",
        timezone: "LOCAL",
    });

    const [ubication,getUbication] = useState(props.component.location);
    
    const [activated,getActivated] = useState(true);

    useEffect(() => {

        let newDate = {
            hour:"1",
            minutes: "2",
            seconds: "43",
            timezone: "LOCAL",
        }

        switch(ubication){
            case 0:  //local
                
                newDate.hour = ("0" + data.getHours()).slice(-2)
                newDate.minutes = ("0" + data.getMinutes()).slice(-2)
                newDate.seconds = ("0" + data.getSeconds()).slice(-2)
                newDate.timezone = "LOCAL"
                getDate(newDate)
                break;

            case 1:  //TOKIO
                newDate.hour = ("0" + ((data.getUTCHours()+24 + 9) %  24  )).slice(-2)
                newDate.minutes = ("0" + data.getUTCMinutes()).slice(-2)
                newDate.seconds = ("0" + data.getUTCSeconds()).slice(-2)
                newDate.timezone = "TOKIO"
                getDate(newDate)
                break;

            case 2:  //BERLIN
                newDate.hour = ("0" + ((data.getUTCHours()+24 + 2) %  24  )).slice(-2)
                newDate.minutes = ("0" + data.getUTCMinutes()).slice(-2)
                newDate.seconds = ("0" + data.getUTCSeconds()).slice(-2)
                newDate.timezone = "BERLIN"
                getDate(newDate)
            break;

            case 3:  //New York
                newDate.hour = ("0" + ((data.getUTCHours()+24 -4) %  24  )).slice(-2)
                newDate.minutes = ("0" + data.getUTCMinutes()).slice(-2)
                newDate.seconds = ("0" + data.getUTCSeconds()).slice(-2)
                newDate.timezone = "NY"
                getDate(newDate)
            break;

            case 4:  //PEKIN
                newDate.hour = ("0" + ((data.getUTCHours()+24 + 8) %  24  )).slice(-2)
                newDate.minutes = ("0" + data.getUTCMinutes()).slice(-2)
                newDate.seconds = ("0" + data.getUTCSeconds()).slice(-2)
                newDate.timezone = "BEIJING"
                getDate(newDate)
            break;

            case 5:  // CLOSE 
                closeClock()
            break;

            default:
                newDate.hour = ("0" + data.getHours()).slice(-2)
                newDate.minutes = ("0" + data.getMinutes()).slice(-2)
                newDate.seconds = ("0" + data.getSeconds()).slice(-2)
                newDate.timezone = "LOCAL"
                getDate(newDate)
                break;

        }
        // Algortimo de calculo zona horaria console.log((1 +(24 + offset)) % 24)
    },[data ,ubication]);


    function secondsVisualitation(){
        if(activated === true){ 
            return(<p className='seconds'> { date.seconds} </p>)
        }else{ 
            return(<p className='seconds'> △ </p>)}
    }

    function closeClock(){
        let refreshedList = props.list.filter( listClock => listClock.id !== props.component.id)
        props.refresh( refreshedList)
        
    }

    return(
        
        <div className='clockContainer'>
            <p className='ubText'>{date.timezone}</p>
            <div className='clockBody'>
                <p className='hourMin'>{ date.hour + ":" + date.minutes}</p>
                <div className='secDiv'>
                    <button onClick={() => getActivated(!activated)} className='secButton'>Sec</button>
                    {secondsVisualitation()}
                </div>
            </div>
            <div className='clockConf'>
                <span>
                    <button  className='confButton' onClick={() => getUbication(0)} >LOCAL</button>
                    <button className='confButton' onClick={() => getUbication(5)} >X</button>
                </span>
                <span>
                    <button className='confButton' onClick={() => getUbication(1)}>TOKIO</button>
                    <button className='confButton' onClick={() => getUbication(2)}>BERLIN</button>
                </span>
                <span>
                    <button className='confButton' onClick={() => getUbication(3)}>NY</button>
                    <button className='confButton' onClick={() => getUbication(4)}>BEIJING</button>
                </span>
                

            </div>
            
        </div>
    );

}


export default Clock;