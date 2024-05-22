import { useParams } from 'react-router-dom';
import { Loading, SideNavbar, TopNavbar } from '../../components';
import { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-toastify';
import UploadPhoto from '../../components/UploadPhoto/UploadPhoto';
import { loadingWhiteIcon } from '../../assets';

const PromotionsEdit = () => {
  const { id } = useParams();
  const [formState, setFormState] = useState({
    photo: null,
    description: '',
  });
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [newPhoto, setNewPhoto] = useState(null);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await axiosInstance.get(`/promotions/${id}`);
        const data = response.data.data;

        const promotionData = {
          photo: data.photo,
          description: data.description || '',
        };

        setFormState(promotionData);
      } catch (error) {
        toast.error('Error fetching promotion data. Please try again.');
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPromotions();
  }, [id]);

  const handlePhotoChange = (newPhoto) => {
    setNewPhoto(newPhoto);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoadingSubmit(true);

    const formData = new FormData();

    if (newPhoto) {
      formData.append('photo', newPhoto);
    } else if (formState.photo) {
      formData.append('photo', formState.photo);
    }
    formData.append('description', formState.description);

    try {
      await axiosInstance.put(`/promotions/${id}`, formData);
      toast.success('Promotion updated successfully.');

      setIsLoadingSubmit(false);
      window.location = '/promotion';
    } catch (error) {
      setIsLoadingSubmit(false);
      toast.error('Error updating promotion. Please try again.');
    }
  };

  return (
    <div className="h-full min-h-screen flex flex-row bg-grey">
      <SideNavbar />

      <section className="w-full pl-72 pr-12 pb-10">
        <TopNavbar />

        <div className="flex flex-col gap-7">
          <h1 className="text-mid-blue text-3xl font-bold">Promotion</h1>

          <div className="flex flex-col gap-16">
            <div className="bg-verylight-blue w-4/5 max-2xl:w-full h-fit rounded-lg">
              <div className="bg-white pl-8 py-3.5 rounded-t-lg">
                <p className="text-mid-blue font-bold text-lg">
                  Edit Promotion
                </p>
              </div>

              <div className="p-8">
                {isLoading ? (
                  <Loading />
                ) : isError ? (
                  <p className="font-medium text-red-500">
                    Promotion data could not be loaded.
                  </p>
                ) : (
                  <form
                    className="flex flex-row gap-12"
                    onSubmit={handleFormSubmit}
                  >
                    <div className="flex flex-col gap-2 items-center">
                      <p className="font-medium">Picture</p>
                      <UploadPhoto
                        currentPhoto={formState.photo}
                        onPhotoChange={handlePhotoChange}
                      />
                    </div>

                    <div className="flex flex-col gap-5 grow">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="description" className="font-medium">
                          Text
                        </label>
                        <textarea
                          id="description"
                          className="textarea-field h-56"
                          placeholder="Description about the promotion"
                          autoComplete="off"
                          value={formState.description}
                          onChange={(e) =>
                            setFormState({
                              ...formState,
                              description: e.target.value,
                            })
                          }
                        ></textarea>
                      </div>

                      <button type="submit" className="btn-primary--small">
                        Save
                        {isLoadingSubmit && (
                          <img
                            src={loadingWhiteIcon}
                            alt="Loading Icon"
                            className="animate-spin w-6 h-6 ml-2"
                          />
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PromotionsEdit;
