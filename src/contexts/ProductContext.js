import { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../utils/axiosInstance';
import { AuthContext } from './AuthContext';

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [productsCount, setProductsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (!isAuthenticated) return;

        const response = await axiosInstance.get('/products');
        const data = response.data.data;
        setProducts(data);
        setProductsCount(data.length);
      } catch (error) {
        toast.error('Error fetching products data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [isAuthenticated]);

  const deleteProduct = async (id) => {
    try {
      await axiosInstance.delete(`/products/${id}`);
      toast.success('Product deleted successfully');
      setProducts(products.filter((product) => product.id !== id));
      setProductsCount(productsCount - 1);
    } catch (error) {
      toast.error('Error deleting product. Please try again.');
    }
  };

  return (
    <ProductContext.Provider
      value={{ products, productsCount, isLoading, deleteProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
