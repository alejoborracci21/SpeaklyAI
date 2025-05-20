import { auth } from "./firebase";

export async function getFirebaseToken(): Promise<string | null> {
  const user = auth.currentUser;

  if (!user) return null;

  try {
    return await user.getIdToken();
  } catch (err) {
    console.error("Error al obtener el token:", err);
    return null;
  }
}