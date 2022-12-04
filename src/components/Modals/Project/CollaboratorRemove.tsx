import ModalContext from '../../../utils/context/ModalContext';
import { Project, RemoveCollaboratorParams, User } from '../../../utils/types';
import ConfirmationModal from '../ConfirmationModal';
import { useContext } from 'react';
import { mergeObject, setShowModal } from '../../../utils/helpers';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeCollaborator } from '../../../utils/api';
import { toast } from 'react-toastify';

const CollaboratorRemove = () => {
  const {
    setModals,
    modals: {
      projectCollaboratorRemove: { data },
    },
  } = useContext(ModalContext);
  const queryClient = useQueryClient();

  const project = data?.project as Project;
  const selectedCollaborator = data?.selectedCollaborator as User;

  const removeCollaboratorMutation = useMutation(
    (data: RemoveCollaboratorParams) => removeCollaborator(data),
    {
      onSuccess: (data: Partial<Project>) => {
        const key = ['projects', data.id!.toString()];
        const project = queryClient.getQueryData(key) as Project;
        queryClient.setQueryData(key, mergeObject(project, data));
        toast.warning('Collaborator Removed !');
      },
    }
  );

  const handleConfirm = () => {
    removeCollaboratorMutation.mutateAsync({
      projectId: project.id,
      userToRemoveEmail: selectedCollaborator.email,
    });
    closeModal();
  };

  const closeModal = () =>
    setShowModal({
      setModals,
      name: 'projectCollaboratorRemove',
      show: false,
      data,
    });

  return (
    <ConfirmationModal
      handleConfirm={handleConfirm}
      handleCancelation={closeModal}
    >
      Remove <span className='text-red-400'>John</span> from this project?
    </ConfirmationModal>
  );
};

export default CollaboratorRemove;
