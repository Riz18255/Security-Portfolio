import {assetMap} from "@/lib/asset-map";
export function ToolLogo({name}:{name:string}){const asset=assetMap[name];return asset?<span className={`tool-logo ${asset.kind||""}`}><img src={`/logos/${asset.file}`} alt="" width="56" height="56" loading="lazy"/></span>:<span className="tool-wordmark" aria-hidden="true">{name==="John the Ripper"?"John":name==="Searchsploit"?"ExploitDB":name}</span>;}
