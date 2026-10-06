"use client";
import {useState} from "react";
import {Download,MapPin,Plus,Check,Copy,Terminal,GraduationCap,BookOpen,ChevronDown} from "lucide-react";
import {Tabs,TabsList,TabsTrigger,TabsContent} from "@/components/ui/tabs";
import {Accordion,AccordionItem,AccordionTrigger,AccordionContent} from "@/components/ui/accordion";
import {PortfolioHeader} from "@/components/portfolio-header";
import {PortfolioMotion} from "@/components/portfolio-motion";
import {SecurityScene} from "@/components/security-scene";
import {ProjectVisual} from "@/components/project-visual";
import {Arsenal} from "@/components/arsenal";
import {Github,Linkedin} from "@/components/social-icons";
import {allWork,workAreas,github,linkedin,cv} from "@/lib/portfolio-data";

function External({href,children,className=""}:{href:string;children:React.ReactNode;className?:string}){return <a href={href} className={className} target="_blank" rel="noopener noreferrer">{children}</a>;}
function Heading({number,label,title,text}:{number:string;label:string;title:string;text?:string}){return <div className="section-heading reveal"><div><p className="eyebrow"><span>/{number}</span> {label}</p><h2>{title}</h2></div>{text&&<p>{text}</p>}</div>;}

const domains=[{title:"Offensive security",text:"Controlled assessments of identity, network services, and web applications.",tags:["Active Directory","Web testing","Vulnerability assessment"]},{title:"Detection & investigation",text:"Connecting endpoint and network evidence to a defensible investigation.",tags:["SIEM & telemetry","Traffic analysis","Digital forensics"]},{title:"Security engineering",text:"Building detection pipelines and securing how applications are delivered.",tags:["Python & automation","DevSecOps","Cloud lab practice"]}];
const curriculum=[{name:"Security & investigations",courses:["Penetration Testing & Lab","Web Application Security & Lab","Digital Forensics & Lab","Vulnerability Assessment & Reverse Engineering & Lab","IoT Security","Cryptography & Lab","Network Security & Lab","Information Security","Information Assurance"]},{name:"Software & systems",courses:["Programming Fundamentals & Lab","Object Oriented Programming & Lab","Data Structures & Algorithms & Lab","Design and Analysis of Algorithms","Operating Systems & Lab","Computer Networks & Lab","Database Systems & Lab","Software Engineering","Secure Software Design and Development & Lab"]},{name:"Computing foundations",courses:["Artificial Intelligence & Lab","Parallel and Distributed Computing & Lab","Computer Organization and Assembly Language & Lab","Digital Logic Design & Lab","Discrete Structures","Linear Algebra","Probability and Statistics","Calculus & Analytical Geometry","Differential Equations"]},{name:"Communication & professional practice",courses:["Technical & Business Writing","Professional Practices","Management Information System","Entrepreneurship","Principles of Marketing","English Comprehension and Composition","Foreign Language: French","Social Service"]}];

