import {Account, Avatars, Client, Databases, ID, Query} from "react-native-appwrite";
import { CreateUserParams, SignInParams } from "@/type"; // ojo: quizá sea CreateUserParams

export const appWriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    platform: "com.jsm.foodordering",
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    databaseId: "68ff84b80022cd820171",
    collectionId: "user",
};

export const client = new Client()
    .setEndpoint(appWriteConfig.endpoint)
    .setProject(appWriteConfig.projectId)
    .setPlatform(appWriteConfig.platform);

console.log("client created successfully.", JSON.stringify(client, null, 2));

export const account = new Account(client);
export const databases = new Databases(client);
const avatars = new Avatars(client);

export const createUser = async ({ name, email, password }: CreateUserParams) => {
    try {
        // Firma correcta: (userId, email, password, name)
        const newAccount = await account.create(ID.unique(), email, password, name);

        console.log(newAccount);

        // Opcional: crea sesión tras registrar
        await account.createEmailPasswordSession(email, password);

        // URL de avatar con iniciales
        const avatarUrl = avatars.getInitials(name); // devuelve una URL

        // createDocument: el 4º argumento ES el objeto de datos (sin "data:")
        const res = await databases.createDocument(
            appWriteConfig.databaseId,
            appWriteConfig.collectionId,
            ID.unique(),
            {
                email,
                name,
                accountId: newAccount.$id,
                avatar: avatarUrl,
            }
        );

        console.log(res);
        return res;
    } catch (err: any) {
        // Appwrite devuelve un objeto con message/code
        throw new Error(err?.message ?? String(err));
    }
};

export const signIn = async ({ email, password }: SignInParams) => {
    try {
        return await account.createEmailPasswordSession(email, password);
    } catch (e: any) {
        throw new Error(e?.message ?? String(e));
    }
};

export const getCurrentUser = async () => {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
        appWriteConfig.databaseId,
        appWriteConfig.collectionId,
        [Query.equal('accountId', currentAccount.$id)]);

    if(!currentUser) throw Error;
    return currentUser.documents[0];
}
