"use client";
import { useEffect, useRef, useState } from "react";
import { createCanvasScene } from "./canvas-scene";
import { createSceneMotion } from "./scene-motion";
export function SecurityScene() {
 const host=useRef<HTMLDivElement>(null);const [ready,setReady]=useState(false);
 useEffect(()=>{
  const current=host.current;if(!current)return;const element:HTMLDivElement=current;
  let cancelled=false,dispose:()=>void=()=>{};
  async function start(){
   try{
    const canvas=document.createElement("canvas");const context=canvas.getContext("webgl2",{alpha:true,antialias:true,powerPreference:"low-power"});
    if(!context){dispose=createCanvasScene(element,()=>setReady(true));return;}
    const THREE=await import("three");const {RoomEnvironment}=await import("three/addons/environments/RoomEnvironment.js");if(cancelled)return;
    const renderer=new THREE.WebGLRenderer({canvas,context,alpha:true,antialias:true,powerPreference:"low-power"});renderer.setPixelRatio(Math.min(devicePixelRatio,innerWidth<700?1:1.5));renderer.setClearColor(0x000000,0);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.6;element.appendChild(renderer.domElement);
    const scene=new THREE.Scene();const camera=new THREE.PerspectiveCamera(34,1,.1,40);camera.position.set(0,.08,6.5);
    const pmrem=new THREE.PMREMGenerator(renderer);const room=new RoomEnvironment();const environment=pmrem.fromScene(room,.04);scene.environment=environment.texture;room.dispose();pmrem.dispose();
    scene.add(new THREE.AmbientLight(0xbed3ee,1.3));
    const cyan=new THREE.PointLight(0x71e4eb,35,15);cyan.position.set(-3,1,3);scene.add(cyan);
    const warm=new THREE.PointLight(0xd3ffa2,26,15);warm.position.set(3,-1,2);scene.add(warm);
    const white=new THREE.DirectionalLight(0xffffff,4);white.position.set(0,4,3);scene.add(white);
    const sculpture=new THREE.Group();sculpture.rotation.set(.48,-.42,-.27);scene.add(sculpture);
    const layers:InstanceType<typeof THREE.Group>[]=[];const tracks:InstanceType<typeof THREE.LineLoop>[]=[];
    const geometries:InstanceType<typeof THREE.BufferGeometry>[]=[];const materials:InstanceType<typeof THREE.Material>[]=[];
    function point(t:number,v:number,r:number){const c=Math.cos(t),s=Math.sin(t);const x=Math.sign(c)*Math.pow(Math.abs(c),.65)*r,y=Math.sign(s)*Math.pow(Math.abs(s),.65)*r;const twist=t+.35*Math.sin(t*3);return new THREE.Vector3(x+v*Math.cos(t)*Math.cos(twist),y+v*Math.sin(t)*Math.cos(twist),.18*Math.sin(t*2)+v*Math.sin(twist));}
    [1.4,1.04,.68].forEach((radius,k)=>{
     const geom=new THREE.BufferGeometry(),positions:number[]=[],uvs:number[]=[],indices:number[]=[];const columns=180,rows=8,width=[.25,.18,.15][k];
     for(let i=0;i<=columns;i++){for(let j=0;j<=rows;j++){const p=point(i/columns*Math.PI*2,(j/rows-.5)*width*2,radius);positions.push(p.x,p.y,p.z);uvs.push(i/columns,j/rows);if(i<columns&&j<rows){const a=i*(rows+1)+j,b=a+rows+1;indices.push(a,b,a+1,b,b+1,a+1);}}}
     geom.setAttribute("position",new THREE.Float32BufferAttribute(positions,3));geom.setAttribute("uv",new THREE.Float32BufferAttribute(uvs,2));geom.setIndex(indices);geom.computeVertexNormals();geometries.push(geom);
     const mat=new THREE.MeshPhysicalMaterial({color:[0xa4bac0,0x728996,0xb6bfaa][k],metalness:.9,roughness:.2,clearcoat:1,clearcoatRoughness:.12,side:THREE.DoubleSide,envMapIntensity:1.45,iridescence:.7,iridescenceIOR:1.2,iridescenceThicknessRange:[80,230]});materials.push(mat);
     const layer=new THREE.Group();layer.rotation.set(k*.29,k*.31,k*.52);layer.add(new THREE.Mesh(geom,mat));
     [-1,1].forEach(side=>{const pts=Array.from({length:181},(_,i)=>point(i/180*Math.PI*2,side*width,radius));const edgeGeometry=new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts,true),180,.004,4,true);const edgeMaterial=new THREE.MeshBasicMaterial({color:k===1?0xd5fba7:0x8de8ee,transparent:true,opacity:.65});geometries.push(edgeGeometry);materials.push(edgeMaterial);layer.add(new THREE.Mesh(edgeGeometry,edgeMaterial));});sculpture.add(layer);layers.push(layer);
    });
    const trackMaterial=new THREE.LineBasicMaterial({color:0x81aaa8,transparent:true,opacity:.18});materials.push(trackMaterial);
    [1.95,2.22].forEach((r,k)=>{const pts=Array.from({length:120},(_,i)=>{const t=i/119*Math.PI*2;return new THREE.Vector3(Math.cos(t)*r,Math.sin(t)*r,0);});const g=new THREE.BufferGeometry().setFromPoints(pts);geometries.push(g);const ring=new THREE.LineLoop(g,trackMaterial);ring.rotation.set(1.2+k*.35,.3,0);scene.add(ring);tracks.push(ring);});
    let frame=0,last=0,inView=true;const preference=matchMedia("(prefers-reduced-motion: reduce)");const motion=createSceneMotion(element,preference);
    const resize=()=>{const b=element.getBoundingClientRect();renderer.setSize(b.width,b.height,false);camera.aspect=b.width/Math.max(1,b.height);camera.updateProjectionMatrix();render(performance.now());};
    function render(time:number){frame=0;if(cancelled)return;const elapsed=last>0?time-last:16.7;last=time;const pose=motion.update(elapsed);sculpture.rotation.set(pose.x,pose.y,pose.z);sculpture.position.y=pose.lift;layers.forEach((layer,k)=>{layer.rotation.z=k*.52+pose.layers[k];});tracks.forEach((ring,k)=>{ring.rotation.x=1.2+k*.35+Math.sin(pose.phase*.6+k)*.08;ring.rotation.z=pose.phase*.15*(k===0?1:-1);});renderer.render(scene,camera);if(!preference.matches&&inView&&!document.hidden)frame=requestAnimationFrame(render);}
    const resume=()=>{cancelAnimationFrame(frame);last=0;if(!document.hidden&&inView)frame=requestAnimationFrame(render);};
    const ro=new ResizeObserver(resize);ro.observe(element);const io=new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;resume();});io.observe(element);document.addEventListener("visibilitychange",resume);preference.addEventListener("change",resume);resize();resume();setReady(true);
    dispose=()=>{cancelAnimationFrame(frame);ro.disconnect();io.disconnect();motion.dispose();document.removeEventListener("visibilitychange",resume);preference.removeEventListener("change",resume);geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());environment.dispose();renderer.dispose();renderer.domElement.remove();};
   }catch{if(!cancelled)dispose=createCanvasScene(element,()=>setReady(true));}
  }void start();return()=>{cancelled=true;dispose();};
 },[]);
 return <div className={`security-scene ${ready?"scene-ready":""}`}><div className="scene-glow" aria-hidden="true"/><div className="scene-fallback" aria-hidden="true"><span/><span/><span/></div><div className="scene-canvas" ref={host} role="img" aria-label="3D security sculpture"/></div>;
}
