import { useState, useMemo } from "react";
import { useCart } from "../context/CartContext";

const CATEGORIES = [
  "Todas",
  "hamburguesas",
  "papas",
  "pizzas",
  "alitas",
  "bebidas",
  "postres",
  "combos",
];

export default function Catalog({ products }) {
  const { dispatch, items } = useCart();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todas");
  const [sort, setSort] = useState("");

  const cartIds = new Set(items.map((i) => i.id));

  const filtered = useMemo(() => {
    let result = [...products];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (category !== "Todas") {
      result = result.filter((p) => p.category === category);
    }

    if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") result.sort((a, b) => b.price - a.price);
    else if (sort === "name-asc") result.sort((a, b) => a.title.localeCompare(b.title));
    else if (sort === "name-desc") result.sort((a, b) => b.title.localeCompare(a.title));

    return result;
  }, [products, search, category, sort]);

  return (
    <div className="catalog">
      <div className="catalog-controls">
        <input
          type="text"
          className="input"
          placeholder="Buscar producto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select
          className="input"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Ordenar por...</option>
          <option value="price-asc">Precio: menor a mayor</option>
          <option value="price-desc">Precio: mayor a menor</option>
          <option value="name-asc">Nombre: A-Z</option>
          <option value="name-desc">Nombre: Z-A</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="empty-msg">No se encontraron productos.</p>
      ) : (
        <div className="product-grid">
          {filtered.map((p) => (
            <div key={p.id} className="product-card">
              <img src={p.image} alt={p.title} className="product-img" />
              <div className="product-body">
                <h3 className="product-title">{p.title}</h3>
                <span className="product-category">{p.category}</span>
                <div className="product-meta">
                  <span className="product-price">${p.price.toFixed(2)}</span>
                  <span className="product-rating">
                    &#9733; {p.rating?.rate ?? p.rating ?? "N/A"}
                  </span>
                </div>
                <span className="product-stock">
                  Stock: {p.rating?.count ?? p.stock ?? "N/A"}
                </span>
                {cartIds.has(p.id) ? (
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => dispatch({ type: "REMOVE_ITEM", payload: p.id })}
                  >
                    Quitar
                  </button>
                ) : (
                  <button
                    className="btn btn-sm"
                    onClick={() => dispatch({ type: "ADD_ITEM", payload: p })}
                  >
                    Agregar
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
