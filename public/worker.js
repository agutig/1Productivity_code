import {useEffect} from 'react'

useEffect(() => {
    if(count >= 0 && !stopCount){
        let interval = setInterval(() => { setCount(count - 1)},1000)
        secondsToFormat()

        if (count === 1){
            new Audio(sound).play();
        }
        
        return(() => {
            clearInterval(interval)
        })

    }

},[count , stopCount, hours, minutes,seconds]);