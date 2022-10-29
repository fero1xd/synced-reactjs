import { twMerge } from 'tailwind-merge';
import { formatDate } from '../../utils/helpers';
import { JobStatus } from '../../utils/types';
import { JobSectionProps } from '../../utils/types/props';

const JobSection: React.FC<JobSectionProps> = ({ lastJobRan }) => {
  const thClassname =
    'w-20 py-5 px-10 text-md text-black dark:text-[#bcbcbc] font-semibold tracking-wide';

  const tdClassname = 'py-3 px-10 text-black dark:text-[#A8A8A8] font-medium';

  return (
    <div className='w-full space-y-5 font-inter mt-10 transition-colors duration-300 ease-in-out'>
      <h2 className='text-[22px] font-bold'>Jobs</h2>

      <table className='w-full bg-white dark:bg-[#151515] text-center divide-y-2 divide-[#1C1C1C] rounded-md shadow-md'>
        <thead>
          <tr className='divide-x-2 divide-[#1C1C1C] opacity-[80%]'>
            <th className={thClassname}>ID</th>
            <th className={thClassname}>Submitted At</th>
            <th className={thClassname}>Started At</th>
            <th className={thClassname}>Compiled At</th>
            <th className={thClassname}>Status</th>
          </tr>
        </thead>

        {lastJobRan ? (
          <>
            <tbody className='divide-y-2 divide-[#1C1C1C]'>
              <tr className='divide-x-2 divide-[#1C1C1C] opacity-[80%]'>
                <td className={twMerge(tdClassname, 'col-span-3')}>
                  {lastJobRan.id}
                </td>
                <td className={tdClassname}>
                  {formatDate(lastJobRan.submittedAt)}
                </td>
                <td className={tdClassname}>
                  {lastJobRan.startedAt
                    ? formatDate(lastJobRan.startedAt)
                    : '-'}
                </td>
                <td className={tdClassname}>
                  {lastJobRan.compiledAt
                    ? formatDate(lastJobRan.compiledAt)
                    : '-'}
                </td>

                <td
                  className={twMerge(
                    tdClassname,
                    `${
                      lastJobRan.status === JobStatus.SUCCESS
                        ? 'text-[#399638] dark:text-[#399638]'
                        : lastJobRan.status === JobStatus.ERROR &&
                          'text-red-500 dark:text-red-500'
                    } opacity-[86%]`
                  )}
                >
                  {lastJobRan.status.toUpperCase()}
                </td>
              </tr>

              <tr className='text-center divide-x-2 divide-[#1C1C1C] opacity-[80%]'>
                <td
                  className={twMerge(
                    tdClassname,
                    'text-center text-link dark:text-link underline cursor-pointer opacity-[100%] py-5'
                  )}
                  colSpan={5}
                >
                  See All
                </td>
              </tr>
            </tbody>
          </>
        ) : (
          <tbody className='divide-y-2 divide-[#1C1C1C]'>
            <tr className='text-center divide-x-2 divide-[#1C1C1C] opacity-[80%]'>
              <td
                className={twMerge(
                  tdClassname,
                  'text-center opacity-[100%] py-5'
                )}
                colSpan={5}
              >
                No Jobs
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};

export default JobSection;
