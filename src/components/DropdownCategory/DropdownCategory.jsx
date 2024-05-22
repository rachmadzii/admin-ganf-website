import { toast } from 'react-toastify';
import { arrowDown } from '../../assets';
import { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';

const DropdownCategory = ({ selectedCategory, onCategoryChange }) => {
  const [category, setCategory] = useState(
    selectedCategory || 'Select Category'
  );
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('/categories');
        const data = response.data.data;
        setCategories(data);
      } catch (error) {
        toast.error('Error fetching categories. Please try again.');
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setCategory(selectedCategory);
    }
  }, [selectedCategory]);

  const isSelectedCategory = (categoryName) => {
    return categoryName === category ? 'selected' : '';
  };

  const handleSelectCategory = () => {
    const dropdown = document.querySelector('.category-menu');
    dropdown.classList.toggle('hidden');

    const dropdownArrow = document.querySelector('.dropdown-arrow');
    dropdownArrow.classList.toggle('rotate-180');
  };

  const handleSelectCategoryItem = (category) => {
    setCategory(category);
    onCategoryChange(category);
    handleSelectCategory();
  };

  return (
    <div className="dropdown-wrapper">
      <button
        className="dropdown-category"
        onClick={handleSelectCategory}
        type="button"
      >
        <p>{category}</p>
        <img
          src={arrowDown}
          alt="Arrow Dropdown"
          className="dropdown-arrow w-5 h-5"
        />
      </button>

      <div className="category-menu hidden">
        <div className="flex flex-col">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`category-item ${isSelectedCategory(category.name)}`}
              onClick={() => handleSelectCategoryItem(category.name)}
              type="button"
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DropdownCategory;
