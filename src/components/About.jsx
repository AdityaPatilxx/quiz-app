import { BookOpen, Code, Mail, Linkedin, Github } from "lucide-react";

export default function About() {
  return (
    <div className="bg-background text-foreground max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold tracking-tight mb-6">
        About QuizMaster
      </h1>

      <section className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-6 h-6 text-accent" />
          <h2 className="text-xl font-semibold">Project Overview</h2>
        </div>
        <p className="text-muted-foreground">
          QuizMaster is an interactive quiz app I developed to improve and gain
          hands-on experience with modern frontend technologies. This solo
          project utilizes React, Tailwind CSS, and Firebase to create a
          responsive and engaging user interface. Integrating with the Open
          Trivia Database, it features smooth authentication and progress
          tracking, demonstrating my practical skills in web application
          development.
        </p>
      </section>

      <section className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Code className="w-6 h-6 text-accent" />
          <h2 className="text-xl font-semibold">Tech Stack & Skills</h2>
        </div>
        <ul className="list-disc list-inside text-muted-foreground space-y-1">
          <li>
            <strong>Frontend:</strong> React, Vite, Tailwind CSS
            (component-based architecture, responsive design)
          </li>
          <li>
            <strong>Backend:</strong> Firebase Authentication & Firestore (user
            management, real-time data)
          </li>
          <li>
            <strong>APIs:</strong> Open Trivia Database (REST API integration)
          </li>
          <li>
            <strong>Deployment:</strong> Vercel (CI/CD, hosting)
          </li>
        </ul>
      </section>

      <section>
        <div className="flex items-center gap-2 mb-4">
          <Mail className="w-6 h-6 text-accent" />
          <h2 className="text-xl font-semibold">Connect with Me</h2>
        </div>
        <p className="text-muted-foreground mb-4">
          I'm Aditya, a new frontend developer, open to new opportunities and
          always eager for feedback. QuizMaster is one of my practice projects
          created while learning React. Let's connect to chat about the project,
          explore roles, or discuss collaboration.
        </p>
        <div className="flex items-center gap-4">
          <a
            href="mailto:adityarpatilxx@gmail.com"
            className="p-2 rounded-md bg-accent/20 text-accent hover:bg-accent/30 transition-colors"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com/in/adityapatilxx"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-md bg-accent/20 text-accent hover:bg-accent/30 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="https://github.com/AdityaPatilxx"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-md bg-accent/20 text-accent hover:bg-accent/30 transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>
      </section>
    </div>
  );
}
