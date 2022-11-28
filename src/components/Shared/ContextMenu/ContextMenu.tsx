import { twMerge } from 'tailwind-merge';
import { ContextMenuProps } from '../../../utils/types/props';

const ContextMenu: React.FC<ContextMenuProps> = ({
  top,
  left,
  children,
  className,
}) => {
  return (
    <div
      className={twMerge(
        'font-inter rounded-md absolute w-[160px] bg-white dark:bg-[#292929] shadow-md',
        className
      )}
      style={{
        top: `${top}px`,
        left: `${left}px`,
      }}
    >
      <ul className='px-2 py-4'>{children}</ul>
    </div>
  );
};

export default ContextMenu;
