import React from 'react';
import './CheckboxFilter.css';

const CheckboxFilter = ({categoryFilter, handleCategoryFilterChange}) => {

    const categories = ["men's clothing", "women's clothing", "jewelery", "electronics"]
  return (
    <div className="filter">
            {/* LOCATION BASED FILTERS */}
        <h2>Categories</h2>
        {categories.map((category, index) => (
          <div key={index}>
            <input
              type="checkbox"
              value={category}
              checked={categoryFilter.includes(category)}
              onChange={handleCategoryFilterChange}
            />
            <label>{category}</label>
        
          </div>
        ))}
    </div>
  )
        }


export default CheckboxFilter;