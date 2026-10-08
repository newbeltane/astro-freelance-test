import { createClient } from "tinacms/dist/client";
import { queries } from "./types.js";
export const client = createClient({ url: "http://localhost:4001/graphql", token: "8296a040e52b4beff6ffd50d21583dbee4794051", queries,  });
export default client;
  