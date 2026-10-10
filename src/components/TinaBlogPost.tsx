This is a massive victory!
Seeing that text means your Astro routing, your GraphQL database queries, and your markdown files are all communicating flawlessly. The underlying architecture is solid.
This proves with 100% certainty that the blank screen is being caused by the React component (TinaBlogPost.tsx) failing to render your data. Often, complex fields like dates (pubDate) or the TinaMarkdown rich-text parser can silently crash the React component if the data format isn't exactly what it expects.
Let's strip the React component down to its absolute bare essentials to prove the visual editing works, and then we can add the complex styling back in.
Step 1: Simplify the React Component
Replace the entire contents of src/components/TinaBlogPost.tsx with this ultra-basic, crash-proof version. Notice we are removing the date formatting and the rich-text parser for a moment:
import { tinaField, useTina } from "tinacms/dist/react";

export default function TinaBlogPost(props: any) {
  // This hook is what makes the magic live-editing work
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  return (
    <div style={{ padding: '2rem', border: '3px solid blue', margin: '2rem', borderRadius: '8px' }}>
      <p style={{ color: 'blue', fontWeight: 'bold' }}>Visual Editor Active</p>
      
      <h1 
        style={{ fontSize: '2rem', marginBottom: '1rem' }} 
        data-tina-field={tinaField(data.blog, 'title')}
      >
        {data.blog.title}
      </h1>
      
      <p data-tina-field={tinaField(data.blog, 'author')}>
        Author: {data.blog.author}
      </p>
    </div>
  );
}

Step 2: Inject it into the Working Page
Replace your src/pages/blog/[slug].astro with this code. We are going to keep our working "raw" HTML layout, but inject the React component inside it using the magic client:tina directive:
---
import client from '../../../tina/__generated__/client';
import TinaBlogPost from '../../components/TinaBlogPost';

export async function getStaticPaths() {
  const { data } = await client.queries.blogConnection();
  const posts = data.blogConnection.edges || [];

  return posts.map((edge) => {
    const post = edge?.node;
    return {
      params: { slug: post?._sys.filename.toLowerCase() },
      props: { relativePath: post?._sys.relativePath },
    };
  });
}

const { relativePath } = Astro.props;
const response = await client.queries.blog({ relativePath: relativePath as string });
---

<html lang="en">
  <head>
    <title>React Visual Test</title>
  </head>
  <body style="font-family: sans-serif; background: #f4f4f5; padding: 20px;">
    
    <h2>Astro Server Shell</h2>
    
    {/* This is the React component taking over */}
    <TinaBlogPost client:tina {...response} />

  </body>
</html>

Step 3: Test the Live Preview!
Save both files. Now, go to the CMS dashboard at http://localhost:4321/admin/index.html and click on your blog post.
You should see a large blue box on the right side of the screen. Try changing the Title in the left sidebar. If it is working, the title inside the blue box will update instantly as you type! Let me know if the blue box appears and updates.