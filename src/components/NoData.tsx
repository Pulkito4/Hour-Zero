import { FolderX } from 'lucide-react';
import Link from 'next/link';

const nodatalist = [
    " There are no subjects available for the selected branch and semester.",
    "Uh Oh! You ended up on the wrong side of the website.",
    "Simon says, 'No data found!",
    "Looks like the data is on a vacation.",
    "Sorry, no data available for the selected branch and semester.",
    "The data you are looking for is not here.",
    "The data is missing in action.",
    "The data is not available at the moment.",

]

export const NoData = () => {
  return (
    <div className="flex p-3  flex-col font-work-sans items-center justify-center min-h-[300px] space-y-4">
      <FolderX className="w-16 h-16 text-red " />
      <h2 className="text-2xl font-bold text-white">No Data Found</h2>
      <p className="text-gray-400 text-center max-w-md">
        {nodatalist[Math.floor(Math.random() * nodatalist.length)]}
      </p>
      <h2 className='text-white text-xl p-2 font-semibold'>GO BACK TO <span className='text-primary-light hover:text-primary-200'>
        <Link href='/'>HOME</Link>
        </span></h2>
    </div>
  );
};