import Link from 'next/link';

/** One consistent heading for every section: plain label + clear title + short description. */
export default function SectionHead({ n, eyebrow, title, desc, href, action, as: Tag = 'h2', id }) {
  return (
    <div className="sh">
      <div>
        <p className="eyebrow">{n && <span className="sh-n">{n}</span>}{eyebrow}</p>
        <Tag id={id}>{title}</Tag>
        {desc && <p className="sh-desc">{desc}</p>}
      </div>
      {href && <Link href={href} className="sh-link">{action} →</Link>}
    </div>
  );
}
