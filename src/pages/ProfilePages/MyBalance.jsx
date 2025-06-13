import React from 'react'

const MyBalance = () => {

    

    const data = [
        { color: '#69CBF7', name: 'Basic', detail: 'For large teams & corportaions', price: 'Free', time: 'Per Week', features: ['100 Points / month', 'Basic support', 'Access to limited offers', 'View balance anytime', '1 transcription / month'] },
        { color: '#FFC107', name: 'Premium', detail: 'For large teams & corportaions', price: '99.00', time: 'Per Year', features: ['500 Points / month', 'Priority support', 'Access to special offers', 'View balance anytime', '1 transcription / month'] },
        { color: '#AB3300', name: 'Enterprise', detail: 'For large teams & corportaions', price: '199.00', time: 'Per Year', features: ['1000 Points / month', 'Dedicated support', 'Access to special offers', 'View balance anytime', '1 transcription / month'] },
    ]

    return (
        <div>
            <h1 className='text-[20px] font-[700] mb-2'>My Balance </h1>
            <div className='bg-white px-20 max-md:px-4 py-10 rounded-xl w-full'>
                <h1 className='text-[16px] font-[400] text-gray-300'>Total Balance</h1>
                <h1 className='text-[30px] font-[600] text-primary1 mt-2'>500 Points</h1>
                <h1 className='text-[20px] font-[600] mt-4'>Purchase Points</h1>
                <div className="grid grid-cols-3  max-md:grid-cols-1 max-lg:grid-cols-2 gap-6 mt-6">
                    {data.map((item, index) => (
                        <div className='bg-white border-[1.5px] hover:border-primary1 border-gray-200 rounded-md pt-10 px-4'>
                            <h1 className='text-[16.75px] font-[600]' style={{ color: item.color }}>{item.name}</h1>
                            <h1 className='text-[10.72px] font-[400] text-gray-300'>{item.detail}</h1>
                            <div className="flex mt-4  ">
                                <h1 className='text-[25.46px] font-[500]'>${item.price}</h1>
                                <h1 className='text-[10.72px] font-[400] mt-auto'>/{item.time}</h1>
                            </div>


                            <h1 className='text-[10.72px] font-[400] mt-10 mb-4'>Features</h1>

                            {item.features.map((features, index) => (
                                <div className="flex gap-2 mt-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.357422 9.69141C0.357422 7.17185 1.41099 4.75549 3.28635 2.97389C5.16172 1.1923 7.70526 0.191406 10.3574 0.191406C13.0096 0.191406 15.5531 1.1923 17.4285 2.97389C19.3039 4.75549 20.3574 7.17185 20.3574 9.69141C20.3574 12.211 19.3039 14.6273 17.4285 16.4089C15.5531 18.1905 13.0096 19.1914 10.3574 19.1914C7.70526 19.1914 5.16172 18.1905 3.28635 16.4089C1.41099 14.6273 0.357422 12.211 0.357422 9.69141ZM9.78676 13.7574L15.5441 6.91994L14.5041 6.12954L9.59476 11.9575L6.11742 9.20501L5.26409 10.1778L9.78676 13.7574Z" fill="#69CBF7" />
                                    </svg>
                                    <h1 className='text-[10.72px] font-[400]'>{features}</h1>
                                </div>
                            ))}
                            <button className='bg-primary1 text-white rounded-lg w-full py-2 px-4 mt-4'>Purchase</button>
                            <h1 className='text-center text-[11px] font-[600] mt-2 pb-10'>Limited Offer</h1>

                        </div>
                    ))}

                </div>


            </div>
        </div>
    )
}

export default MyBalance
