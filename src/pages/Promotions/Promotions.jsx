import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { editIcon, deleteIcon } from '../../assets';
import { Loading, SideNavbar, TopNavbar } from '../../components';
import axiosInstance from '../../utils/axiosInstance';

const Promotion = () => {
  const navigate = useNavigate();
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await axiosInstance.get('/promotions');
        const data = response.data.data;
        setPromotions(data);
        setLoading(false);
      } catch (error) {
        toast.error('Error fetching testimonials data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchPromotions();
  }, []);

  const deletePromotion = async (id) => {
    try {
      await axiosInstance.delete(`/promotions/${id}`);
      toast.success('Promotion deleted successfully');
      setPromotions(promotions.filter((promotion) => promotion.id !== id));
    } catch (error) {
      toast.error('Error deleting promotion. Please try again.');
    }
  };

  return (
    <div className="h-full min-h-screen flex flex-row bg-grey">
      <SideNavbar />

      <section className="w-full pl-72 pr-12 pb-10">
        <TopNavbar />

        <div className="flex flex-col gap-4">
          <h1 className="text-mid-blue text-3xl font-bold">Promotions</h1>

          <div className="flex self-end mb-3">
            <button
              className="btn-primary"
              onClick={() => navigate('/promotion/add')}
            >
              Add Promotion
            </button>
          </div>

          <div className="table-wrapper">
            <table className="w-full">
              <thead>
                <tr className="text-center">
                  <th className="!text-left">No</th>
                  <th>Image</th>
                  <th>Text</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="4">
                      <Loading />
                    </td>
                  </tr>
                ) : promotions.length > 0 ? (
                  promotions.map((promotion, index) => (
                    <tr key={index} className="text-center">
                      <td className="!text-left">1.</td>
                      <td>
                        <div className="flex justify-center">
                          <img
                            src={promotion.photo}
                            alt="Promotion"
                            className="h-24 w-[70px] object-cover"
                          ></img>
                        </div>
                      </td>
                      <td>
                        <div className="flex justify-center">
                          <p className="w-[450px] max-2xl:w-full">
                            {promotion.description || '—'}
                          </p>
                        </div>
                      </td>
                      <td>
                        <div className="flex justify-center gap-5">
                          <button
                            type="button"
                            onClick={() =>
                              navigate(`/promotion/edit/${promotion.id}`)
                            }
                          >
                            <img
                              src={editIcon}
                              alt="Edit Icon"
                              className="w-5 h-5"
                            ></img>
                          </button>
                          <button
                            type="button"
                            onClick={() => deletePromotion(promotion.id)}
                          >
                            <img
                              src={deleteIcon}
                              alt="Delete Icon"
                              className="w-5 h-5"
                            ></img>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No data available</td>
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

export default Promotion;
