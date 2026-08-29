const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(path, options = {}) {
  const { headers, ...restOptions } = options;
  const response = await fetch(`${API_BASE}${path}`, {
    ...restOptions,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Something went wrong");
  return data;
}

// Auth APIs
export function signup({ name, email, password }) {
  return request("/auth/signup", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
}

export function login({ email, password }) {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function getMe(token) {
  return request("/auth/me", { headers: { Authorization: `Bearer ${token}` } });
}

// Product APIs
export function getProducts(params = {}) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      query.append(key, value);
    }
  });
  const queryString = query.toString() ? `?${query.toString()}` : '';
  return request(`/products${queryString}`);
}

export function getProductById(id) {
  return request(`/products/${id}`);
}

export function createProduct(productData, token) {
  return request("/products", {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: JSON.stringify(productData),
  });
}

// Order APIs
export function createOrder(orderData, token) {
  return request("/orders", {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: JSON.stringify(orderData),
  });
}

export function getMyOrders(token) {
  return request("/orders/mine", {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function getOrderByReference(reference) {
  return request(`/orders/${reference}`);
}

