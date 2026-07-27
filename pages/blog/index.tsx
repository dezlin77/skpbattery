import Link from "next/link";
import { GetStaticProps } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Navbar from "@/components/Navbar";
import { getTranslations, type Locale } from "@/lib/i18n";

interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  keywords: string[];
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const t = await getTranslations((locale || "en") as Locale);
  const blogDir = path.join(process.cwd(), "content/blog");
  const files = fs.readdirSync(blogDir);
  const posts = files
    .filter((f) => f.endsWith(".md"))
    .map((filename) => {
      const raw = fs.readFileSync(path.join(blogDir, filename), "utf-8");
      const { data } = matter(raw);
      return {
        slug: data.slug,
        title: data.title,
        description: data.description,
        date: data.date,
        readTime: data.readTime,
        keywords: data.keywords || [],
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return { props: { t, posts } };
};

export default function BlogIndex({
  t, posts,
}: {
  t: Record<string, Record<string, string>>;
  posts: Post[];
}) {
  return (
    <>
      <Navbar t={t} />
      <main style={{ paddingTop: "64px", maxWidth: "900px",
        margin: "0 auto", padding: "6rem 2rem" }}>
        <p style={{ color: "var(--sky-red)", fontWeight: 600,
          letterSpacing: "0.1em", textTransform: "uppercase",
          fontSize: "0.8rem", marginBottom: "0.5rem" }}>
          {t.blog.title}
        </p>
        <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)",
          marginBottom: "0.75rem" }}>{t.blog.title}</h1>
        <p style={{ color: "var(--sky-gray)", marginBottom: "3rem",
          fontSize: "1.1rem" }}>{t.blog.sub}</p>

        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {posts.map((post) => (
            <article key={post.slug}
              style={{ borderBottom: "1px solid var(--sky-border)",
                paddingBottom: "2rem" }}>
              <p style={{ color: "var(--sky-muted)", fontSize: "0.8rem",
                marginBottom: "0.5rem" }}>
                {t.blog.published} {new Date(post.date).toLocaleDateString()}
                {" · "}{post.readTime}
              </p>
              <h2 style={{ fontSize: "1.4rem", marginBottom: "0.75rem",
                lineHeight: 1.3 }}>
                <Link href={`/blog/${post.slug}`}
                  style={{ color: "var(--sky-text)" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--sky-red)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--sky-text)")}>
                  {post.title}
                </Link>
              </h2>
              <p style={{ color: "var(--sky-gray)", lineHeight: 1.7,
                marginBottom: "1rem" }}>{post.description}</p>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap",
                marginBottom: "1rem" }}>
                {post.keywords.slice(0, 3).map((kw) => (
                  <span key={kw} style={{ background: "var(--sky-navy-light)",
                    color: "var(--sky-gray)", padding: "0.25rem 0.6rem",
                    borderRadius: "4px", fontSize: "0.75rem" }}>
                    {kw}
                  </span>
                ))}
              </div>
              <Link href={`/blog/${post.slug}`}
                style={{ color: "var(--sky-red)", fontWeight: 600,
                  fontSize: "0.9rem" }}>
                {t.blog.read_more} →
              </Link>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}