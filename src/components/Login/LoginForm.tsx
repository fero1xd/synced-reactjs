import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaCircleNotch, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Shared/Button';
import Input from '../../components/Shared/Input';
import { postLoginUser } from '../../utils/api';
import { UserCredentialParams } from '../../utils/types';
import { toast } from 'react-toastify';
import { SocketContext } from '../../utils/context/SocketContext';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserCredentialParams>({ reValidateMode: 'onBlur' });

  const navigate = useNavigate();
  const socket = useContext(SocketContext);

  const onSubmit = async (data: UserCredentialParams) => {
    try {
      await postLoginUser(data);
      toast.clearWaitingQueue();
      socket.connect();

      navigate('/home');
    } catch (err) {
      console.log(err);
      toast.clearWaitingQueue();
      toast('Error while Logging In', { type: 'error', icon: true });
    }
  };

  return (
    <form
      className='w-[800px] flex items-center justify-between flex-col h-[500px] px-4'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='w-full flex flex-col items-center justify-center'>
        <h1 className='text-heading font-bold text-center drop-shadow-md flex items-center gap-4 mb-20'>
          <FaCircleNotch className='hidden md:inline lg:inline' />
          Login Into Your Account
        </h1>

        <div className='w-full flex flex-col gap-14'>
          <div className='w-full'>
            {errors.email && (
              <p className='text-sm text-red-500 mb-2'>
                {errors.email.message}
              </p>
            )}
            <Input
              autoComplete='off'
              id='email'
              className='w-full'
              placeholder='Email'
              formValidation={{
                register,
                errors,
                id: 'email',
                options: {
                  required: 'Email is Required',
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Please enter a valid email',
                  },
                },
              }}
            />
          </div>

          <div className='w-full'>
            {errors.password && (
              <p className='text-sm text-red-500 mb-2'>
                {errors.password.message}
              </p>
            )}
            <div className='w-full relative'>
              <Input
                autoComplete='off'
                id='password'
                type={showPassword ? 'text' : 'password'}
                className='w-full'
                placeholder='Password'
                formValidation={{
                  register,
                  errors,
                  id: 'password',
                  options: {
                    required: 'Password is Required',
                    minLength: {
                      value: 8,
                      message: 'Password too short',
                    },
                    maxLength: {
                      value: 16,
                      message: 'Password too long',
                    },
                  },
                }}
              />

              {showPassword ? (
                <>
                  <FaEye
                    className='absolute right-0 top-6 mr-4 h-5 w-5 cursor-pointer drop-shadow-md'
                    onClick={() => {
                      setShowPassword((prev) => !prev);
                    }}
                  />
                </>
              ) : (
                <>
                  <FaEyeSlash
                    className='absolute right-0 top-6 mr-4 h-5 w-5 cursor-pointer drop-shadow-md'
                    onClick={() => {
                      setShowPassword((prev) => !prev);
                    }}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        <Button type='submit'>
          <span className='drop-shadow-md'>Login</span>
          <svg
            viewBox='0 0 25 25'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='absolute right-5 drop-shadow-md w-4 h-4'
          >
            <path
              d='M22.6562 7.8125H2.34375C2.13655 7.8125 1.93784 7.89481 1.79132 8.04132C1.64481 8.18784 1.5625 8.38655 1.5625 8.59375L1.5625 10.1562C1.5625 10.3635 1.64481 10.5622 1.79132 10.7087C1.93784 10.8552 2.13655 10.9375 2.34375 10.9375H22.6562C22.8635 10.9375 23.0622 10.8552 23.2087 10.7087C23.3552 10.5622 23.4375 10.3635 23.4375 10.1562V8.59375C23.4375 8.38655 23.3552 8.18784 23.2087 8.04132C23.0622 7.89481 22.8635 7.8125 22.6562 7.8125ZM22.6562 20.3125H2.34375C2.13655 20.3125 1.93784 20.3948 1.79132 20.5413C1.64481 20.6878 1.5625 20.8865 1.5625 21.0938L1.5625 22.6562C1.5625 22.8635 1.64481 23.0622 1.79132 23.2087C1.93784 23.3552 2.13655 23.4375 2.34375 23.4375H22.6562C22.8635 23.4375 23.0622 23.3552 23.2087 23.2087C23.3552 23.0622 23.4375 22.8635 23.4375 22.6562V21.0938C23.4375 20.8865 23.3552 20.6878 23.2087 20.5413C23.0622 20.3948 22.8635 20.3125 22.6562 20.3125ZM6.84082 4.6875H18.1597C18.2372 4.6875 18.314 4.67221 18.3857 4.64252C18.4573 4.61282 18.5224 4.56929 18.5773 4.51442C18.6321 4.45955 18.6756 4.39442 18.7052 4.32274C18.7348 4.25106 18.7501 4.17424 18.75 4.09668V2.15283C18.75 2.07531 18.7347 1.99854 18.7051 1.92692C18.6754 1.8553 18.6319 1.79022 18.5771 1.7354C18.5223 1.68059 18.4572 1.6371 18.3856 1.60744C18.314 1.57777 18.2372 1.5625 18.1597 1.5625H6.84082C6.76326 1.56244 6.68644 1.57766 6.61476 1.6073C6.54308 1.63693 6.47795 1.68041 6.42308 1.73523C6.36821 1.79006 6.32468 1.85515 6.29498 1.92681C6.26529 1.99846 6.25 2.07527 6.25 2.15283V4.09668C6.25 4.25338 6.31225 4.40365 6.42305 4.51445C6.53385 4.62525 6.68412 4.6875 6.84082 4.6875ZM18.1597 17.1875C18.2372 17.1875 18.314 17.1722 18.3857 17.1425C18.4573 17.1128 18.5224 17.0693 18.5773 17.0144C18.6321 16.9596 18.6756 16.8944 18.7052 16.8227C18.7348 16.7511 18.7501 16.6742 18.75 16.5967V14.6528C18.75 14.4963 18.6878 14.3461 18.5771 14.2354C18.4664 14.1247 18.3162 14.0625 18.1597 14.0625H6.84082C6.76326 14.0624 6.68644 14.0777 6.61476 14.1073C6.54308 14.1369 6.47795 14.1804 6.42308 14.2352C6.36821 14.2901 6.32468 14.3552 6.29498 14.4268C6.26529 14.4985 6.25 14.5753 6.25 14.6528V16.5967C6.25 16.6743 6.26528 16.7511 6.29497 16.8228C6.32467 16.8945 6.36818 16.9596 6.42305 17.0145C6.47791 17.0693 6.54304 17.1128 6.61472 17.1425C6.6864 17.1722 6.76323 17.1875 6.84082 17.1875H18.1597Z'
              fill='white'
            />
          </svg>
        </Button>
        <p
          className='text-link text-xs mt-2 underline cursor-pointer text-center'
          onClick={() => navigate('/register')}
        >
          Don't have an Account?
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
