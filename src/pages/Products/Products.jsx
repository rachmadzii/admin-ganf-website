import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { editIcon, deleteIcon } from '../../assets';
import { ProductContext } from '../../contexts/ProductContext';
import { Loading, SideNavbar, TopNavbar } from '../../components';

const Products = () => {
  const navigate = useNavigate();
  const { products, isLoading, deleteProduct } = useContext(ProductContext);

  const handleDelete = (id) => {
    deleteProduct(id);
  };

  return (
    <div className="h-full min-h-screen flex flex-row bg-grey">
      <SideNavbar />

      <section className="w-full pl-72 pr-12 pb-10">
        <TopNavbar />

        <div className="flex flex-col gap-4">
          <h1 className="text-mid-blue text-3xl font-bold">Products</h1>

          <div className="flex self-end mb-3">
            <button
              className="btn-primary"
              onClick={() => navigate('/product/add')}
            >
              Add Product
            </button>
          </div>

          <div className="table-wrapper">
            <table className="w-full">
              <thead>
                <tr className="text-center">
                  <th className="!text-left">No</th>
                  <th>Product Pic</th>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="5">
                      <Loading />
                    </td>
                  </tr>
                ) : products.length > 0 ? (
                  products.map((product, index) => (
                    <tr key={index} className="text-center">
                      <td className="!text-left">{index + 1}.</td>
                      <td>
                        <div className="flex justify-center">
                          <img
                            src={product.photo}
                            alt={product.name}
                            className="h-20 w-20 object-cover"
                          />
                        </div>
                      </td>
                      <td>
                        {product.series ? (
                          <span>
                            {product.series} - {product.name}
                          </span>
                        ) : (
                          <span>{product.name}</span>
                        )}
                      </td>
                      <td>{product.category}</td>
                      <td>
                        <div className="flex justify-center gap-5">
                          <button
                            type="button"
                            onClick={() =>
                              navigate(`/product/edit/${product.id}`)
                            }
                          >
                            <img
                              src={editIcon}
                              alt="Edit Icon"
                              className="w-5 h-5"
                            />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(product.id)}
                          >
                            <img
                              src={deleteIcon}
                              alt="Delete Icon"
                              className="w-5 h-5"
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
