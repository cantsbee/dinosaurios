// src/components/ConnectSpotify.jsx
export default function ConnectSpotify() {
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID; // 🔹 pon aquí tu client_id de Spotify
  const redirectUri = import.meta.env.VITE_REDIRECT_URI;// 🔹 URL donde se redirige tras login
  const scopes = "user-read-private user-read-email playlist-read-private";

  const generateRandomString = (length) => {
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let text = "";
    for (let i = 0; i < length; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  };

  const generateCodeChallenge = async (verifier) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(verifier);
    const digest = await crypto.subtle.digest("SHA-256", data);
    return btoa(String.fromCharCode(...new Uint8Array(digest)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  };

  const handleLogin = async () => {
    const verifier = generateRandomString(128);
    const challenge = await generateCodeChallenge(verifier);
    localStorage.setItem("verifier", verifier);

    const authUrl = new URL("https://accounts.spotify.com/authorize");
    authUrl.searchParams.append("client_id", clientId);
    authUrl.searchParams.append("response_type", "code");
    authUrl.searchParams.append("redirect_uri", redirectUri);
    authUrl.searchParams.append("scope", scopes);
    authUrl.searchParams.append("code_challenge_method", "S256");
    authUrl.searchParams.append("code_challenge", challenge);

    window.location.href = authUrl.toString();
  };

  return (
    <button
      onClick={handleLogin}
      className="bg-green-500 hover:bg-green-400 transition-colors px-6 py-3 rounded-full font-semibold text-black shadow-lg"
    >
      🎶 Conectar con Spotify
    </button>
  );
}
