import React, { useState } from 'react'
import Input from '../components/input';
import Task from '../components/task';
import '../styles/taskManager.css'


function TaskManager(props){

    const [name , setName] = useState(props.list.name)

    function refreshName(ev) {

        setName(ev.target.value)
        const refreshedName = props.db.map(TM => {
            console.log(props.db)
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

    return(
        <div className='taskManager'>
            <div className='TM_controls'>
                <input onChange={ev => refreshName(ev)}  className='taskTittle' value={name}/>
                <button onClick={() => deleteTaskList()} className='taskCloseButton'>X</button>
            </div>
            <Input db={props.db} refresh={props.refresh} id_TM={props.list.id}/>
            {props.list.data.map( (task) => <Task task={task} id_TM={props.list.id} key={task.id} refresh={props.refresh} db={props.db}/>)}
        </div>
    );

}


export default TaskManager