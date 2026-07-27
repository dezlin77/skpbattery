import Link from "next/link";
import { GetStaticProps, GetStaticPaths } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import Navbar from "@/components/Navbar";
import { getTranslations, type Locale } from "@/lib/i18n";

export const getStaticPaths: GetStaticPaths = async () => {
  const blogDir = path.join(process.cwd(), "content/blog");
  const files = fs.readdirSync(blogDir);
  const paths = files
    .filter((f) => f.endsWith(".md"))
    .map((filename) => {
      const raw = fs.readFileSync(path.join(blogDir, filename), "utf-8");
      const { data } = matter(raw);
      return { params: { slug: data.slug } };
    });
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const t = await getTranslations((locale || "en") as Locale);
  const blogDir = path.join(process.cwd(), "content/blog");
  const files = fs.readdirSync(blogDir);
  const file = files.find((f) => {
    const raw = fs.readFileSync(path.join(blogDir, f), "utf-8");
    const { data } = matter(raw);
    return data.slug === params?.slug;
  });
  if (!file) return { notFound: true };
  const raw = fs.readFileSync(path.join(blogDir, file), "utf-8");
  const { data, content } = matter(raw);
  const htmlContent = await marked(content);
  return { props: { t, meta: data, content: htmlContent } };
};

export default function BlogPost({
  t, meta, content,
}: {
  t: Record<string, Record<string, string>>;
  meta: Record<string, string>;
  content: string;
}) {
  return (
    <>
      <Navbar t={t} />
      <main style={{ paddingTop: "64px" }}>
        {/* Hero */}
        <div style={{ background: "var(--sky-navy-light)",
          borderBottom: "1px solid var(--sky-border)",
          padding: "4rem 2rem 3rem" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <Link href="/blog"
              style={{ color: "var(--sky-red)", fontSize: "0.85rem",
                fontWeight: 600, display: "inline-block", marginBottom: "1.5rem" }}>
              ← {t.blog.back}
            </Link>
            <h1 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              lineHeight: 1.2, marginBottom: "1rem" }}>
              {meta.title}
            </h1>
            <p style={{ color: "var(--sky-gray)", fontSize: "0.9rem" }}>
              {t.blog.published} {new Date(meta.date).toLocaleDateString()}
              {" · "}{meta.readTime}
              {" · "}{meta.author}
            </p>
          </div>
        </div>

        {/* Article Content */}
        <article style={{ maxWidth: "800px", margin: "0 auto",
          padding: "3rem 2rem" }}>
          <div dangerouslySetInnerHTML={{ __html: content }}
            style={{ lineHeight: 1.8, fontSize: "1.05rem",
              color: "var(--sky-text)" }} />

          {/* CTA */}
          <div style={{ marginTop: "4rem", padding: "2rem",
            background: "var(--sky-navy-light)",
            border: "1px solid var(--sky-border)", borderRadius: "12px",
            textAlign: "center" }}>
            <p style={{ fontSize: "0.8rem", color: "var(--sky-red)",
              fontWeight: 600, textTransform: "uppercase",
              letterSpacing: "0.1em", marginBottom: "0.5rem" }}>
              Free Tool
            </p>
            <h3 style={{ fontSize: "1.4rem", marginBottom: "0.75rem" }}>
              Simulate Your Battery Pack
            </h3>
            <p style={{ color: "var(--sky-gray)", marginBottom: "1.5rem" }}>
              Run a free certified thermal simulation and download a
              verification report for your engineering team.
            </p>
            <Link href="/#simulator"
              style={{ background: "var(--sky-red)", color: "white",
                padding: "0.85rem 2rem", borderRadius: "8px",
                fontWeight: 700, fontSize: "1rem", display: "inline-block" }}>
              Launch Simulator →
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}