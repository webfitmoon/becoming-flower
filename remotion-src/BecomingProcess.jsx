import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

const ink='#123f34', green='#007e70', muted='#6b8579';
const titles=['발견','정의','실행','연결'];
const subtitles=['경험 속에서 나만의 강점을','누구에게 어떤 도움을 줄지','내 언어로 쓰고 나누며','콘텐츠에서 신뢰와 기회로'];
const clamp={extrapolateLeft:'clamp',extrapolateRight:'clamp'};
const font='Pretendard, "Malgun Gothic", sans-serif';

function Scene({index,children}) {
  const frame=useCurrentFrame();
  return <AbsoluteFill style={{opacity:interpolate(frame,[index*90,index*90+12,index*90+82,index*90+90],[0,1,1,index===3?1:0],clamp),translate:`0px ${interpolate(frame,[index*90,index*90+18],[26,0],clamp)}px`}}>{children}</AbsoluteFill>;
}

function Discovery() {
  const frame=useCurrentFrame(); const {fps}=useVideoConfig();
  return <Scene index={0}>
    {[['해온 일',90,145],['나의 관점',480,150],['배운 것',85,390],['전문성',485,405]].map(([text,x,y],i)=><div key={text} style={{position:'absolute',left:interpolate(frame,[12+i*4,65],[x,290],clamp),top:interpolate(frame,[12+i*4,65],[y,270],clamp),opacity:interpolate(frame,[i*4,i*4+12,58,75],[0,1,1,0],clamp),padding:'22px 30px',background:'#fff',border:'1px solid #c8ded2',borderRadius:18,fontSize:30,color:ink,boxShadow:'0 10px 24px #163e3010'}}>{text}</div>)}
    <div style={{position:'absolute',left:220,top:210,width:280,height:280,borderRadius:140,border:'2px solid #7bb5a0',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',background:'#fff',scale:spring({frame:frame-40,fps,config:{damping:20}}),boxShadow:'0 18px 60px #007e7018'}}><svg width="62" height="62" viewBox="0 0 24 24" fill="none" stroke={green} strokeWidth="1.4"><circle cx="10" cy="10" r="6"/><path d="m15 15 5 5M10 7v6m-3-3h6"/></svg><div style={{fontSize:36,fontWeight:700,marginTop:18}}>나의 경험</div></div>
  </Scene>;
}

function Definition() {
  const frame=useCurrentFrame()-90;
  return <Scene index={1}>
    <div style={{position:'absolute',left:90,top:150,width:540,background:'#fff',border:'1px solid #b7d5c5',borderRadius:22,padding:36,boxShadow:'0 20px 60px #007e7012'}}>
      <div style={{fontSize:25,color:muted,letterSpacing:2}}>나의 브랜드 방향</div>
      {['누구에게?','어떤 도움을?'].map((text,i)=><div key={text} style={{marginTop:28,padding:'22px 26px',borderRadius:12,background:i?'#007e70':'#edf5ef',color:i?'#fff':ink,fontSize:34,fontWeight:650,opacity:interpolate(frame,[12+i*17,26+i*17],[0,1],clamp),translate:`${interpolate(frame,[12+i*17,26+i*17],[-24,0],clamp)}px 0px`}}>{text}<span style={{float:'right'}}>→</span></div>)}
      <div style={{fontSize:27,color:green,marginTop:30,opacity:interpolate(frame,[53,67],[0,1],clamp)}}>고객과 메시지를 정합니다.</div>
    </div>
  </Scene>;
}

function Execution() {
  const frame=useCurrentFrame()-180;
  const text='내가 겪은 일에서\n누군가에게 필요한 이야기로.';
  return <Scene index={2}>
    <div style={{position:'absolute',left:90,top:135,width:540,minHeight:370,background:'#fff',border:'1px solid #b7d5c5',borderRadius:24,padding:38,boxShadow:'0 20px 60px #007e7012'}}>
      <div style={{display:'flex',alignItems:'center',gap:16}}><div style={{width:52,height:52,borderRadius:26,background:green,color:'#fff',display:'grid',placeItems:'center',fontSize:28}}>B</div><strong style={{fontSize:27}}>나의 이야기</strong><span style={{marginLeft:'auto',fontSize:18,color:muted}}>콘텐츠 예시</span></div>
      <div style={{fontSize:34,lineHeight:1.8,fontWeight:600,whiteSpace:'pre-line',margin:'32px 0 28px',minHeight:122}}>{text.slice(0,Math.floor(interpolate(frame,[12,65],[0,text.length],clamp)))}<span style={{opacity:Math.floor(frame/8)%2 ? .1:1,color:green}}>│</span></div>
      <div style={{height:1,background:'#dce7df'}}/>
      <div style={{display:'flex',gap:22,marginTop:24,opacity:interpolate(frame,[62,75],[0,1],clamp)}}><svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke={green} strokeWidth="1.5"><path d="m12 21-8-8A5 5 0 0 1 12 5a5 5 0 0 1 8 8l-8 8Z"/></svg><svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke={green} strokeWidth="1.5"><path d="M21 11a8 8 0 0 1-8 8H5l-4 3V11a8 8 0 0 1 8-8h4a8 8 0 0 1 8 8Z"/></svg><span style={{fontSize:25,color:green}}>쓰고, 나누고, 대화합니다.</span></div>
    </div>
  </Scene>;
}

function Connection() {
  const frame=useCurrentFrame()-270;
  return <Scene index={3}>
    <svg width="720" height="650" style={{position:'absolute',inset:0}}>{[[140,180],[580,180],[140,460],[580,460]].map(([x,y],i)=><line key={i} x1="360" y1="320" x2={x} y2={y} stroke="#77b49c" strokeWidth="3" pathLength="1" strokeDasharray="1" strokeDashoffset={interpolate(frame,[12+i*8,38+i*8],[1,0],clamp)}/>)}</svg>
    <div style={{position:'absolute',left:250,top:210,width:220,height:220,borderRadius:110,background:green,color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:36,fontWeight:700,boxShadow:'0 18px 55px #007e7026'}}>나의 콘텐츠</div>
    {[[140,180,'공감'],[580,180,'신뢰'],[140,460,'고객'],[580,460,'협업']].map(([x,y,label],i)=><div key={label} style={{position:'absolute',left:x-65,top:y-65,width:130,height:130,borderRadius:65,background:'#fff',border:'2px solid #b1d2c0',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:8,opacity:interpolate(frame,[22+i*8,35+i*8],[0,1],clamp),scale:interpolate(frame,[22+i*8,35+i*8],[.7,1],clamp)}}><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={green} strokeWidth="1.5"><circle cx="12" cy="7" r="4"/><path d="M4 22v-3a8 8 0 0 1 16 0v3"/></svg><span style={{fontSize:26,fontWeight:650}}>{label}</span></div>)}
  </Scene>;
}

export function BecomingProcess() {
  const frame=useCurrentFrame(); const step=Math.min(3,Math.floor(frame/90));
  return <AbsoluteFill style={{background:'#edf5ef',fontFamily:font,color:ink,overflow:'hidden'}}>
    <div style={{position:'absolute',inset:0,background:'radial-gradient(circle at 65% 45%,#ffffff 0%,transparent 65%)'}}/>
    <div style={{position:'absolute',top:50,left:54,right:54,display:'flex',justifyContent:'space-between',alignItems:'center'}}><span style={{fontSize:19,letterSpacing:2,color:green,fontWeight:650}}>BECOMING</span><span style={{fontSize:20,color:muted}}>{String(step+1).padStart(2,'0')} / 04</span></div>
    <div style={{position:'absolute',top:108,left:54}}><div style={{fontSize:58,fontWeight:750,letterSpacing:-2}}>{titles[step]}</div><div style={{fontSize:27,color:muted,marginTop:12}}>{subtitles[step]}</div></div>
    <div style={{position:'absolute',left:0,top:150,width:720,height:650}}><Discovery/><Definition/><Execution/><Connection/></div>
    <div style={{position:'absolute',left:54,right:54,bottom:40,display:'flex',gap:12}}>{titles.map((title,i)=><div key={title} style={{flex:1,borderTop:`3px solid ${i<=step?green:'#c9ded0'}`,paddingTop:14,fontSize:23,fontWeight:i===step?750:500,color:i===step?green:muted}}>{title}</div>)}</div>
  </AbsoluteFill>;
}
