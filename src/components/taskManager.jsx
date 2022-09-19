import React, { useState } from 'react'
import Input from '../components/input';
import Task from '../components/task';
import '../styles/taskManager.css'
import { DragDropContext , Droppable, Draggable} from '@hello-pangea/dnd';

function TaskManager(props){

    const [name , setName] = useState(props.list.name)

    function refreshName(ev) {

        setName(ev.target.value)
        const refreshedName = props.db.map(TM => {
            if(props.list.id === TM.id ) {
                TM.name = name;
            }
            return TM
        })
        props.refresh(refreshedName)
    }

    function deleteTaskList(){
        const refreshedTMM = props.db.filter( TaskManager => TaskManager.id !== props.id)
        props.refresh(refreshedTMM)
    }

    const reorder = (list, startIndex ,endIndex) => {
        const result = [...list];
        const [removed] = result.splice(startIndex,1);
        result.splice(endIndex,0,removed)
        return result;
    }

    return(
        <div className='taskManager'>
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
                    const refreshedList = props.db.map(TM => {
                        if(props.list.id === TM.id ) {
                           TM.data = reorder(TM.data ,source.index,destination.index)
                        }
                        return TM
                    })
                    props.refresh(refreshedList)
                    
                }}> 
                <div className='TM_controls'>
                    <input onChange={ev => refreshName(ev)}  className='taskTittle' value={name}/>
                    <button onClick={() => deleteTaskList()} className='taskCloseButton'>X</button>
                </div>
                <Input db={props.db} refresh={props.refresh} id_TM={props.list.id}/>
                <Droppable droppableId='task'>
                    {(droppableProvided) => (
                        <div {...droppableProvided.droppableProps} ref={droppableProvided.innerRef}>
                            {props.list.data.map( (task ,index) =>
                            <Draggable  key={task.id}  draggableId={task.id} index={index}>
                                {(draggableProvided) => (
                                <div  {...draggableProvided.draggableProps} ref={draggableProvided.innerRef} {...draggableProvided.dragHandleProps}>
                                    <Task task={task} id_TM={props.list.id} key={task.id} refresh={props.refresh} db={props.db}/>
                                </div>
                                )}
                            </Draggable>
                            )}
                            {droppableProvided.placeholder}
                        </div>    
                        
                    )}
                    </Droppable>
            </DragDropContext>
        </div>
    );

}


export default TaskManager