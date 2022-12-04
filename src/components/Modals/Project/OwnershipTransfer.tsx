import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { transferOwnership } from '../../../utils/api';
import ModalContext from '../../../utils/context/ModalContext';
import { mergeObject, setShowModal } from '../../../utils/helpers';
import {
  PartialProject,
  Project,
  TransferOwnershipParams,
  User,
} from '../../../utils/types';
import ConfirmationModal from '../ConfirmationModal';

const OwnershipTransfer = () => {
  const {
    setModals,
    modals: {
      projectOwnershipTransfer: { data },
    },
  } = useContext(ModalContext);
  const queryClient = useQueryClient();

  const project = data?.project as Project;
  const selectedCollaborator = data?.selectedCollaborator as User;

  const transferOwnershipMutation = useMutation(
    (data: TransferOwnershipParams) => transferOwnership(data),
    {
      onSuccess: (data: Partial<Project>) => {
        const key = ['projects', data.id!.toString()];
        const project = queryClient.getQueryData(key) as Project;
        queryClient.setQueryData(key, mergeObject(project, data));
        toast.warning('Ownership Transfered !');
      },
    }
  );

  const handleConfirm = () => {
    transferOwnershipMutation.mutateAsync({
      projectId: project.id.toString(),
      userToTransferEmail: selectedCollaborator.email,
    });
    closeModal();
  };

  const closeModal = () =>
    setShowModal({
      setModals,
      name: 'projectOwnershipTransfer',
      show: false,
      data,
    });

  return (
    <ConfirmationModal
      handleConfirm={handleConfirm}
      handleCancelation={closeModal}
    >
      Transfer Project Ownership to{' '}
      <span className='text-red-400'>{selectedCollaborator.name}?</span>
    </ConfirmationModal>
  );
};

export default OwnershipTransfer;
