import { useContext } from 'react';
import { FaMoon, FaRegMoon } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import ThemeContext from '../../utils/context/ThemeContext';

const ToggleTheme = () => {
  const switchThemeClass = 'absolute top-10 right-10 w-6 h-6 cursor-pointer';
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <>
      {theme === 'dark' ? (
        <FaMoon
          className={switchThemeClass}
          color='white'
          onClick={() => setTheme('light')}
        />
      ) : (
        <FaRegMoon
          className={switchThemeClass}
          onClick={() => setTheme('dark')}
        />
      )}
      <ToastContainer theme={theme} position='bottom-center' limit={2} />
    </>
  );
};

export default ToggleTheme;
