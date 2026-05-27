import "./styles/global.css";
import { useState, useRef } from "react";

import initialWines from "./data/wines";
import ADMIN from "./data/admin";

import useLocalStorage from "./hooks/useLocalStorage";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CatalogPage from "./pages/CatalogPage";
import CartPage from "./pages/CartPage";
import HistoryPage from "./pages/HistoryPage";
import AdminDashboard from "./pages/AdminDashboard";
import AboutPage from "./pages/AboutPage";

export default function App() {
  const [page, setPage] = useState("home");

  // Simulación de sesión del usuario usando localStorage.
  const [currentUser, setCurrentUser] = useLocalStorage("cs_user", null);

  // Simulación de usuarios registrados usando localStorage.
  const [users, setUsers] = useLocalStorage("cs_users", [ADMIN]);

  // Simulación de catálogo de vinos usando localStorage.
  const [wines, setWines] = useLocalStorage("cs_wines", initialWines);

  // Simulación de carrito persistente usando localStorage.
  const [cart, setCart] = useLocalStorage("cs_cart", []);

  // Simulación de historial de pedidos usando localStorage.
  const [orders, setOrders] = useLocalStorage("cs_orders", []);

  // Estados posibles del pedido.
  const ORDER_STATUS = {
    PENDING: "Pendiente",
    CONFIRMED: "Confirmado",
    PREPARING: "En preparación",
    SHIPPING: "En camino",
    DELIVERED: "Entregado",
    CANCELLED: "Cancelado",
  };

  const [toast, setToast] = useState(null);
  const toastRef = useRef(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });

    clearTimeout(toastRef.current);

    toastRef.current = setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // Obtiene la fecha mínima permitida para la entrega.
  // Se usa mañana como fecha mínima para evitar fechas pasadas
  // o pedidos para el mismo día.
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  const handleLogin = (user) => {
    setCurrentUser(user);

    if (user.role === "admin") {
      setPage("admin");
    } else {
      setPage("catalog");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCart([]);
    setPage("home");
  };

  const handleRegister = (user) => {
    setUsers((prev) => [...prev, user]);
    setCurrentUser(user);
    setPage("catalog");
  };

  // Agrega un vino al carrito.
  // Si ya existe, aumenta la cantidad sin superar el stock disponible.
  const addToCart = (wine) => {
    if (wine.stock === 0) {
      showToast("Este producto está agotado", "error");
      return;
    }

    setCart((prev) => {
      const existing = prev.find((item) => item.id === wine.id);

      if (existing) {
        if (existing.qty >= wine.stock) {
          showToast("No hay más stock disponible para este vino", "error");
          return prev;
        }

        return prev.map((item) =>
          item.id === wine.id ? { ...item, qty: item.qty + 1 } : item,
        );
      }

      return [...prev, { ...wine, qty: 1 }];
    });

    showToast("Producto agregado al carrito");
  };

  // Compra rápida:
  // Para un flujo más limpio, no crea el pedido directo.
  // Agrega el vino al carrito y lleva al usuario a revisar su compra.
  const buyNow = (wine) => {
    if (!currentUser) {
      showToast("Inicia sesión para comprar", "error");
      setPage("login");
      return;
    }

    if (wine.stock === 0) {
      showToast("Este producto está agotado", "error");
      return;
    }

    addToCart(wine);
    setPage("cart");
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    showToast("Producto eliminado del carrito");
  };

  // Actualiza la cantidad de un producto en el carrito.
  // No permite cantidades menores a 1 ni superiores al stock disponible.
  const updateQty = (id, qty) => {
    if (qty <= 0) {
      return;
    }

    setCart((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        if (qty > item.stock) {
          showToast("No hay más stock disponible para este vino", "error");
          return item;
        }

        return { ...item, qty };
      }),
    );
  };

  // HU9 / HU19:
  // Se simula la confirmación del pedido.
  // El pedido se guarda en localStorage y luego se muestra en el historial.
  // Ahora también recibe los datos de entrega desde CartPage.
  const checkout = (deliveryData) => {
    if (!currentUser) {
      showToast("Inicia sesión para confirmar tu pedido", "error");
      setPage("login");
      return;
    }

    if (cart.length === 0) {
      showToast("Tu carrito está vacío", "error");
      return;
    }

    // Valida que el departamento sea obligatorio.
    if (!deliveryData?.department) {
      showToast("Selecciona el departamento de entrega", "error");
      return;
    }

    // Valida que la dirección sea obligatoria.
    if (!deliveryData?.address?.trim()) {
      showToast("Ingresa la dirección de entrega", "error");
      return;
    }

    // Valida que la fecha de entrega sea obligatoria.
    if (!deliveryData?.deliveryDate) {
      showToast("Selecciona la fecha de entrega", "error");
      return;
    }

    // Valida que la fecha de entrega no sea anterior ni igual al día del pedido.
    if (deliveryData.deliveryDate < getTomorrowDate()) {
      showToast(
        "La fecha de entrega debe ser posterior a la fecha del pedido",
        "error",
      );
      return;
    }

    const order = {
      id: Date.now(),
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      userPhone: currentUser.phone || "",
      items: cart,
      total: cart.reduce((sum, item) => sum + item.price * item.qty, 0),
      status: ORDER_STATUS.PENDING,
      date: new Date().toISOString(),

      // Datos de entrega capturados desde el carrito.
      delivery: {
        department: deliveryData.department,
        address: deliveryData.address.trim(),
        deliveryDate: deliveryData.deliveryDate,
        contactPhone:
          deliveryData.contactPhone?.trim() || currentUser.phone || "",
        reference: deliveryData.reference?.trim() || "",
      },
    };

    setOrders((prev) => [...prev, order]);
    setCart([]);
    setPage("history");

    showToast("Pedido creado correctamente");
  };

  // HU19:
  // Permite cambiar manualmente el estado del pedido
  // para simular seguimiento de compra desde frontend.
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order,
      ),
    );

    showToast(`Estado actualizado a: ${newStatus}`);
  };

  const renderPage = () => {
    if (currentUser?.role === "admin") {
      return (
        <AdminDashboard
          wines={wines}
          setWines={setWines}
          users={users}
          orders={orders}
          showToast={showToast}
        />
      );
    }

    switch (page) {
      case "home":
        return <HomePage setPage={setPage} wines={wines} />;

      case "catalog":
        return (
          <CatalogPage
            wines={wines}
            onAddToCart={addToCart}
            onBuy={buyNow}
            showToast={showToast}
            currentUser={currentUser}
            setPage={setPage}
          />
        );
      case "about":
        return <AboutPage />;

      case "cart":
        return (
          <CartPage
            cart={cart}
            onRemove={removeFromCart}
            onUpdateQty={updateQty}
            onCheckout={checkout}
            showToast={showToast}
          />
        );

      case "history":
        return (
          <HistoryPage
            orders={orders.filter((order) => order.userId === currentUser?.id)}
            onUpdateOrderStatus={updateOrderStatus}
            ORDER_STATUS={ORDER_STATUS}
          />
        );

      case "login":
        return (
          <LoginPage
            onLogin={handleLogin}
            setPage={setPage}
            users={users}
            showToast={showToast}
          />
        );

      case "register":
        return (
          <RegisterPage
            onRegister={handleRegister}
            setPage={setPage}
            users={users}
            showToast={showToast}
          />
        );

      default:
        return <HomePage setPage={setPage} wines={wines} />;
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Navbar
        page={page}
        setPage={setPage}
        currentUser={currentUser}
        onLogout={handleLogout}
        cartCount={cart.reduce((sum, item) => sum + item.qty, 0)}
      />

      <main style={{ flex: 1 }}>{renderPage()}</main>

      {(!currentUser || currentUser.role !== "admin") && <Footer />}

      {toast && <div className={`toast toast-${toast.type}`}>{toast.msg}</div>}
    </div>
  );
}
