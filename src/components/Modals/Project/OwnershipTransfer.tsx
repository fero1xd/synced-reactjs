import { useContext } from 'react';
import ModalContext from '../../../utils/context/ModalContext';
import { setShowModal } from '../../../utils/helpers';
import { PartialProject, User } from '../../../utils/types';
import ConfirmationModal from '../ConfirmationModal';

const OwnershipTransfer = () => {
  const {
    setModals,
    modals: {
      projectOwnershipTransfer: { data },
    },
  } = useContext(ModalContext);

  const { project, selectedCollaborator } = data as {
    project: PartialProject;
    selectedCollaborator: User;
  };

  console.log(project, selectedCollaborator);
  const closeModal = () =>
    setShowModal({ setModals, name: 'projectOwnershipTransfer', show: false });
  return (
    <ConfirmationModal
      handleConfirm={closeModal}
      handleCancelation={closeModal}
    >
      Transfer Project Ownership to <span className='text-red-400'>John?</span>
    </ConfirmationModal>
  );
};

export default OwnershipTransfer;
