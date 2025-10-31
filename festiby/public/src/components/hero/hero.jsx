 import "./hero.css";
 
// src/components/Hero.jsx
import ConnectSpotify from "./ConnectSpotify";

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-black to-green-800 text-white text-center px-6">
      <h1 className="text-5xl font-bold mb-6">Bienvenida a tu experiencia musical 🌈</h1>
      <p className="text-lg mb-10 max-w-xl">
        Conéctate con Spotify para descubrir qué tan compatible eres con tu festival favorito.
      </p>
      <ConnectSpotify />
    </section>
  );
}
