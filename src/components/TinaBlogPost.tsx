import { tinaField, useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export default function TinaBlogPost(props: any) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const { title, description, pubDate, author, body, tags } = data.blog;
  
  const dateObj = new Date(pubDate);
  const formatted = !isNaN(dateObj.getTime())
    ? dateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : '';

  return (
    <article className="section-sm">
      <div className="container container-narrow">
        <a href="/blog/" className="back">← Back to blog</a>

        <header className="post-head" style={{ marginBottom: '2rem' }}>
          <div className="meta" style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>
            {formatted && <time dateTime={dateObj.toISOString()}>{formatted}</time>}
            {formatted && author && <span aria-hidden="true"> • </span>}
            <span>{author}</span>
          </div>
          <h1 className="post-title" style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }} data-tina-field={tinaField(data.blog, 'title')}>
            {title}
          </h1>
          <p className="post-desc" style={{ fontSize: '1.125rem', color: '#444', marginBottom: '1rem' }} data-tina-field={tinaField(data.blog, 'description')}>
            {description}
          </p>
          
          {tags && tags.length > 0 && (
            <ul className="tags" style={{ display: 'flex', gap: '0.5rem', listStyle: 'none', padding: 0 }} data-tina-field={tinaField(data.blog, 'tags')}>
              {tags.map((t: string) => <li key={t} style={{ background: '#eee', padding: '0.25rem 0.75rem', borderRadius: '4px', fontSize: '0.875rem' }}>{t}</li>)}
            </ul>
          )}
        </header>
        
        <div className="prose max-w-none" data-tina-field={tinaField(data.blog, 'body')}>
          <TinaMarkdown content={body} />
        </div>
      </div>
    </article>
  );
}