import React, { useEffect, useState } from 'react';
import  Alarm from '../Alarm.mp3'
const Promodoro= () => {

    const [time,setTime] = useState(10)
    const [isActive,setIsActive] = useState(false)
    const[userInput,setUserInput] = useState('')
    const sound = new Audio(Alarm)

    const updateTime = ()=>{
        if(time>0 && isActive){
            setTime((prev)=>prev-1)
        }
    }

    const extractMinutes = ()=>{
        const currentTime = time
        const CurrentMinutes = Math.floor(currentTime/60)
        return CurrentMinutes
    }

    const extractSeconds = ()=>{
        const currentTime = time
        const CurrentSeconds = currentTime%60
        return CurrentSeconds
    }

    const onchangeHandler = (e)=>{
        setIsActive(false)
        setUserInput(e.target.value)
     
    }
    

    const customTimeHandler = ()=>{
        const value = parseInt(userInput)
        setTime(value)
    }
    useEffect(()=>{
       const intervalId =  setInterval(updateTime,1000)
        if(time===0){
            sound.play()
            setIsActive(false)
            setTime(10)
        }
       return ()=>{
        clearInterval(intervalId)
       }

    },[time,isActive])
  return (
    <div className='timer'>
                <h1 className='num'>{`${extractMinutes()}:${extractSeconds()}`}</h1>
        <button  className='btn1' onClick={()=>setIsActive(true)}>Start</button>
        <button  className='btn2' onClick={()=>setIsActive(false)}>Pause</button>
        <button  className='btn3'onClick={customTimeHandler}>setCustomTime</button>
       
        <input className='input'  onChange={onchangeHandler} name='userInput'  type='number' value={userInput}/>
    </div>
  );
}

export default Promodoro;