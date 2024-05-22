import { useParams } from 'react-router-dom';
import { Loading, SideNavbar, TopNavbar } from '../../components';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import UploadPhoto from '../../components/UploadPhoto/UploadPhoto';
import DropdownCategory from '../../components/DropdownCategory/DropdownCategory';
import axiosInstance from '../../utils/axiosInstance';
import { loadingWhiteIcon } from '../../assets';

const ProductsEdit = () => {
  const { id } = useParams();
  const [formState, setFormState] = useState({
    photo: null,
    name: '',
    category: '',
    series: '',
    description: '',
  });
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [newPhoto, setNewPhoto] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`/products/${id}`);
        const data = response.data.data;

        const productData = {
          photo: data.photo,
          name: data.name,
          category: data.category,
          series: data.series || '',
          description: data.description,
        };

        setFormState(productData);
      } catch (error) {
        toast.error('Error fetching product data. Please try again.');
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handlePhotoChange = (newPhoto) => {
    setNewPhoto(newPhoto);
  };

  const handleCategoryChange = (newCategory) => {
    setFormState({ ...formState, category: newCategory });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoadingSubmit(true);

    if (!formState.name || !formState.category || !formState.description) {
      setIsLoadingSubmit(false);
      return toast.error('Please fill in all required fields.');
    }

    const formData = new FormData();

    if (newPhoto) {
      formData.append('photo', newPhoto);
    } else if (formState.photo) {
      formData.append('photo', formState.photo);
    }

    formData.append('name', formState.name);
    formData.append('category', formState.category);
    formData.append('series', formState.series);
    formData.append('description', formState.description);

    try {
      await axiosInstance.put(`/products/${id}`, formData);
      toast.success('Product updated successfully.');

      setIsLoadingSubmit(false);
      window.location = '/product';
    } catch (error) {
      setIsLoadingSubmit(false);
      toast.error('Error updating product. Please try again.');
    }
  };

  return (
    <div className="h-full min-h-screen flex flex-row bg-grey">
      <SideNavbar />

      <section className="w-full pl-72 pr-12 pb-10">
        <TopNavbar />

        <div className="flex flex-col gap-7">
          <h1 className="text-mid-blue text-3xl font-bold">Product</h1>

          <div className="flex flex-col gap-16">
            <div className="bg-verylight-blue w-4/5 max-2xl:w-full h-fit rounded-lg">
              <div className="bg-white pl-8 py-3.5 rounded-t-lg">
                <p className="text-mid-blue font-bold text-lg">Edit Product</p>
              </div>

              <div className="p-8">
                {isLoading ? (
                  <Loading />
                ) : isError ? (
                  <p className="font-medium text-red-500">
                    Product data could not be loaded.
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
                        <label htmlFor="name" className="font-medium">
                          Product Name
                        </label>
                        <input
                          id="name"
                          className="input-field"
                          type="text"
                          value={formState.name}
                          onChange={(e) =>
                            setFormState({ ...formState, name: e.target.value })
                          }
                          placeholder="Product name goes here"
                          autoComplete="off"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <p className="font-medium">Category</p>
                        <DropdownCategory
                          selectedCategory={formState.category}
                          onCategoryChange={handleCategoryChange}
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="seriesName" className="font-medium">
                          Series Name (Optional)
                        </label>
                        <input
                          id="seriesName"
                          className="input-field"
                          type="text"
                          value={formState.series}
                          onChange={(e) =>
                            setFormState({
                              ...formState,
                              series: e.target.value,
                            })
                          }
                          placeholder="Series name for clothing product"
                          autoComplete="off"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="description" className="font-medium">
                          Description
                        </label>
                        <textarea
                          id="description"
                          className="textarea-field h-40"
                          value={formState.description}
                          onChange={(e) =>
                            setFormState({
                              ...formState,
                              description: e.target.value,
                            })
                          }
                          placeholder="Description about the product"
                          autoComplete="off"
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

export default ProductsEdit;
