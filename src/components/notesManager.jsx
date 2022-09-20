import {useState ,useEffect} from 'react'
import Note from './note';
import {v4 as uuidv4} from  'uuid'
import '../styles/notesManager.css'
import { DragDropContext , Droppable, Draggable} from '@hello-pangea/dnd';


function NotesManager(props){

    const [notesList , setNotesList] = useState(props.data);

    function addNote(){
        const newNote = {
            id : uuidv4(),
            text : "Write a note!"
        }
        
        setNotesList([...notesList,newNote])
        if(props.save === "days"){
            localStorage.setItem('notes',JSON.stringify([...notesList,newNote]));
        }
    }

    useEffect(() => {
        setNotesList(props.data)
    },[props.data])

    useEffect(() => {
        if(props.save === "days"){
            localStorage.setItem('notes',JSON.stringify(notesList));
        }
    },[notesList , props.save])

    const reorder = (list, startIndex ,endIndex) => {
        const result = [...list];
        const [removed] = result.splice(startIndex,1);
        result.splice(endIndex,0,removed)
        return result;
    }


    return(
        <div className='notesManager'>
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
                    setNotesList( prevTask => reorder(prevTask ,source.index,destination.index))
                }
            }>
            <div className='notesManagerTittle'>
                <p className='notesManagerText' >Notes</p>
                <button className='notesManagerButton' onClick={() => addNote()} > +</button>
            </div>
            <Droppable droppableId='notesManager'>
                {(droppableProvided) => (
                    <div {...droppableProvided.droppableProps} ref={droppableProvided.innerRef}>
                        {notesList.map((note ,index) => 
                            <Draggable key={note.id}  draggableId={note.id} index={index}>
                                {(draggableProvided) => (
                                    <div  {...draggableProvided.draggableProps} ref={draggableProvided.innerRef} {...draggableProvided.dragHandleProps}>
                                        <Note list={notesList} refresh={setNotesList} text={note.text} id={note.id} key={note.id} save={props.save}/>
                                    </div>
                                )}
                            </Draggable>
                            
                        )}
                        {droppableProvided.placeholder}
                    </div>
                )
                }
            </Droppable>
            <p className='br'><br></br></p>
            </DragDropContext>
        </div>
    );

}


export default  NotesManager;