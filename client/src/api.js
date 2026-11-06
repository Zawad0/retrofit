const configuredApiUrl = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/+$/, '');
export const API_BASE = configuredApiUrl.endsWith('/api') ? configuredApiUrl : `${configuredApiUrl}/api`;

async function request(path, options = {}) {
  const { headers, ...restOptions } = options;
  let response;
  try {
    response = await fetch(`${API_BASE}${path}`, {
      ...restOptions,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });
  } catch {
    throw new Error(`Can't connect to the RetroFit server at ${API_BASE}. Start the server or check VITE_API_URL.`);
  }
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Something went wrong");
  return data;
}

// Auth APIs
export function signup({ name, email, password, sellerRequest = false }) {
  return request("/auth/signup", {
    method: "POST",
    body: JSON.stringify({ name, email, password, sellerRequest }),
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

export function requestSellerRole(token) {
  return request("/auth/seller-request", { method: "POST", headers: { Authorization: `Bearer ${token}` } });
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

export function createPaymentIntent(paymentData, token) {
  return request('/payment/create-intent', {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: JSON.stringify(paymentData),
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