export default function Home(){
  const [area,setArea]=useState("All work");
  const [expandedProject,setExpandedProject]=useState<string|null>(null);
  const [copied,setCopied]=useState(false);
  const [copyFailed,setCopyFailed]=useState(false);

  async function copy(){try{await navigator.clipboard.writeText("ansariahmed408@gmail.com");setCopied(true);setCopyFailed(false);setTimeout(()=>setCopied(false),2500);}catch{setCopyFailed(true);}}

  return (
    <>
      <div className="site-atmosphere" aria-hidden="true"/>
      <PortfolioHeader/>
      <PortfolioMotion/>
      <main id="main">
        <section className="hero shell" aria-labelledby="hero-title">
          <div className="hero-topline">
            <span className="terminal-prompt"><Terminal size={15}/><span>riaz@portfolio</span><b>:~$</b> whoami</span>
            <span><MapPin size={14}/>ISLAMABAD, PK</span>
          </div>
          <div className="hero-main">
            <div className="hero-copy">
              <p className="hero-kicker">OFFENSE INFORMED. DEFENSE ENGINEERED.</p>
              <h1 id="hero-title">Riaz Ahmed<br/><span>Ansari<span className="name-dot">.</span></span></h1>
              <p className="hero-description">I explore attack paths, investigate the evidence, and build systems that make security work.</p>
              <div className="hero-actions">
                <a href="#work" className="button primary"><BookOpen size={17}/>Explore my work</a>
                <a href={cv} download className="button secondary"><Download size={17}/>Download CV</a>
              </div>
              <div className="hero-social">
                <External href={github}><Github size={19}/>GitHub</External>
                <External href={linkedin}><Linkedin size={19}/>LinkedIn</External>
              </div>
            </div>
            <div className="hero-stage">
              <SecurityScene/>
              <div className="stage-label stage-top"><span>01 / OFFENSE</span><b>Understand the path.</b></div>
              <div className="stage-label stage-middle"><span>02 / INVESTIGATION</span><b>Follow the evidence.</b></div>
              <div className="stage-label stage-bottom"><span>03 / ENGINEERING</span><b>Build the control.</b></div>
              <div className="scene-axis" aria-hidden="true"><span>X</span><span>Y</span><span>Z</span></div>
            </div>
          </div>
          <div className="hero-bottom">
            <p>Cybersecurity graduate<small>Air University · 2026</small></p>
            <div className="hero-areas"><span>RED TEAM</span><span>BLUE TEAM</span><span>DEVSECOPS</span><span>CLOUD</span></div>
            <a href="#work" className="scroll-link">SCROLL TO EXPLORE<span/></a>
          </div>
        </section>

        <section id="work" className="section shell">
          <Heading number="01" label="SELECTED WORK" title="Paths. Evidence. Systems." text="Projects, controlled labs, and coursework. Each case study explains the challenge, my contribution, and what I learned."/>
          <Tabs value={area} onValueChange={(val)=>{setArea(val);setExpandedProject(null);}}>
            <div className="filter-row">
              <TabsList className="filter-list" aria-label="Filter projects by security area">
                {workAreas.map(a=><TabsTrigger className="filter-trigger" value={a} key={a}>{a}</TabsTrigger>)}
              </TabsList>
              <span className="result-count" aria-live="polite">
                {allWork.filter(p=>area==="All work"||p.areas.includes(area)).length} case studies
              </span>
            </div>
            {workAreas.map(a=>{
              const filtered = allWork.filter(p=>a==="All work"||p.areas.includes(a));
              return (
                <TabsContent value={a} key={a} className="project-grid">
                  {/* Desktop / Tablet Grid (>=768px) */}
                  <div className="project-desktop-grid">
                    {filtered.map(p=>(
                      <article className={`project-card card-${p.id}`} key={p.id}>
                        <a href={`/work/${p.id}`} className="project-link" aria-label={`View ${p.title} case study`}>
                          <ProjectVisual project={p}/>
                          <div className="project-content">
                            <div className="project-meta"><span>{p.context}</span><span>{p.year}</span></div>
                            <div className="project-title-line"><h3>{p.title}</h3><span className="project-open"><Plus size={21}/></span></div>
                            <p>{p.subtitle}</p>
                            <div className="project-foot"><div className="project-tags">{p.areas.map(t=><span key={t}>{t}</span>)}</div><span>Case study</span></div>
                          </div>
                        </a>
                      </article>
                    ))}
                  </div>

                  {/* Mobile Accordion (<768px) */}
                  <div className="project-mobile-accordion" role="region" aria-label="Mobile project accordion">
                    {filtered.map(p=>{
                      const isExpanded = expandedProject === p.id;
                      return (
                        <article className={`mobile-project-card card-${p.id}`} key={p.id}>
                          <button
                            type="button"
                            className="mobile-project-header"
                            aria-expanded={isExpanded}
                            aria-controls={`mobile-project-panel-${p.id}`}
                            id={`mobile-project-header-${p.id}`}
                            onClick={()=>setExpandedProject(isExpanded ? null : p.id)}
                          >
                            <div className="mobile-project-summary">
                              <div className="mobile-project-meta"><span>{p.context}</span><span className="mobile-project-sep" aria-hidden="true">·</span><span>{p.year}</span></div>
                              <h3 className="mobile-project-title">{p.title}</h3>
                              <div className="mobile-project-tags">{p.areas.map(t=><span key={t}>{t}</span>)}</div>
                            </div>
                            <span className={`mobile-project-chevron ${isExpanded ? "is-expanded" : ""}`} aria-hidden="true">
                              <ChevronDown size={20}/>
                            </span>
                          </button>
                          {isExpanded && (
                            <div
                              id={`mobile-project-panel-${p.id}`}
                              aria-labelledby={`mobile-project-header-${p.id}`}
                              role="region"
                              className="mobile-project-body"
                            >
                              <div className="mobile-project-visual-wrapper">
                                <ProjectVisual project={p}/>
                              </div>
                              <div className="mobile-project-details">
                                <p className="mobile-project-subtitle">{p.subtitle}</p>
                                <div className="mobile-project-action">
                                  <a href={`/work/${p.id}`} className="button primary mobile-project-btn">View case study</a>
                                </div>
                              </div>
                            </div>
                          )}
                        </article>
                      );
                    })}
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        </section>

        <section className="capabilities shell reveal" aria-labelledby="capabilities-heading">
          <div className="capabilities-intro">
            <p className="eyebrow">SECURITY CAPABILITIES</p>
            <h2 id="capabilities-heading">A connected<br/>perspective.</h2>
          </div>
          <div className="capability-list">
            {domains.map((d,i)=>(
              <article key={d.title}>
                <span className="cap-number">0{i+1}</span>
                <div>
                  <h3>{d.title}</h3>
                  <p>{d.text}</p>
                  <div>{d.tags.map(t=><span key={t}>{t}</span>)}</div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="arsenal" className="arsenal-section section">
          <div className="shell">
            <Heading number="02" label="SECURITY ARSENAL" title="Tools with a purpose." text="Explore the platforms and tools behind my projects, internships, and coursework."/>
            <Arsenal/>
          </div>
        </section>

        <section id="experience" className="section shell">
          <Heading number="03" label="EXPERIENCE" title="Security meets delivery."/>
          <div className="experience-list">
            <article className="experience-item reveal">
              <div className="experience-date"><span>2024</span><time>Aug – Sep</time><p>DEVSECOPS</p></div>
              <div className="experience-copy">
                <h3>DevSecOps Intern</h3>
                <p className="company">Sysreforms International <span>Islamabad, Pakistan</span></p>
                <ul>
                  <li>Configured Kubernetes and MySQL clusters for containerised applications, reducing deployment time by 30%.</li>
                  <li>Integrated Trivy and SonarQube into CI/CD workflows and helped remediate 15+ vulnerabilities.</li>
                  <li>Secured and troubleshot Docker, Linux, NGINX, SSH, and CI/CD environments.</li>
                </ul>
              </div>
              <div className="experience-result">
                <strong>30<span>%</span></strong>
                <p>reduction in<br/>deployment time</p>
                <div><b>15+</b><span>vulnerabilities remediated</span></div>
              </div>
            </article>
            <article className="experience-item reveal">
              <div className="experience-date"><span>2024</span><time>Jun – Jul</time><p>NETWORK SECURITY</p></div>
              <div className="experience-copy">
                <h3>Network Security Intern</h3>
                <p className="company">HTR Technologies <span>Islamabad, Pakistan</span></p>
                <ul>
                  <li>Performed reconnaissance, traffic analysis, and controlled assessments with Nmap, Wireshark, and Metasploit.</li>
                  <li>Investigated three unauthorised access attempts through packet analysis and suspicious communication patterns.</li>
                  <li>Worked on segmented networks using VLANs, ACLs, routing, DHCP, and NAT.</li>
                </ul>
              </div>
              <div className="experience-result network-result">
                <strong>3</strong>
                <p>access attempts<br/>investigated</p>
                <div><span>Analysis / segmentation / controls</span></div>
              </div>
            </article>
          </div>
        </section>

        <section id="about" className="about-section section shell">
          <div className="about-copy reveal">
            <p className="eyebrow"><span>/04</span> ABOUT</p>
            <h2>Curiosity is<br/>part of the work.</h2>
            <p>I’m Riaz, a cybersecurity graduate from Air University in Islamabad. I enjoy understanding how a weakness becomes an attack path, what evidence it leaves, and which controls make a difference.</p>
            <p>My practical experience spans offensive labs, forensic coursework, real-time detection, industrial security, and secure deployment workflows. I bring the same habit to each: investigate carefully, explain clearly, and keep learning.</p>
            <div className="about-signature"><span>Riaz Ahmed Ansari</span><small>OFFENSE / INVESTIGATION / ENGINEERING</small></div>
          </div>
          <div className="education-panel reveal">
            <div className="education-heading"><GraduationCap size={26}/><span>ACADEMIC FOUNDATION</span></div>
            <h3>BS Cybersecurity</h3>
            <p>Air University, Islamabad</p>
            <span className="education-period">2022–2026 · Degree completed</span>
            <Accordion type="single" collapsible className="coursework-accordion">
              {curriculum.map(c=>(
                <AccordionItem value={c.name} key={c.name}>
                  <AccordionTrigger>{c.name}</AccordionTrigger>
                  <AccordionContent><ul>{c.courses.map(s=><li key={s}>{s}</li>)}</ul></AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section id="credentials" className="credentials-section section shell">
          <Heading number="05" label="CERTIFICATIONS" title="Practice, backed by credentials."/>
          <div className="credentials-grid">
            {[["CRTA","Certified Red Team Analyst","OFFENSIVE SECURITY"],["MCRTA","Multi-Cloud Red Team Analyst","CLOUD SECURITY"]].map(([short,title,domain])=>(
              <article className="credential reveal" key={short}>
                <div className="credential-top">
                  <img src="/logos/cwl.png" alt="CyberWarFare Labs issuer logo" width="80" height="80" loading="lazy"/>
                  <span><Check size={15}/>Completed</span>
                </div>
                <p className="eyebrow">{domain}</p>
                <h3>{short}</h3>
                <p>{title}</p>
                <div className="credential-bottom"><span>CyberWarFare Labs</span><span>Certification</span></div>
              </article>
            ))}
          </div>
        </section>

        <section id="labs" className="labs-section shell reveal">
          <div>
            <p className="eyebrow">LABS & INVESTIGATIONS</p>
            <h2>Learning beyond<br/>the case study.</h2>
          </div>
          <div className="practice-list">
            <article>
              <span className="practice-label">PLATFORM PRACTICE</span>
              <h3>TryHackMe rooms</h3>
              <p>Completed rooms throughout my degree, building practical familiarity through guided security exercises.</p>
            </article>
            <article>
              <span className="practice-label">UNIVERSITY PRACTICE</span>
              <h3>CTFs & coursework labs</h3>
              <p>University challenges, assessment exercises, investigation discussions, and technical presentations.</p>
            </article>
          </div>
        </section>

        <section id="contact" className="contact-section section shell">
          <div className="contact-copy reveal">
            <p className="eyebrow"><span>/06</span> GET IN TOUCH</p>
            <h2>Let’s build<br/><span>something secure.</span></h2>
            <p>Open to opportunities in cybersecurity, SOC, security engineering, and DevSecOps.</p>
            <a className="email-link" href="mailto:ansariahmed408@gmail.com">ansariahmed408@gmail.com</a>
            <div className="contact-links">
              <External href={linkedin}><Linkedin size={18}/>LinkedIn</External>
              <External href={github}><Github size={18}/>GitHub</External>
              <button onClick={copy} aria-live="polite">{copied?<Check size={17}/>:<Copy size={17}/>} {copied?"Copied":copyFailed?"Copy unavailable":"Copy email"}</button>
            </div>
          </div>
          <div className="cv-panel reveal">
            <span className="mono">~/documents/cv.pdf</span>
            <h3>The full picture.<br/>One page.</h3>
            <p>Experience, projects, certifications, and technical skills.</p>
            <a href={cv} download className="button primary"><Download size={18}/>Download CV</a>
            <a href={cv} target="_blank" rel="noopener noreferrer" className="cv-preview">View PDF</a>
            <div className="cv-meta"><span>PDF / 1 PAGE</span><span>OCTOBER 2026</span></div>
          </div>
        </section>
      </main>
      <footer className="site-footer shell">
        <a href="#main">RIAZ AHMED ANSARI<span>Cybersecurity & security engineering</span></a>
        <p>© 2026</p>
        <a href="#main" className="footer-top">Back to top</a>
      </footer>
    </>
  );
}
