import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function validateConnection() {
  const res = await fetch("https://dummyjson.com/users?limit=1");
  if (!res.ok) throw new Error("Error de conexión con el servidor");
  return true;
}

async function validateInventory(items, allProducts) {
  const stockMap = {};
  for (const p of allProducts) {
    stockMap[p.id] = p.rating?.count ?? p.stock ?? 0;
  }
  for (const item of items) {
    if ((stockMap[item.id] ?? 0) < item.quantity) {
      throw new Error(`Stock insuficiente para: ${item.title}`);
    }
  }
  return true;
}

async function savePurchase(order) {
  const res = await fetch("https://dummyjson.com/carts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: order.userId || 1,
      products: order.items.map((i) => ({ id: i.id, quantity: i.quantity })),
    }),
  });
  if (!res.ok) throw new Error("Error al guardar la compra");
  return res.json();
}

export default function Checkout({ products, onDone }) {
  const { items, subtotal, iva, discount, total, dispatch } = useCart();
  const { user } = useAuth();
  const [step, setStep] = useState(null);
  const [error, setError] = useState("");
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setLoading(true);
    setError("");
    setTicket(null);

    try {
      setStep("Validando conexión...");
      await delay(500);
      await validateConnection();

      setStep("Validando inventario...");
      await delay(500);
      await validateInventory(items, products);

      setStep("Calculando total...");
      await delay(500);
      const order = { items, subtotal, iva, discount, total, userId: user?.id };

      setStep("Enviando pedido...");
      await delay(500);

      setStep("Guardando compra...");
      await delay(500);
      const saved = await savePurchase(order);

      setStep(null);
      setTicket({ ...order, id: saved.id, date: new Date().toLocaleString() });
      dispatch({ type: "CLEAR" });
    } catch (e) {
      setError(e.message);
      setStep(null);
    } finally {
      setLoading(false);
    }
  };

  if (ticket) {
    return (
      <div className="ticket">
        <div className="ticket-card">
          <span className="ticket-icon">&#9989;</span>
          <h2>&iexcl;Pedido confirmado!</h2>
          <p className="ticket-id">Pedido #{ticket.id}</p>
          <p className="ticket-date">{ticket.date}</p>
          <div className="ticket-items">
            {ticket.items.map((i) => (
              <div key={i.id} className="ticket-item">
                <span>{i.title.slice(0, 30)}...</span>
                <span>
                  {i.quantity} x ${i.price.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div className="ticket-total">
            <span>Total pagado:</span>
            <span>${ticket.total.toFixed(2)}</span>
          </div>
          <button className="btn" onClick={() => onDone?.()}>
            Volver al men&uacute;
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout">
      <div className="checkout-card">
        <h2>Finalizar Compra</h2>

        {items.length === 0 ? (
          <p className="empty-msg">No hay productos en el carrito.</p>
        ) : (
          <>
            <div className="checkout-items">
              {items.map((i) => (
                <div key={i.id} className="checkout-item">
                  <span>{i.title.slice(0, 35)}...</span>
                  <span>
                    {i.quantity} x ${i.price.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="checkout-summary">
              <p>
                Subtotal: <strong>${subtotal.toFixed(2)}</strong>
              </p>
              <p>
                IVA (16%): <strong>${iva.toFixed(2)}</strong>
              </p>
              <p>
                Descuento: <strong>-${discount.toFixed(2)}</strong>
              </p>
              <p className="checkout-total">
                Total: <strong>${total.toFixed(2)}</strong>
              </p>
            </div>

            {step && (
              <div className="checkout-step">
                <div className="spinner-sm" />
                <span>{step}</span>
              </div>
            )}

            {error && <p className="error-msg">{error}</p>}

            <button
              className="btn btn-block btn-primary"
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? "Procesando..." : "Pagar"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
