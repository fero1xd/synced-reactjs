import { twMerge } from 'tailwind-merge';
import { ContextMenuItemProps } from '../../../utils/types/props';

const ContextMenuItem: React.FC<ContextMenuItemProps> = ({
  children,
  onClick,
  className,
}) => {
  const finalClassName = twMerge(
    'font-inter p-3 cursor-pointer hover:bg-[#d8d8d8] dark:hover:bg-[#4b4b4b] rounded-md transition-all duration-200 ease-in-out',
    className
  );
  return (
    <li className={finalClassName} onClick={onClick}>
      {children}
    </li>
  );
};

export default ContextMenuItem;
