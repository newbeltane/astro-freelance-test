import { useTina } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';

interface Props {
  query: string;
  variables: { relativePath: string };
  data: any;
}

export default function TinaPost({ query, variables, data }: Props) {
  const { data: tinaData } = useTina({ query, variables, data });
  return (
    <div class="post-content">
      <TinaMarkdown content={tinaData.blog.body} />
    </div>
  );
}