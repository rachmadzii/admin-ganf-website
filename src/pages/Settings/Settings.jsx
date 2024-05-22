import { useState, useEffect, useContext } from 'react';
import { defaultProfile, loadingWhiteIcon } from '../../assets';
import { Loading, SideNavbar, TopNavbar } from '../../components';
import { ProfileContext } from '../../contexts/ProfileContext';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-toastify';

const Settings = () => {
  const { profile, isLoading, isError } = useContext(ProfileContext);
  const [formState, setFormState] = useState({});
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (profile) {
      setFormState({
        photo: profile.photo || defaultProfile,
        username: profile.username || '',
        email: profile.email || '',
        password: profile.password || '',
        phoneNumber: profile.phoneNumber || '',
      });
    }
  }, [profile]);

  const handleChange = () => setIsDisabled(false);

  const handleCancel = () => {
    setIsDisabled(true);
    setFormState((prevState) => ({ ...prevState }));
  };

  const handleInputChange = (e) =>
    setFormState({ ...formState, [e.target.id]: e.target.value });

  const setPlaceholder = (key) => {
    const placeholders = {
      email: 'example@gmail.com',
      password: '8 characters, special character, and Uppercase letter',
      phoneNumber: 'Example 628098347562',
    };
    return placeholders[key] || `Your ${key}`;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoadingSubmit(true);

    const { username, email, password, phoneNumber, photo } = formState;

    if (!username || !email || !password || !phoneNumber) {
      setIsLoadingSubmit(false);
      return toast.error('Please fill in all required fields.');
    }

    try {
      const formData = new FormData();
      formData.append('photo', photo);
      formData.append('username', username);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('phoneNumber', phoneNumber);

      const newProfile = photo.includes('firebasestorage')
        ? { photo, username, email, password, phoneNumber, role: profile.role }
        : formData;

      await axiosInstance.put('/auth/profile', newProfile);
      toast.success('Profile updated successfully.');
      setIsLoadingSubmit(false);
      setIsDisabled(true);
    } catch (error) {
      setIsLoadingSubmit(false);
      toast.error('Error updating profile. Please try again.');
    }
  };

  return (
    <div className="h-full min-h-screen flex flex-row bg-grey">
      <SideNavbar />
      <section className="w-full pl-72 pr-12 pb-10">
        <TopNavbar />
        <div className="flex flex-col gap-7">
          <h1 className="text-mid-blue text-3xl font-bold">Settings</h1>
          <div className="flex flex-col gap-16">
            <div className="bg-verylight-blue w-4/5 max-2xl:w-full h-fit rounded-lg">
              <div className="bg-white pl-8 py-3.5 rounded-t-lg">
                <p className="text-mid-blue font-bold text-lg">My Account</p>
              </div>
              <div className="p-8">
                {isLoading ? (
                  <Loading />
                ) : isError ? (
                  <p className="font-medium text-red-500">
                    Profile account data could not be loaded.
                  </p>
                ) : (
                  <form className="flex gap-12" onSubmit={handleFormSubmit}>
                    <div className="flex flex-col items-center pt-3 pl-2">
                      <img
                        src={formState.photo}
                        alt="profile-icon"
                        className="w-32 h-32 object-cover rounded-full"
                      />
                      <p className="font-medium pt-2">{profile.role}</p>
                    </div>
                    <div className="flex flex-col gap-5 flex-grow">
                      {Object.entries(formState).map(
                        ([key, value]) =>
                          key !== 'photo' && (
                            <div key={key} className="flex flex-col gap-2">
                              <label htmlFor={key} className="font-medium">
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                              </label>
                              <input
                                id={key}
                                className="input-field"
                                type="text"
                                placeholder={setPlaceholder(key)}
                                value={value}
                                disabled={
                                  key === 'password' ? true : isDisabled
                                }
                                onChange={handleInputChange}
                                autoComplete="off"
                              />
                            </div>
                          )
                      )}
                      <div className="flex gap-3">
                        {isDisabled ? (
                          <button
                            type="button"
                            onClick={handleChange}
                            className="btn-primary--small"
                          >
                            Edit
                          </button>
                        ) : (
                          <div className="flex gap-3">
                            <button
                              type="submit"
                              className="btn-primary--small"
                            >
                              Save
                              {isLoadingSubmit && (
                                <img
                                  src={loadingWhiteIcon}
                                  alt="Loading Icon"
                                  className="animate-spin w-6 h-6 ml-2"
                                />
                              )}
                            </button>
                            <button
                              type="button"
                              onClick={handleCancel}
                              className="btn-primary--small !bg-red-500"
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                      </div>
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

export default Settings;
