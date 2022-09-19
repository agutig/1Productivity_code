import React from 'react'
import '../styles/input.css'
import {useState} from 'react'
import {v4 as uuidv4} from  'uuid'
 
function Input(props){

    const [input ,getInput] = useState("");

    function createTask(text,db, refresh ,id){

        const refreshedTMM = db.map( taskManager => {

            if(id === taskManager.id){
                if (text !== ''){
                    let task = {
                        text : text,
                        completed: false,
                        id: uuidv4()
                    }
                    taskManager.data = [...taskManager.data,task]
                }
            }
            return taskManager;
        }
        );
        refresh(refreshedTMM)

    }

    return(

        <span className='inputBoxI'>
           <input className='inputBoxText' placeholder='Write a task!' type="text" value={input} onChange={ev => getInput(ev.target.value)}/> 
           <button className='inputBoxButton' onClick={() => createTask(input ,props.db ,props.refresh , props.id_TM)  }>+</button>
        </span>
    );
}


export default Input