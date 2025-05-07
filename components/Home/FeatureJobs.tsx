import React from 'react'
import { Heading, JobCard } from '../../paths'
import JobData from '@/data'
import Link from 'next/link'
const FeatureJobs = () => {
    return (
        <div>
            <Heading mainHeading={'Trabajos destacados'} subHeading={'Conoce tu valor y encuentra el trabajo que mejore tu calidad de vida'} />

            <div className='mt-12 w-[80%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12'>
                {JobData?.map((job) => {
                    return <Link key={job?.id} href={`job/jobDetails/${job?.id}`}>
                        <JobCard job={job} />
                    </Link>
                })}

            </div>

            <Link href={"/job/alljobs"}>
                <div className='text-center mt-12'>
                    <button type='button' className='transition-transform duratio300 bg-blue-600 hover:bg-blue-800 px-8 py-2 font-semibold text-white rounded-lg'>
                        View All Jobs
                    </button>
                </div>
            </Link>

        </div>
    )
}

export default FeatureJobs