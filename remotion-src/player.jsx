import React,{useEffect,useRef} from 'react';
import {createRoot} from 'react-dom/client';
import {Player} from '@remotion/player';
import {BecomingProcess} from './BecomingProcess';

function ProcessPlayer() {
  const player=useRef(null);
  const container=useRef(null);
  useEffect(()=>{
    const motion=matchMedia('(prefers-reduced-motion: reduce)');
    let visible=false,hovered=false,handle,lastTime=null,elapsed=0,lastFrame=-1;
    const showFrame=frame=>{
      if(frame===lastFrame)return;
      lastFrame=frame;
      // Always use the initialized current handle, rather than its mount-time snapshot.
      player.current?.seekTo(frame);
      container.current.dataset.frame=String(frame);
      container.current.closest('.process-layout').dataset.currentStep=String(Math.min(3,Math.floor(frame/90)));
    };
    const stop=()=>{cancelAnimationFrame(handle);lastTime=null;};
    const tick=now=>{
      if(!visible||hovered||document.hidden||motion.matches){stop();return;}
      if(lastTime!==null)elapsed+=Math.min(now-lastTime,100);
      lastTime=now;
      showFrame((24+Math.floor(elapsed*30/1000))%360);
      handle=requestAnimationFrame(tick);
    };
    const resume=()=>{stop();if(visible&&!hovered&&!document.hidden&&!motion.matches)handle=requestAnimationFrame(tick);};
    showFrame(24);
    const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting&&entries[0].intersectionRatio>=.12;resume();},{threshold:[0,.12]});
    observer.observe(container.current);
    const enter=()=>{hovered=true;stop();};
    const leave=()=>{hovered=false;resume();};
    const onMotion=()=>{if(motion.matches){stop();showFrame(65);}else resume();};
    const target=container.current;
    target.addEventListener('mouseenter',enter);target.addEventListener('mouseleave',leave);
    document.addEventListener('visibilitychange',resume);motion.addEventListener('change',onMotion);
    return()=>{stop();observer.disconnect();target.removeEventListener('mouseenter',enter);target.removeEventListener('mouseleave',leave);document.removeEventListener('visibilitychange',resume);motion.removeEventListener('change',onMotion);};
  },[]);
  return <div ref={container} className="process-player-stage"><Player ref={player} component={BecomingProcess} durationInFrames={360} compositionWidth={720} compositionHeight={850} fps={30} controls={false} autoPlay={false} initiallyMuted loop={false} clickToPlay={false} initialFrame={24} style={{width:'100%',borderRadius:4,overflow:'hidden'}}/></div>;
}
const mount=document.getElementById('becoming-process-player');
if(mount)createRoot(mount).render(<ProcessPlayer/>);
