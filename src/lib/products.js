import { api } from '@/lib/api';

/**
 * Fetch products with optional filters, search, pagination
 * @param {Object} params
 * @param {string} [params.search]
 * @param {string} [params.category]
 * @param {string} [params.sort]
 * @param {number} [params.page]
 * @param {number} [params.limit]
 * @param {number} [params.minPrice]
 * @param {number} [params.maxPrice]
 */
export const fetchProducts = async (params = {}) => {
  const { data } = await api.get('/products', { params });
  return data;
};

/**
 * Fetch a single product by ID
 * @param {string} id
 */
export const fetchProductById = async (id) => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};

/**
 * Fetch all available product categories
 */
export const fetchCategories = async () => {
  const { data } = await api.get('/products/categories');
  return data;
};

/**
 * Fetch featured products for homepage
 */
export const fetchFeaturedProducts = async () => {
  const { data } = await api.get('/products', { params: { featured: true, limit: 8 } });
  return data;
};

/**
 * Search products by query string
 * @param {string} query
 */
export const searchProducts = async (query) => {
  const { data } = await api.get('/products', { params: { search: query, limit: 10 } });
  return data;
};
