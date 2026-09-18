import React from 'react';
import { useTina } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';

export default function PageEditIsland(props) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  return (
    <div className="container text-center max-w-2xl">
      <h1 className="page-title">{data.page.title}</h1>
      {data.page.body && (
        <div className="cms-content lead">
          <TinaMarkdown content={data.page.body} />
        </div>
      )}
    </div>
  );
}
