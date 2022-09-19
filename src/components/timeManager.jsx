import React from 'react'
import Clock from './clock';
import Timer from './timer';
import Chrono from './chrono';
import {useState , useEffect} from 'react'
import {v4 as uuidv4} from  'uuid'
import '../styles/timeManager.css'
import { DragDropContext , Droppable, Draggable} from '@hello-pangea/dnd';

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

    function createComponent(component ,index){
        if (component.type === "clock"){
                return (
                    <Draggable key={component.id}  draggableId={component.id} index={index}>
                        {(draggableProvided) => (
                        <div {...draggableProvided.draggableProps} ref={draggableProvided.innerRef} {...draggableProvided.dragHandleProps}>
                            <Clock component={component}  list={timeManagerList} refresh={setTimeManagerList} key={component.id}/>
                        </div>
                        )}
                    </Draggable>
                    )
            }else if(component.type === "timer"){
                return (
                    <Draggable key={component.id}  draggableId={component.id} index={index}>
                        {(draggableProvided) => (
                        <div {...draggableProvided.draggableProps} ref={draggableProvided.innerRef} {...draggableProvided.dragHandleProps}>
                            <Timer component={component}  list={timeManagerList} refresh={setTimeManagerList} key={component.id}/>
                        </div>
                        )}
                    </Draggable>
                    )
                
            }else{
                return (
                    <Draggable key={component.id}  draggableId={component.id} index={index}>
                        {(draggableProvided) => (
                        <div {...draggableProvided.draggableProps} ref={draggableProvided.innerRef} {...draggableProvided.dragHandleProps}>
                           <Chrono component={component}  list={timeManagerList} refresh={setTimeManagerList} key={component.id}/>
                        </div>
                        )}
                    </Draggable>
                    )
                return 
            }
        
    }

    const reorder = (list, startIndex ,endIndex) => {
        const result = [...list];
        const [removed] = result.splice(startIndex,1);
        result.splice(endIndex,0,removed)
        return result;
    }


    return(
        <div className='timeManager'>
            <DragDropContext onDragEnd={(result) => 
                {
                    const {source , destination} = result;
                    if(!destination){
                        return ;
                    }
                    if(
                        source.index === destination.index && source.droppableId === destination.droppableId
                    ){
                        return ;
                    }
                    setTimeManagerList( prevTask => reorder(prevTask ,source.index,destination.index))
                }
            }>
                <div className='timeManagerTittle'>
                    <p className='timeManagerTittleText' >Time</p>
                    <button className='timeManagerTittleButton' onClick={() => newComponent("clock")}>🕒</button>
                    <p>_</p>
                    <button className='timeManagerTittleButton' onClick={() => newComponent("timer")}>⌛</button>
                    <p>_</p>
                    <button className='timeManagerTittleButton' onClick={() => newComponent("chrono")}>⏱️</button>
                </div>
                <Droppable droppableId='timeManager'>
                    {(droppableProvided) => (
                    <div className='timeList' {...droppableProvided.droppableProps} ref={droppableProvided.innerRef}>
                        {timeManagerList.map( (componente ,index)  => createComponent(componente ,index) )  }
                        {droppableProvided.placeholder}
                    </div>
                    )}
                </Droppable>
                <p className='br'><br></br></p>
            </DragDropContext>
        </div>
    );

}


export default TimeManager;