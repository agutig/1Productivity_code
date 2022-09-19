import React from 'react'
import TaskManager from './taskManager';
import {useState ,useEffect} from 'react'
import {v4 as uuidv4} from  'uuid'
import '../styles/taskManagerManager.css'
import { DragDropContext , Droppable, Draggable} from '@hello-pangea/dnd';;

function TaskManagerManager(props){

    const [taskManagerList ,setTaskManagerList] = useState(props.data);

    function addTaskManager() {
        const taskManager = {
			id: uuidv4(),
			data: [],
            name: "List Name",
        }
        setTaskManagerList([...taskManagerList ,taskManager])
    }

    useEffect(() => {
        setTaskManagerList(props.data)
    },[props.data])

    useEffect(() => {
        if(props.save === "days"){
            localStorage.setItem('TMM',JSON.stringify(taskManagerList));
        }
    },[taskManagerList ,  props.save])


    const reorder = (list, startIndex ,endIndex) => {
        const result = [...list];
        const [removed] = result.splice(startIndex,1);
        result.splice(endIndex,0,removed)
        return result;
    }


    return(
        <div className='taskManagerManager'>
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
                    setTaskManagerList( prevTask => reorder(prevTask ,source.index,destination.index))
                }
            }>
                <div className='TMMTitle'>
                    <p className='TMMTitleText'>Lists</p>
                    <button className='TMMTitleButton' onClick={() => addTaskManager()}>+</button>
                </div>
                <Droppable droppableId='taskManager'>
                    { (droppableProvided) => (
                        <div {...droppableProvided.droppableProps} ref={droppableProvided.innerRef}>
                            {taskManagerList.map( (taskManager ,index) => (
                                <Draggable key={taskManager.id}  draggableId={taskManager.id} index={index}>
                                    {(draggableProvided) => (
                                        <div {...draggableProvided.draggableProps} ref={draggableProvided.innerRef} {...draggableProvided.dragHandleProps}>
                                            <TaskManager list={taskManager} key={taskManager.id} id={taskManager.id} db={taskManagerList} refresh={setTaskManagerList}/>
                                        </div>
                                    )
                                    }
                                </Draggable>
                            ))  
                            }
                            <p className='br'><br></br></p>
                            {droppableProvided.placeholder}
                        </div>
                    )
                    }
                </Droppable>
            </DragDropContext>
        </div>
    );

}


export default TaskManagerManager