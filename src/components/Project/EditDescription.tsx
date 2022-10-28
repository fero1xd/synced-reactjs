import { debounce } from 'debounce';
import React, { useRef } from 'react';
import { EditDescriptionProps } from '../../utils/types/props';

const EditDescription: React.FC<EditDescriptionProps> = ({
  setValue,
  description,
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className='w-full mt-auto space-y-5 mb-10'>
      <h2 className='text-[20px] font-bold'>Description</h2>
      <div className='w-full h-[150px] bg-white dark:bg-input rounded-lg shadow-md px-7 py-6'>
        <textarea
          ref={textAreaRef}
          defaultValue={description}
          maxLength={300}
          placeholder='Describe your project'
          className='placeholder:opacity-50 w-full bg-white dark:bg-input outline-none border-none h-full resize-none text-gray-400'
          onChange={debounce(() => {
            console.log(textAreaRef.current!.value);
            setValue('description', textAreaRef.current!.value, {
              shouldDirty: true,
            });
          }, 1500)}
        />
      </div>
    </div>
  );
};

export default EditDescription;