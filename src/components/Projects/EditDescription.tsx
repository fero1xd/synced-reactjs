import React from 'react';
import { EditDescriptionProps } from '../../utils/types/props';

const EditDescription: React.FC<EditDescriptionProps> = ({
  description,
  handleChange,
}) => {
  return (
    <div className='w-full mt-auto space-y-5 mb-20'>
      <h2 className='text-[28px] font-bold'>Description</h2>
      <div className='w-full h-[150px] bg-white dark:bg-input rounded-lg shadow-md px-7 py-6'>
        <textarea
          placeholder='Describe your project'
          className='placeholder:opacity-50 w-full bg-white dark:bg-input outline-none border-none h-full resize-none text-gray-400'
          maxLength={255}
          value={description}
          onChange={handleChange}
          id='description'
        />
      </div>
    </div>
  );
};

export default EditDescription;
