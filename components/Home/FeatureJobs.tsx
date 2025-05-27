import React from 'react'
import { Heading} from '../../paths'
import Link from 'next/link'
const FeatureJobs = () => {
    return (
        <div>
            <Heading mainHeading={'Trabajos destacados'} subHeading={'Conoce tu valor y encuentra el trabajo que mejore tu calidad de vida'} />


            <Link href={"/job/alljobs"}>
                <div className='text-center mt-12'>
                    <button type='button' className='transition-transform duratio300 bg-blue-600 hover:bg-blue-800 px-8 py-2 font-semibold text-white rounded-lg'>
                        Mirar todos los trabajos
                    </button>
                </div>
            </Link>

        </div>
    )
}

export default FeatureJobs