import { education, experience, profile, skills, type TimelineItem } from "@/content/site";
import { AboutSlider } from "./about-slider";

function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ul className="timeline">
      {items.map((item) => (
        <li key={item.title} className="timeline-item">
          <h4>{item.title}</h4>
          <p>
            {item.organization}
            <span>{item.period}</span>
          </p>
          {item.points.length > 0 ? (
            <ul>
              {item.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

export function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <p className="about-intro">{profile.intro}</p>

        <AboutSlider labels={["Skills", "Experience", "Education"]}>
          <div className="skills slider-item">
            <h3>Skills</h3>
            <ul className="skill-tags">
              {skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
          <div className="experience slider-item">
            <h3>Experience</h3>
            <Timeline items={experience} />
          </div>
          <div className="education slider-item">
            <h3>Education</h3>
            <Timeline items={education} />
          </div>
        </AboutSlider>
      </div>
    </section>
  );
}
