import { defineConfig } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  
  schema: {
    collections: [
      {
        name: "blog",
        label: "Blog Posts",
        path: "src/content/blog",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
          },
          {
            type: "datetime",
            name: "pubDate",
            label: "Publish Date",
            required: true,
          },
          {
            type: "string",
            name: "author",
            label: "Author",
          },
          {
            type: "string", 
            list: true,     
            name: "tags",
            label: "Tags",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
        ui: {
          router: ({ document }) => {
            // Force lowercase and add trailing slash to match Astro
            return `/blog/${document._sys.filename.toLowerCase()}/`;           },         },       },       {         name: "page",         label: "Pages",         path: "src/content/pages",         format: "md",         fields: [           {             type: "string",             name: "title",             label: "Title",             isTitle: true,             required: true,           },           {             type: "string",             name: "description",             label: "Description",           },           {             type: "rich-text",             name: "body",             label: "Body Content",             isBody: true,           },         ],         ui: {           router: ({ document }) => {             const slug = document._sys.filename.toLowerCase();             if (slug === "index") return "/";             return `/${slug}/`;
          },
        },
      },
      {
        name: "services",
        label: "Services",
        path: "src/data/services",
        format: "json", 
        fields: [
          {
            type: "string",
            name: "serviceId",
            label: "ID",
            required: true,
          },
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "short",
            label: "Short Description",
          },
          {
            type: "string",
            name: "description",
            label: "Description",
          },
          {
            type: "string",
            name: "icon",
            label: "Icon (SVG path)",
          },
          {
            type: "string", 
            list: true,     
            name: "points",
            label: "Key Points",
          },
        ],
      },
    ],
  },
});