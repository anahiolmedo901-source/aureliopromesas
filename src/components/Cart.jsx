import { useCart } from "../context/CartContext";

export default function Cart() {
  const { items, dispatch, subtotal, iva, discount, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="cart-empty">
        <span className="cart-empty-icon">&#128722;</span>
        <p>Tu carrito está vacío</p>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="cart-items">
        {items.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.title} className="cart-item-img" />
            <div className="cart-item-info">
              <h4>{item.title}</h4>
              <p className="cart-item-price">${item.price.toFixed(2)}</p>
            </div>
            <div className="cart-item-qty">
              <button
                className="btn btn-sm"
                onClick={() =>
                  dispatch({
                    type: "UPDATE_QUANTITY",
                    payload: { id: item.id, quantity: item.quantity - 1 },
                  })
                }
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                className="btn btn-sm"
                onClick={() =>
                  dispatch({
                    type: "UPDATE_QUANTITY",
                    payload: { id: item.id, quantity: item.quantity + 1 },
                  })
                }
              >
                +
              </button>
            </div>
            <p className="cart-item-subtotal">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => dispatch({ type: "REMOVE_ITEM", payload: item.id })}
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="cart-summary-row">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="cart-summary-row">
          <span>IVA (16%)</span>
          <span>${iva.toFixed(2)}</span>
        </div>
        <div className="cart-summary-row">
          <span>Descuento</span>
          <span>-${discount.toFixed(2)}</span>
        </div>
        <div className="cart-summary-row cart-summary-total">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button
          className="btn btn-danger btn-block"
          onClick={() => dispatch({ type: "CLEAR" })}
        >
          Vaciar carrito
        </button>
      </div>
    </div>
  );
}
