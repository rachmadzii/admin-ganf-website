import { useState } from 'react';
import { placeholderPhoto } from '../../assets';
import { toast } from 'react-toastify';

const UploadPhoto = ({ currentPhoto, onPhotoChange }) => {
  const [photo, setPhoto] = useState('');

  if (currentPhoto && !photo) setPhoto(currentPhoto);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File is too large. Maximum file size is 5MB.');
      return;
    }

    onPhotoChange(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPhoto(reader.result);
    };
  };

  return (
    <div>
      <label htmlFor="upload-photo" className="cursor-pointer">
        {photo ? (
          <img src={photo} alt="Product" className="w-40" />
        ) : (
          <div className="photo-wrapper">
            <img
              src={placeholderPhoto}
              alt="placeholderPhoto"
              className="w-7 h-7 mb-1"
            />
            <p>Insert Image</p>
          </div>
        )}
      </label>
      <input
        type="file"
        name="photo"
        id="upload-photo"
        onChange={handlePhotoChange}
      />
    </div>
  );
};

export default UploadPhoto;
