import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const USERS_URL = "https://dummyjson.com/users/search?q=";

async function findUser(username) {
  const res = await fetch(`${USERS_URL}${encodeURIComponent(username)}`);
  if (!res.ok) throw new Error("Error al buscar usuario");
  const data = await res.json();
  return data.users?.[0] || null;
}

export default function Login({ onSuccess }) {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!username.trim()) {
      setError("Ingresa un nombre de usuario");
      return;
    }
    setLoading(true);
    try {
      const user = await findUser(username.trim());
      if (!user) {
        setError("Usuario no encontrado");
        return;
      }
      login(user);
      onSuccess?.();
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="login-card">
        <span className="login-icon">&#128100;</span>
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="input"
            placeholder="Nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />
          {error && <p className="error-msg">{error}</p>}
          <button className="btn btn-block" type="submit" disabled={loading}>
            {loading ? "Buscando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}
