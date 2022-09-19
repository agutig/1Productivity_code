import React from 'react'
import Clock from './clock';
import Timer from './timer';
import Chrono from './chrono';
import {useState , useEffect} from 'react'
import {v4 as uuidv4} from  'uuid'
import '../styles/timeManager.css'

function TimeManager(props){

    const [timeManagerList ,setTimeManagerList] = useState(props.data);

    useEffect(() => {
        setTimeManagerList(props.data)
    },[props.data])

    useEffect(() => {
        if(props.save === "days"){
            localStorage.setItem('TimeManager',JSON.stringify(timeManagerList));
        }
    },[timeManagerList ,  props.save])

    function clock(){
        return {timeZone : 0}
    }

    function timer(){
        return {hours : 0 , minutes:0 , seconds: 0}
    }

    function newComponent(type){

        if(type === "clock"){
            const component = {
                type: type,
                id: uuidv4(),
                data: clock()
            }
            setTimeManagerList([component , ...timeManagerList])
        }else if(type === "timer"){
            const component = {
                type: type,
                id: uuidv4(),
                data: timer()
            }
            setTimeManagerList([component,...timeManagerList])
        }else {
            const component = {
                type: type,
                id: uuidv4(),
                data: []
            }
            setTimeManagerList([component,...timeManagerList])
        }
    }

    function createComponent(component){
        if (component.type === "clock"){
                return (<Clock component={component}  list={timeManagerList} refresh={setTimeManagerList} key={component.id}/>)
            }else if(component.type === "timer"){
                return <Timer component={component}  list={timeManagerList} refresh={setTimeManagerList} key={component.id}/>
            }else{
                return <Chrono component={component}  list={timeManagerList} refresh={setTimeManagerList} key={component.id}/>
            }
        
    }

    return(
        <div className='timeManager'>
            <div className='timeManagerTittle'>
                <p className='timeManagerTittleText' >Time</p>
                <button className='timeManagerTittleButton' onClick={() => newComponent("clock")}>🕒</button>
                <p>_</p>
                <button className='timeManagerTittleButton' onClick={() => newComponent("timer")}>⌛</button>
                <p>_</p>
                <button className='timeManagerTittleButton' onClick={() => newComponent("chrono")}>⏱️</button>
            </div>
            <div className='timeList'>
                {timeManagerList.map( (componente)  => createComponent(componente) )  }
            </div>
            <p className='br'><br></br></p>
        </div>
    );

}


export default TimeManager;