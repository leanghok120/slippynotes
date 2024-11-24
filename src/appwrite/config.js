import { Client, Databases } from "appwrite";

const client = new Client();
client.setProject(import.meta.env.VITE_PROJECT_ID);

const databases = new Databases(client);

export { client, databases };
