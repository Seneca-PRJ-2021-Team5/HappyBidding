
import React, {useState, useRef, useEffect} from 'react';  //read react
import { withRouter } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import timeLimitClock from '../../img/clock.png';

function DisplayTimeLimit(props){ 
    const [timerDays, setTimerDays] = useState('00');
    const [timerHours, setTimerHours] = useState('00');
    const [timerMinutes, setTimerMinutes] = useState('00');
    const [timerSeconds, setTimerSeconds] = useState('00');

    const deadLineDate = new Date('2021-07-22 23:59:59').getTime();
    console.log(deadLineDate);
    let interval = useRef();
    const startTimer = () =>{
        interval = setInterval(()=>{
            const currentDate = new Date().getTime();
            const limitTime = deadLineDate - currentDate;
        
            const days  = Math.floor(limitTime / (1000*60*60*24));
            //HH
            const hour = Math.floor((limitTime % (1000 * 60 * 60)) / (1000*60*60));
            //MM
            const min = Math.floor((limitTime % (1000*60*60)) / (1000*60));
            //SS
            const sec = Math.floor((limitTime % (1000*60)) / (1000));
            if(limitTime < 0){
                clearInterval(interval.current)
            }else{
                setTimerDays(days)
                setTimerHours(hour)
                setTimerMinutes(min)
                setTimerSeconds(sec)
            }
        }, 1000);
    };

    useEffect(() =>{
        startTimer();
    });
    if(sessionStorage.getItem("userName")){
        return(
                <div id="TimeLimitScreen" class="border border-dark rounded">
                <p class="fs-2  top-margin-5">&ensp;<Image src={timeLimitClock} roundedCircle />&ensp;Time Remining</p>
                <div class="d-flex justify-content-center">
                    <section>
                        <p class="fs-1">&ensp;{timerDays}&ensp;{timerHours}&ensp;{timerMinutes}&ensp;{timerSeconds}</p>
                        <p>&ensp;Days&ensp;Hours&ensp;Minutes&ensp;Seconds</p>
                    </section>
                </div>
                
                </div>
        )
    }
    else{
        return(<>{props.history.push('/login')}</>) 
    }
}


export default DisplayTimeLimit;