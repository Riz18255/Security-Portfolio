import { createSceneMotion } from "./scene-motion";
type Point = [number, number, number];
type Face = { vertices: Point[]; edge: boolean; layer: number };

// A software renderer keeps the spatial sculpture available when WebGL is disabled.
export function createCanvasScene(host: HTMLDivElement, onReady: () => void) {
 const canvas=document.createElement('canvas'),ctx=canvas.getContext('2d');
 if(!ctx)return()=>{};
 host.appendChild(canvas);
 const preference=matchMedia('(prefers-reduced-motion: reduce)');
 const motion=createSceneMotion(host,preference);
 let width=1,height=1,frame=0,last=0,inView=true,disposed=false;
 function rotate([x,y,z]:Point,rx:number,ry:number,rz:number):Point {
  const y1=y*Math.cos(rx)-z*Math.sin(rx),z1=y*Math.sin(rx)+z*Math.cos(rx);
  const x2=x*Math.cos(ry)+z1*Math.sin(ry),z2=-x*Math.sin(ry)+z1*Math.cos(ry);
  return[x2*Math.cos(rz)-y1*Math.sin(rz),x2*Math.sin(rz)+y1*Math.cos(rz),z2];
 }
 function point(t:number,v:number,r:number):Point {
  const c=Math.cos(t),s=Math.sin(t),twist=t+.35*Math.sin(t*3);
  return[Math.sign(c)*Math.pow(Math.abs(c),.65)*r+v*c*Math.cos(twist),Math.sign(s)*Math.pow(Math.abs(s),.65)*r+v*s*Math.cos(twist),.18*Math.sin(t*2)+v*Math.sin(twist)];
 }
 const faces:Face[]=[],edges:Point[][]=[];
 [1.4,1.04,.68].forEach((radius,k)=>{
  const band=[.25,.18,.15][k],segments=220,rows=3;
  const p=(i:number,j:number)=>rotate(point(i/segments*Math.PI*2,(j/rows-.5)*2*band,radius),k*.29,k*.31,k*.52);
  for(let i=0;i<segments;i++)for(let j=0;j<rows;j++)faces.push({vertices:[p(i,j),p(i+1,j),p(i+1,j+1),p(i,j+1)],edge:j===0||j===rows-1,layer:k});
  edges.push(Array.from({length:segments+1},(_,i)=>p(i,0)),Array.from({length:segments+1},(_,i)=>p(i,rows)));
 });
 const project=([x,y,z]:Point):[number,number]=>{const scale=Math.min(width,height)*1.68/(6.5-z);return[width*.5+x*scale,height*.51-y*scale];};
 function render(time:number){
  frame=0;if(disposed)return;
  const elapsed=last>0?time-last:16.7;last=time;
  const pose=motion.update(elapsed);
  const {x:rx,y:ry,z:rz,phase}=pose;
   const transform=(p:Point,layer:number):Point=>{const [x,y,z]=rotate(rotate(p,0,0,pose.layers[layer]),rx,ry,rz);return[x,y+pose.lift,z];};
   ctx!.clearRect(0,0,width,height);
   const ring=(radius:number,tilt:number)=>{ctx!.beginPath();for(let i=0;i<=120;i++){const t=i/120*Math.PI*2;const p=project(rotate([Math.cos(t)*radius,Math.sin(t)*radius,0],tilt+Math.sin(phase*.6)*.08,.3,phase*.15));if(i===0)ctx!.moveTo(...p);else ctx!.lineTo(...p);}ctx!.strokeStyle='rgba(129,170,168,.16)';ctx!.lineWidth=.6;ctx!.stroke();};
   ring(1.95,1.2);ring(2.22,1.55);
   const transformed=faces.map(face=>{const vertices=face.vertices.map(p=>transform(p,face.layer));return{vertices,depth:vertices.reduce((s,p)=>s+p[2],0)/4,layer:face.layer};}).sort((a,b)=>a.depth-b.depth);
   for(const face of transformed){
    const a=face.vertices[0],b=face.vertices[1],c=face.vertices[3],u=b.map((v,i)=>v-a[i]),v=c.map((n,i)=>n-a[i]);
    let nx=u[1]*v[2]-u[2]*v[1],ny=u[2]*v[0]-u[0]*v[2],nz=u[0]*v[1]-u[1]*v[0];const len=Math.hypot(nx,ny,nz)||1;nx/=len;ny/=len;nz/=len;if(nz<0){nx=-nx;ny=-ny;nz=-nz;}
    const reflectY=2*ny*nz,reflectX=2*nx*nz;
    const strip=Math.exp(-Math.pow((reflectY-.55)*5,2)),side=Math.exp(-Math.pow((reflectX+.65)*4,2));
    const light=.1+.18*nz+.7*strip+.35*side;
    const lime=face.layer===1;
    const red=Math.min(245,22+light*180+(lime?12:0)),green=Math.min(250,38+light*182),blue=Math.min(250,43+light*182-(lime?12:0));
    ctx!.beginPath();face.vertices.forEach((p,i)=>{const screen=project(p);if(i===0)ctx!.moveTo(...screen);else ctx!.lineTo(...screen);});ctx!.closePath();ctx!.fillStyle=`rgb(${red|0} ${green|0} ${blue|0})`;ctx!.fill();ctx!.strokeStyle=ctx!.fillStyle;ctx!.lineWidth=.6;ctx!.stroke();
   }
   edges.forEach((edge,k)=>{ctx!.beginPath();edge.forEach((p,i)=>{const screen=project(transform(p,Math.floor(k/2)));if(i===0)ctx!.moveTo(...screen);else ctx!.lineTo(...screen);});ctx!.strokeStyle=k===2||k===3?'rgba(211,244,164,.48)':'rgba(154,230,233,.44)';ctx!.lineWidth=.75;ctx!.stroke();});
   if(!preference.matches&&inView&&!document.hidden)frame=requestAnimationFrame(render);
  }
  const resume=()=>{cancelAnimationFrame(frame);last=0;if(!document.hidden&&inView)frame=requestAnimationFrame(render);};
 const resize=()=>{const box=host.getBoundingClientRect(),dpr=Math.min(devicePixelRatio,innerWidth<700?1:1.5);width=box.width;height=box.height;canvas.width=width*dpr;canvas.height=height*dpr;ctx!.setTransform(dpr,0,0,dpr,0,0);last=0;render(performance.now());};
 const ro=new ResizeObserver(resize),io=new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;resume();});ro.observe(host);io.observe(host);document.addEventListener('visibilitychange',resume);preference.addEventListener('change',resume);resize();resume();onReady();
 return()=>{disposed=true;cancelAnimationFrame(frame);ro.disconnect();io.disconnect();motion.dispose();document.removeEventListener('visibilitychange',resume);preference.removeEventListener('change',resume);canvas.remove();};
}
