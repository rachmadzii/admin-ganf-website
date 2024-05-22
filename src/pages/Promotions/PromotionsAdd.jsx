import { toast } from 'react-toastify';
import { loadingWhiteIcon } from '../../assets';
import { SideNavbar, TopNavbar } from '../../components';
import { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import UploadPhoto from '../../components/UploadPhoto/UploadPhoto';

const PromotionsAdd = () => {
  const [formState, setFormState] = useState({
    photo: null,
    description: '',
  });
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  const handlePhotoChange = (newPhoto) => {
    setFormState({ ...formState, photo: newPhoto });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoadingSubmit(true);

    if (!formState.photo) {
      setIsLoadingSubmit(false);
      return toast.error('Please include a image of the promotion.');
    }

    const formData = new FormData();
    formData.append('photo', formState.photo);
    formData.append('description', formState.description);

    try {
      await axiosInstance.post('/promotions', formData);
      toast.success('Promotion added successfully.');

      setIsLoadingSubmit(false);
      window.location = '/promotion';
    } catch (error) {
      setIsLoadingSubmit(false);
      toast.error('Error adding promotion. Please try again.');
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
                <p className="text-mid-blue font-bold text-lg">Add Promotion</p>
              </div>

              <form
                className="flex flex-row gap-12 p-8"
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PromotionsAdd;
