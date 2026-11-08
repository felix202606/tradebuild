import type { Metadata } from "next";
import { DocPage } from "@/components/doc-page";
import { Portable } from "@/components/portable";
import { aboutPage } from "@/lib/seo/company";
import { metadataFor } from "@/lib/seo/metadata";
import type { PageDoc } from "@/lib/seo/types";
import { getAbout } from "@/sanity/client";

export const revalidate = 60;

async function load() {
  const base = aboutPage();
  const about = await getAbout();
  if (!about) return { doc: base, about };
  const doc: PageDoc = {
    ...base,
    title: about.seo?.title || base.title,
    description: about.seo?.description || about.intro || base.description,
    h1: about.title || base.h1,
    answer: about.intro || base.answer,
    sections: about.body?.length ? [] : base.sections,
  };
  return { doc, about };
}

export async function generateMetadata(): Promise<Metadata> {
  return metadataFor((await load()).doc);
}

export default async function AboutPage() {
  const { doc, about } = await load();
  return (
    <DocPage doc={doc}>
      {about?.stats?.length ? (
        <dl className="mb-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
          {about.stats.map((stat) => (
            <div key={stat._key} className="flex flex-col-reverse bg-surface p-6">
              <dt className="mt-1 text-sm text-muted">{stat.label}</dt>
              <dd className="text-3xl font-semibold tracking-tight text-lime">{stat.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
      {about?.values?.length ? (
        <section className="mb-14" aria-labelledby="values">
          <h2 id="values" className="text-2xl font-semibold tracking-tight">
            我们的原则
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {about.values.map((value) => (
              <li key={value._key} className="rounded-2xl border border-line bg-surface p-6">
                <h3 className="font-semibold">{value.title}</h3>
                {value.description ? <p className="mt-2 text-sm leading-6 text-muted">{value.description}</p> : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      {about?.body?.length ? (
        <div className="mb-14">
          <Portable value={about.body} />
        </div>
      ) : null}
      {about?.team?.length ? (
        <section className="mb-14" aria-labelledby="team">
          <h2 id="team" className="text-2xl font-semibold tracking-tight">
            团队
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {about.team.map((member) => (
              <li key={member._key} className="rounded-2xl border border-line bg-surface p-6">
                <p className="font-semibold">{member.name}</p>
                {member.role ? <p className="text-sm text-lime">{member.role}</p> : null}
                {member.bio ? <p className="mt-3 text-sm leading-6 text-muted">{member.bio}</p> : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </DocPage>
  );
}
