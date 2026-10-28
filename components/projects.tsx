import { projects } from "@/content/site";

export function Projects() {
  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">Projects</h2>
        <div className="project-grid">
          {projects.map((project) => (
            <article key={project.title} className="project-card">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-footer">
                <ul className="project-tags">
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                {project.github ? (
                  <a href={project.github} className="project-link" target="_blank" rel="noreferrer">
                    View on GitHub
                  </a>
                ) : (
                  <span className="project-private">Code not public</span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
