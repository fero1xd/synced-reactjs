import { twMerge } from 'tailwind-merge';
import { formatDate } from '../../utils/helpers';
import { JobStatus } from '../../utils/types';
import { JobSectionProps } from '../../utils/types/props';

const JobSection: React.FC<JobSectionProps> = ({
  jobs,
  showSeeAll,
  compact,
}) => {
  const thClassname =
    'py-3 text-xs lg:text-sm text-black dark:text-[#bcbcbc] font-semibold tracking-wide text-center';

  const tdClassname =
    'py-3 text-black dark:text-[#A8A8A8] font-medium text-center text-xs lg:text-sm';

  return (
    <div className='w-full space-y-5 font-inter mt-10 transition-colors duration-300 ease-in-out'>
      <h2 className='text-[22px] font-bold'>Jobs</h2>

      <table className='w-full bg-white dark:bg-[#151515] text-center divide-y-2 divide-[#1C1C1C] rounded-md shadow-md table-fixed'>
        <thead>
          <tr className='divide-x-2 divide-[#1C1C1C] opacity-[80%]'>
            <th className={thClassname}>Id</th>
            {compact ? (
              <>
                <th className={thClassname}>Sub. At</th>
                <th className={thClassname}>St. At</th>
                <th className={thClassname}>Comp. At</th>
                <th className={thClassname}>Status</th>
              </>
            ) : (
              <>
                <th className={thClassname}>Submitted At</th>

                <th className={thClassname}>Started At</th>

                <th className={thClassname}>Compiled At</th>

                <th className={thClassname}>Status</th>
              </>
            )}
          </tr>
        </thead>

        {jobs.length ? (
          <>
            <tbody className='divide-y-2 divide-[#1C1C1C]'>
              {jobs.map((job) => (
                <tr
                  className='divide-x-2 divide-[#1C1C1C] opacity-[80%]'
                  key={job.id}
                >
                  <td className={tdClassname}>{job.id}</td>
                  <td className={tdClassname}>{formatDate(job.submittedAt)}</td>
                  <td className={tdClassname}>
                    {job.startedAt ? (
                      formatDate(job.startedAt)
                    ) : (
                      <div
                        role='status'
                        className='max-w-sm animate-pulse px-6'
                      >
                        <div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-800  mb-4' />
                        <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-800' />
                      </div>
                    )}
                  </td>
                  <td className={tdClassname}>
                    {job.compiledAt ? (
                      formatDate(job.compiledAt)
                    ) : (
                      <div
                        role='status'
                        className='max-w-sm animate-pulse px-6'
                      >
                        <div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-800 mb-4' />
                        <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-800' />
                      </div>
                    )}
                  </td>

                  <td
                    className={twMerge(
                      tdClassname,
                      `${
                        job.status === JobStatus.SUCCESS
                          ? 'text-[#399638] dark:text-[#399638]'
                          : job.status === JobStatus.ERROR &&
                            'text-red-500 dark:text-red-500'
                      } opacity-[86%]`
                    )}
                  >
                    {job.status.toUpperCase()}
                  </td>
                </tr>
              ))}
              {showSeeAll && (
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
              )}
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
