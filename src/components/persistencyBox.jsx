import React from 'react'
import {useState , useEffect} from 'react'
import '../styles/persistencyBox.css'

function PersistencyBox(props){

    const [persistencyText , setPersistencyText] = useState(props.save)

    useEffect(() => {
        setPersistencyText(props.save)
      },[props.save])

    function changeText(){
        if(props.save === "sesion"){
            setPersistencyText("days")
            props.refresh("days")
            localStorage.setItem('persistency',"days");
        }else{
            setPersistencyText("Sesion")
            props.refresh("sesion")
            localStorage.setItem('persistency',"sesion");
        }
    }
    
    return(
        <div className='persistencyBox'>
            <span className='persistencyBoxText'>Tasks saved for <button className='persistencyBoxButton' onClick={ () => changeText()}>{persistencyText}</button> </span>
        </div>
    );

}


export default PersistencyBox