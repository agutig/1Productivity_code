import './App.css';
import PersistencyBox from './components/persistencyBox';
import TaskManagerManager from './components/taskManagerManager';
import NotesManager from './components/notesManager';
import {useState ,useEffect} from 'react'
import TimeManager from './components/timeManager';

function App() {

  /*
  If by any reason you are reading the code of this proyect im sorry to inform you that the data managing is 
  structured using a lot of react bad practices. This is because the main reason of this proyect is pracitcing and understanding 
  better this library and the posible combination with other libraries (redux)
  */
  const [tittle,getTittle] = useState("Proyect Name");

  const [save,getSave] = useState("sesion");
  const [notes,getNotes] = useState([]);
  const [TMM,getTMM] = useState([]); //TMM = Task manager manager
  const [timeManager,getTimeManager] = useState([]); //TMM = Task manager manager

  useEffect(() => {
    let persistency = localStorage.getItem('persistency');
    if (persistency !== null){
      getSave(persistency)
      if(persistency === "days"){
        getNotes( JSON.parse(localStorage.getItem('notes')))
        getTMM(JSON.parse(localStorage.getItem('TMM')))
        getTimeManager(JSON.parse(localStorage.getItem('timeManager')))
        getTittle(localStorage.getItem('tittle'))
      }
       
    }
    
    
  },[])

  function saveTittle(ev){
    getTittle(ev.target.value)
    if(save === "days"){
      localStorage.setItem('tittle',ev.target.value);
  }
  }


  return (
    <div className="App">

      <div className='mainTittle'>
        <input type='text' value={tittle} onChange={ev => saveTittle(ev)} className='tittle' />
        <h3 className='subtittle'><em> &nbsp; &nbsp; &nbsp; by agutig.github</em></h3>
      </div>

      <div className='mainBox'>
        <div className='subBox1'>
          <div className='timeBox'>
              <TimeManager data={timeManager} save={save}></TimeManager>
          </div>
        </div>

        
        <div className='subBox2'>
            <TaskManagerManager data={TMM} save={save}/>
        </div>


        <div className='subBox3'>
          <NotesManager data={notes} save={save}></NotesManager>
        </div>
      
      </div>
      
      <footer>
          <PersistencyBox save={save} refresh={getSave}/>
          <p className='versionText'>V: 1.0.0 | 2022 | ▯ ↷ ▭ for mobile</p>
      </footer>
      
    </div>
  );
}

export default App;
