import React, { useRef } from 'react';
import { EditDescriptionProps } from '../../utils/types/props';

const EditDescription: React.FC<EditDescriptionProps> = ({
  setValue,
  description,
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className='w-full space-y-3 mb-0'>
      <h2 className='text-[18px] lg:text-[20px] font-bold drop-shadow-md text-gray-200'>
        Description
      </h2>
      <div className='w-full h-[150px] bg-white dark:bg-input rounded-lg shadow-md px-7 py-6'>
        <textarea
          ref={textAreaRef}
          value={description || ''}
          maxLength={300}
          placeholder='Describe your project'
          className='placeholder:opacity-50 w-full bg-white dark:bg-input outline-none border-none h-full resize-none text-gray-400 text-sm lg:text-base'
          onChange={(e) => {
            setValue('description', e.target.value, {
              shouldDirty: true,
            });
          }}
        />
      </div>
    </div>
  );
};

export default EditDescription;
