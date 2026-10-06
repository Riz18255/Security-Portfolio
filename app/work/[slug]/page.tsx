import {notFound} from "next/navigation";
import {allWork} from "@/lib/portfolio-data";
import {PortfolioHeader} from "@/components/portfolio-header";
import {ProjectVisual} from "@/components/project-visual";
import {Github} from "@/components/social-icons";
import {BookOpen, ChevronDown} from "lucide-react";

export function generateStaticParams(){return allWork.map(p=>({slug:p.id}));}

export async function generateMetadata({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const project=allWork.find(p=>p.id===slug);
  if(!project) return {title: "Case study | Riaz Ahmed Ansari"};
  const siteUrl = `https://rizahmedportfolio.vercel.app/work/${project.id}`;
  const title = `${project.title} | Riaz Ahmed Ansari`;
  return {
    title,
    description: project.subtitle,
    alternates: {
      canonical: siteUrl,
    },
    openGraph: {
      type: "article",
      url: siteUrl,
      title,
      description: project.subtitle,
      siteName: "Riaz Ahmed Ansari Portfolio",
    },
    twitter: {
      card: "summary",
      title,
      description: project.subtitle,
    },
  };
}

export default async function CaseStudy({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const project=allWork.find(p=>p.id===slug);
  if(!project)notFound();

  return (
    <>
      <div className="site-atmosphere" aria-hidden="true"/>
      <PortfolioHeader home={false}/>
      <main id="main" className={`case-page shell case-${project.id}`}>
        <a href="/#work" className="case-back"><BookOpen size={16}/>All case studies</a>
        <div className="case-hero">
          <p className="eyebrow">{project.context} / {project.year}</p>
          <h1>{project.title}</h1>
          <p>{project.subtitle}</p>
          <div className="project-tags">{project.areas.map(a=><span key={a}>{a}</span>)}</div>
        </div>
        <ProjectVisual project={project} large/>

        <div className="case-layout">
          {/* Desktop Sidebar (>=801px) */}
          <aside className="case-aside-desktop">
            <p className="mono">CASE STUDY INDEX</p>
            <a href="#challenge">01 / The challenge</a>
            <a href="#contribution">02 / My contribution</a>
            <a href="#outcome">03 / The outcome</a>
            <a href="#learning">04 / What I learned</a>
            <div className="case-stack">
              <p className="mono">TOOLS & CONCEPTS</p>
              {project.stack.map(s=><span key={s}>{s}</span>)}
            </div>
            {project.repo&&<a href={project.repo} target="_blank" rel="noopener noreferrer" className="case-repo"><Github size={18}/>View repository</a>}
          </aside>

          {/* Mobile Compact Index & Tools (<801px) */}
          <aside className="case-aside-mobile">
            <nav className="case-mobile-jump-nav" aria-label="Case study section links">
              <a href="#challenge">01 / Challenge</a>
              <a href="#contribution">02 / Contribution</a>
              <a href="#outcome">03 / Outcome</a>
              <a href="#learning">04 / Learning</a>
            </nav>
            <details className="case-mobile-tools-details">
              <summary className="case-mobile-tools-trigger">
                <span>Tools & concepts ({project.stack.length})</span>
                <ChevronDown size={16} className="case-tools-chevron" aria-hidden="true"/>
              </summary>
              <div className="case-mobile-tools-body">
                <div className="case-stack-pills">
                  {project.stack.map(s=><span key={s}>{s}</span>)}
                </div>
                {project.repo&&<a href={project.repo} target="_blank" rel="noopener noreferrer" className="case-repo"><Github size={18}/>View repository</a>}
              </div>
            </details>
          </aside>

          <div className="case-content">
            <section id="challenge">
              <span className="case-number">01</span>
              <h2>The challenge</h2>
              <p>{project.challenge}</p>
            </section>
            <section id="contribution">
              <span className="case-number">02</span>
              <h2>My contribution</h2>
              <ul>{project.contribution.map(c=><li key={c}>{c}</li>)}</ul>
            </section>
            <section id="outcome" className="case-outcome">
              <span className="case-number">03</span>
              <h2>The outcome</h2>
              <p>{project.outcome}</p>
              <div className="case-metric">
                <strong>{project.metric}</strong>
                <span>{project.metricLabel}</span>
              </div>
            </section>
            <section id="learning">
              <span className="case-number">04</span>
              <h2>What I learned</h2>
              <p>{project.learning}</p>
            </section>
          </div>
        </div>

        <div className="case-more">
          <h2>Explore another perspective.</h2>
          <div>
            {allWork.filter(p=>p.id!==project.id).slice(0,3).map(p=>(
              <a href={`/work/${p.id}`} key={p.id}>
                <span>{p.title}</span>
                <small>{p.subtitle}</small>
              </a>
            ))}
          </div>
        </div>
      </main>
      <footer className="site-footer shell">
        <a href="/">RIAZ AHMED ANSARI<span>Cybersecurity & security engineering</span></a>
        <a href="/#contact">Get in touch</a>
      </footer>
    </>
  );
}
