import { Client, Account, Databases, Storage } from "appwrite";

const client = new Client();
client
  .setEndpoint(
    import.meta.env.VITE_APPWRITE_ENDPOINT! ??
      "https://fra.cloud.appwrite.io/v1"
  )
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT! ?? "hehe");

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

export { client, account, databases, storage };
