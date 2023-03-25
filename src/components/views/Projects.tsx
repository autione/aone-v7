import { useEffect, useMemo, useState } from "react";

import styles from "../../styles/components/views/Projects.module.scss";

import { Project } from "../../types";
import Icon from "../Icon";

import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";
// import { getDownloadURL, getStorage, ref } from "firebase/storage";

import { firebaseConfig } from "../../config";
import Image from "next/image";
import Alert from "../Alert";

interface ProjectWithAssets extends Project {
  assets: { [key: string]: string };
}

export default function ProjectsContent() {
  const colors = {
    accent: "#2eeba7",
    background: "#0e3426",
  };

  const firebase = initializeApp(firebaseConfig);
  const db = getFirestore(firebase);
  // const storage = getStorage(firebase);

  const [status, setStatus] = useState("");
  const [projects, setProjects] = useState<ProjectWithAssets[]>([]);

  const fetchProjects = async () => {
    setStatus("Loading...");

    try {
      const snap = await getDocs(collection(db, "projects"));

      let data: ProjectWithAssets[] = [];

      for await (const e of snap.docs.values()) {
        // const fileRef = ref(storage, `projects/${e.id}.png`);
        // const fileUrl = await getDownloadURL(fileRef);

        const fileUrl = `https://firebasestorage.googleapis.com/v0/b/aone-website.appspot.com/o/projects%2F${encodeURIComponent(
          e.id
        )}.png?alt=media`;

        data.push({
          ...(e.data() as Project),
          id: e.id,
          assets: {
            icon: fileUrl,
          },
        });
      }

      setProjects(data);
      setStatus("");
    } catch (err) {
      console.error("Failed to load projects:", err);
      setStatus("Failed to load projects.");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <>
      <p>
        This is for you who is looking for a portfolio of some sorts regarding my previous works, or for you who is
        curious to see what this very dissimilar person has done of good throughout their existence, or for you who is
        either both or none of these.
      </p>

      <p>
        My projects aren&apos;t that popular, so it&apos;s likely you haven&apos;t seem any of these before, but who
        knows. ¯\_(ツ)_/¯
      </p>

      {projects.length > 0 &&
        projects
          .sort((a, b) => a.status - b.status)
          .map((project, index) => (
            <div className={styles.project} key={`project-${index}`}>
              <Image className={styles.icon} src={project.assets.icon} alt="Project Icon" width={96} height={96} />
              <main>
                <span className={styles.textContent}>
                  <b className={styles.title}>{project.name}</b>
                  <ul>
                    <li className={styles.epochList} title="Epoch">
                      <i>
                        <Icon i="calendar_month" />
                      </i>
                      {project.epoch.map((v, i) => (
                        <span key={`epoch-${index}.${i}`}>{v}</span>
                      ))}
                    </li>
                    <li title="Technologies">
                      <i>
                        <Icon i="code_blocks" />
                      </i>
                      {project.technologies.map((v, i) => (
                        <span key={`technologies-${index}.${i}`}>{v}</span>
                      ))}
                    </li>
                  </ul>
                  <ul>
                    {project.collaborators.length > 0 && (
                      <li title="Collaborators">
                        <i>
                          <Icon i="group" />
                        </i>
                        {project.collaborators.map((v, i) => (
                          <span key={`collaborators-${index}.${i}`}>{v}</span>
                        ))}
                      </li>
                    )}
                    <li title="Categories">
                      <i>
                        <Icon i="bookmark" />
                      </i>
                      {project.tags.map((v, i) => (
                        <span key={`tags-${index}.${i}`}>{v}</span>
                      ))}
                    </li>
                    <li title="Platforms">
                      <i>
                        <Icon i="terminal" />
                      </i>
                      {project.platforms.map((v, i) => (
                        <span key={`platforms-${index}.${i}`}>{v}</span>
                      ))}
                    </li>
                  </ul>
                </span>
                <span>{project.description}</span>
                <span className={`${styles.status} ${styles[`s${project.status}`]}`}>
                  {["Active", "In Development", "On Hold", "Deprecated"][project.status]}
                </span>
              </main>
            </div>
          ))}

      {status && (
        <p
          style={{
            textAlign: "center",
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "var(--accent)",
          }}
        >
          {status}
        </p>
      )}

      <noscript>
        <Alert color={colors.accent} icon={<Icon i="warning" />}>
          This window needs JavaScript to work.
        </Alert>
      </noscript>

      <p>
        Of course that, any programmer out there will have a bazillion dead projects, being them just for
        experimentation, or an idea that ended up not taking off, and I&apos;m no exception for that.
      </p>

      <p>
        I have way more than just these projects, but the ones listed are the ones I considered being my favorites and
        most well worked on.
      </p>
    </>
  );
}
