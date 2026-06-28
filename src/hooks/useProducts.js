import { useQuery } from '@tanstack/react-query';
import { fetchProducts, fetchProductById, fetchFeaturedProducts } from '@/lib/products';

// Query keys
export const productKeys = {
  all: ['products'],
  list: (filters) => [...productKeys.all, 'list', filters],
  detail: (id) => [...productKeys.all, 'detail', id],
  featured: () => [...productKeys.all, 'featured'],
};

/**
 * Fetch products list with filters
 */
export const useProducts = (filters = {}) => {
  return useQuery({
    queryKey: productKeys.list(filters),
    queryFn: () => fetchProducts(filters),
    staleTime: 1000 * 60 * 2, // 2 minutes
    keepPreviousData: true,
  });
};

/**
 * Fetch a single product by ID
 */
export const useProduct = (id) => {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => fetchProductById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};

/**
 * Fetch featured products for home page
 */
export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: productKeys.featured(),
    queryFn: fetchFeaturedProducts,
    staleTime: 1000 * 60 * 5,
  });
};
