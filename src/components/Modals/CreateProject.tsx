import { useForm } from 'react-hook-form';
import {
  CreateProjectParams,
  PartialProject,
  Project,
  UpdateProjectParams,
} from '../../utils/types';
import Button from '../Shared/Button';
import Input from '../Shared/Input';
import iconMap from '../../utils/iconMap';
import { AvailableLanguages } from '../../utils/types/index';
import React, { useContext, useState } from 'react';
import { MdClose } from 'react-icons/md';
import ModalContext from '../../utils/context/ModalContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProject, updateProject } from '../../utils/api';
import { toast } from 'react-toastify';
import useQueryWithRedirect from '../../hooks/useQueryWithRedirect';
import { motion } from 'framer-motion';
import Select from '../Shared/Select';
import {
  getDirtyFields,
  mergeObject,
  setShowModal,
  toTitleCase,
} from '../../utils/helpers';

const CreateProject = () => {
  const {
    setModals,
    modals: {
      createProject: { data },
    },
  } = useContext(ModalContext);
  const { project } = data as { project: PartialProject };

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, dirtyFields },
    getValues,
  } = useForm<CreateProjectParams>({
    reValidateMode: 'onBlur',
    defaultValues: {
      name: project?.name,
      language: project?.language || AvailableLanguages.PYTHON,
      description: project?.description,
    },
  });

  const { language } = getValues();
  const closeModal = () =>
    setShowModal({ setModals, name: 'createProject', show: false });

  const [currentIcon, setCurrentIcon] = useState<string | undefined>(
    iconMap.get(language)
  );
  const [error, setError] = useState<string>();

  const createMutation = useMutation(
    (data: CreateProjectParams) => createProject(data),
    {
      onSuccess: (data: PartialProject) => {
        const projects = queryClient.getQueryData([
          'projects',
          'private',
        ]) as PartialProject[];

        projects.unshift(data);

        queryClient.setQueryData(['projects', 'private'], projects);

        toast.success('Project Created Successfully');

        closeModal();
      },
      ...useQueryWithRedirect(),
    }
  );

  const updateMutation = useMutation(
    (data: UpdateProjectParams) => updateProject(data),
    {
      onSuccess: (data: Partial<Project>) => {
        const key = ['projects', project.isPublic ? 'public' : 'private'];

        let projects = queryClient.getQueryData<PartialProject[]>(key)!;

        const old = projects.find((p) => p.id === data.id);
        const updated = mergeObject(old, data);
        projects = projects.filter((p) => p.id !== data.id);

        projects.unshift(updated);

        queryClient.setQueryData(key, projects);
        toast.success('Project Updated Successfully');
        closeModal();
      },
      ...useQueryWithRedirect(),
    }
  );

  const onSubmit = (data: CreateProjectParams) => {
    if (!project) {
      createMutation.mutateAsync(data);
    } else {
      if (!isDirty) return setError('No Update Seen');

      const fields = getDirtyFields(dirtyFields, data);

      updateMutation.mutateAsync({ id: project.id.toString(), ...fields });
    }
  };

  return (
    <div
      className='px-4 w-[100%] h-[100%] fixed top-0 left-0 flex items-center justify-center bg-modal font-inter'
      style={{ zIndex: 9999 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{ duration: 0.3 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className='w-[600px]'
      >
        <form
          className='px-10 py-10 rounded-md bg-[#f6f6f6] dark:bg-[#121212] flex flex-col gap-10 items-start justify-center relative'
          onSubmit={handleSubmit(onSubmit)}
        >
          <MdClose
            className='absolute w-5 h-5 right-5 top-5 cursor-pointer fill-black dark:fill-white'
            onClick={() => {
              setShowModal({ setModals, name: 'createProject', show: false });
            }}
          />
          <div className='w-full space-y-3'>
            <div className='w-full flex justify-between items-center'>
              <h2 className='font-semibold text-black dark:text-white'>Name</h2>
              {errors.name && (
                <p className='text-sm text-red-500 mb-2'>
                  {errors.name.message}
                </p>
              )}
            </div>
            <Input
              placeholder='Cool Project'
              className='w-full'
              formValidation={{
                id: 'name',
                register,
                errors,
                options: {
                  required: 'Name is required',
                  minLength: {
                    value: 2,
                    message: 'Name too short',
                  },
                  maxLength: {
                    value: 50,
                    message: 'Name is too long',
                  },
                },
              }}
            />
          </div>
          <div className='w-full space-y-3'>
            <div className='w-full flex justify-between items-center'>
              <h2 className='font-semibold text-black dark:text-white'>
                Language
              </h2>
              {errors.language && (
                <p className='text-sm text-red-500 mb-2'>
                  {errors.language.message}
                </p>
              )}
            </div>

            <div className='w-full flex gap-4 items-center justify-center'>
              <Select
                formValidation={{
                  id: 'language',
                  register,
                  errors,
                  options: {
                    required: 'You have to select one language',
                    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => {
                      if (e.target.value !== '') {
                        const lang = e.target.value as AvailableLanguages;
                        setCurrentIcon(iconMap.get(lang) || undefined);
                      }
                    },
                  },
                }}
                defaultValue={language}
              >
                {Object.values(AvailableLanguages).map((l) => (
                  <option key={l} value={l}>
                    {toTitleCase(l)}
                  </option>
                ))}
              </Select>
              <div className='w-[41px] h-[41px]'>
                {currentIcon && (
                  <img
                    src={currentIcon}
                    alt='Stock'
                    className='h-full object-contain'
                    style={{
                      aspectRatio: 16 / 9,
                    }}
                  />
                )}
              </div>
            </div>
          </div>
          <div className='w-full space-y-3'>
            <div className='w-full flex justify-between items-center'>
              <h2 className='font-semibold text-black dark:text-white'>
                Description
              </h2>
              {errors.description && (
                <p className='text-sm text-red-500 mb-2'>
                  {errors.description.message}
                </p>
              )}
            </div>
            <Input
              placeholder='Explain what your project is about ?'
              className='w-full'
              formValidation={{
                id: 'description',
                register,
                errors,
                options: {
                  required: false,
                  maxLength: {
                    value: 300,
                    message: 'Description is too long',
                  },
                },
              }}
            />
          </div>
          <div className='w-full flex items-center justify-center flex-col mt-10'>
            {error && <p className='text-sm text-red-500 mb-2'>{error}</p>}
            <Button className='self-center font-medium' type='submit'>
              {project ? 'Save Project' : 'Create Project'}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateProject;
