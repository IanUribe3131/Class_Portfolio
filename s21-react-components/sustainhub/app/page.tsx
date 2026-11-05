"use client";
import Image from "next/image";
import Link from "next/link";
import { SAMPLE_INITIATIVES } from "./initiatives";

export default function Home() {
  const [initiatives, setInitiatives] = useState(SAMPLE_INITIATIVES);
  return (
    <main>
      <h1>Climate Action Initiatives</h1>

      <div>
        {initiatives.map((item) => {
          return (
            <article key={item.id}>
              <Link href={"/initiatives/" + item.id}>
                <h2>{item.title}</h2>
                <p>{item.votes} votes</p>
              </Link>

              <button onClick={() => handleVote(item.id)}>
                Vote
              </button>
            </article>
          );
        })}
      </div>
    </main>
  );
}

  function handleVote(id: string) {
    const updatedInitiatives = initiatives.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          votes: item.votes + 1,
        };
      }

      return item;
    });

    setInitiatives(updatedInitiatives);
  }