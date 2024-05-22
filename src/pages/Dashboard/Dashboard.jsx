import { useEffect, useState, useContext } from 'react';
import { Loading, SideNavbar, TopNavbar } from '../../components';
import {
  deleteIcon,
  editIcon,
  cartIcon,
  employeeIcon,
  notesIcon,
} from '../../assets';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { ProductContext } from '../../contexts/ProductContext';
import axiosInstance from '../../utils/axiosInstance';

const Dashboard = () => {
  const navigate = useNavigate();
  const [employeesCount, setEmployeesCount] = useState(0);
  const [testimonialsCount, setTestimonialsCount] = useState(0);
  const { products, productsCount, isLoading, deleteProduct } =
    useContext(ProductContext);
  const threeProducts = products.slice(0, 3);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axiosInstance.get('/users');
        const data = response.data.data;
        setEmployeesCount(data.length);
      } catch (error) {
        toast.error('Error fetching employees data. Please try again.');
      }
    };

    const fetchTestimonials = async () => {
      try {
        const response = await axiosInstance.get('/testimonials');
        const data = response.data.data;
        setTestimonialsCount(data.length);
      } catch (error) {
        toast.error('Error fetching testimonials data. Please try again.');
      }
    };

    fetchEmployees();
    fetchTestimonials();
  }, []);

  const handleDelete = (id) => {
    deleteProduct(id);
  };

  const data = [
    {
      id: 1,
      icon: cartIcon,
      title: 'Products',
      total: productsCount || 0,
      bgColor: 'bg-light-brown',
    },
    {
      id: 2,
      icon: employeeIcon,
      title: 'Employee',
      total: employeesCount || 0,
      bgColor: 'bg-mint',
    },
    {
      id: 3,
      icon: notesIcon,
      title: 'Testimonials',
      total: testimonialsCount || 0,
      bgColor: 'bg-purple',
    },
  ];

  return (
    <div className="h-full min-h-screen flex flex-row bg-grey">
      <SideNavbar />

      <section className="w-full pl-72 pr-12 pb-10">
        <TopNavbar />

        <div className="flex flex-col gap-10">
          <h1 className="text-mid-blue text-3xl font-bold">Dashboard</h1>

          <div className="flex flex-row flex-wrap gap-x-14 gap-y-6">
            {data.map(({ id, icon, title, total, bgColor }) => (
              <div
                key={id}
                className={`rounded-3xl py-5 px-10 flex flex-row items-center gap-4 ${bgColor}`}
              >
                <div className="flex flex-col text-center text-white font-bold">
                  <p className="text-2xl mb-1">{total}</p>
                  <p>{title}</p>
                </div>
                <img
                  src={icon}
                  alt={title}
                  className="w-[4.75rem] h-[4.75rem] pl-4"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 w-5/6 max-2xl:w-full">
          <h2 className="text-mid-blue text-xl font-bold">Products</h2>

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
                  threeProducts.map((product, index) => (
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
                      <td>{product.name}</td>
                      <td>{product.category}</td>
                      <td>
                        <div className="flex justify-center gap-5">
                          <button
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
                          <button onClick={() => handleDelete(product.id)}>
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

          <Link to="/product" className="font-medium text-center pt-3">
            Show All
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
