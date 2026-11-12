import React,{useEffect,useRef,useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Player} from '@remotion/player';
import {BecomingProcess} from './BecomingProcess';

function ProcessPlayer() {
  const player=useRef(null); const container=useRef(null);
  const [playing,setPlaying]=useState(false);
  useEffect(()=>{
    const current=player.current;
    const motion=matchMedia('(prefers-reduced-motion: reduce)');
    const onPlay=()=>setPlaying(true); const onPause=()=>setPlaying(false);
    const onFrame=event=>{
      const step=Math.min(3,Math.floor(event.detail.frame/90));
      container.current.closest('.process-layout').dataset.currentStep=String(step);
    };
    current.addEventListener('play',onPlay); current.addEventListener('pause',onPause);current.addEventListener('ended',onPause);current.addEventListener('frameupdate',onFrame);
    let started=false;
    const observer=new IntersectionObserver(entries=>{
      if(entries[0].isIntersecting){
        if(!started){started=true;if(motion.matches){current.seekTo(359);}else current.play();}
      }else current.pause();
    },{threshold:.45});
    observer.observe(container.current);
    const onMotion=()=>{if(motion.matches){current.pause();current.seekTo(359);}};
    motion.addEventListener('change',onMotion);
    return()=>{observer.disconnect();motion.removeEventListener('change',onMotion);current.removeEventListener('play',onPlay);current.removeEventListener('pause',onPause);current.removeEventListener('ended',onPause);current.removeEventListener('frameupdate',onFrame);};
  },[]);
  return <div ref={container}>
    <Player ref={player} component={BecomingProcess} durationInFrames={360} compositionWidth={720} compositionHeight={850} fps={30} controls={false} autoPlay={false} loop={false} clickToPlay={false} style={{width:'100%',borderRadius:8,overflow:'hidden'}}/>
    <div className="process-player-controls"><span>발견에서 연결까지 · 12초</span><button type="button" onClick={()=>{if(playing){player.current.pause();}else{if(player.current.getCurrentFrame()>=359)player.current.seekTo(0);player.current.play();}}}>{playing?'잠시 멈추기':'다시 보기'} <span aria-hidden="true">{playing?'Ⅱ':'↻'}</span></button></div>
  </div>;
}

const mount=document.getElementById('becoming-process-player');
if(mount) createRoot(mount).render(<ProcessPlayer/>);
