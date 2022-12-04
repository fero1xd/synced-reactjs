import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import useQueryWithRedirect from '../../../hooks/useQueryWithRedirect';
import { deleteProject } from '../../../utils/api';
import ModalContext from '../../../utils/context/ModalContext';
import { setShowModal } from '../../../utils/helpers';
import { PartialProject, Project } from '../../../utils/types';
import ConfirmationModal from '../ConfirmationModal';

const ProjectDeleteConfirmation = () => {
  const {
    setModals,
    modals: {
      projectDeleteConfirmation: { data },
    },
  } = useContext(ModalContext);

  const project = data?.project as Project;
  const queryClient = useQueryClient();

  const closeModal = () =>
    setShowModal({ setModals, name: 'projectDeleteConfirmation', show: false });

  const deleteProjectMutation = useMutation((id: string) => deleteProject(id), {
    onSuccess: (_, id) => {
      const key = ['projects', data.isPublic ? 'public' : 'private'];

      const projects = queryClient.getQueryData(key) as PartialProject[];

      queryClient.setQueryData(
        key,
        projects.filter((pr) => pr.id.toString() !== id)
      );
    },
    ...useQueryWithRedirect(),
  });

  return (
    <ConfirmationModal
      handleConfirm={async () => {
        deleteProjectMutation.mutateAsync(project.id.toString());
        closeModal();
      }}
      handleCancelation={closeModal}
    >
      Are you sure ? This Action is{' '}
      <span className='text-red-400'>Irreversible!</span>
    </ConfirmationModal>
  );
};

export default ProjectDeleteConfirmation;
