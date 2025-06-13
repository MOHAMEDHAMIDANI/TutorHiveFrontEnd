import { IoIosStar } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'


const Courses = ({data}) => {

const navigate = useNavigate()

    return (
        <div>

            <h1 className='text-[28px] font-[600] my-6'>Services</h1>

            <div className="grid grid-cols-4 max-md:grid-cols-1 max-lg:grid-cols-2 gap-6 my-10">
                {data?.services?.map((item, index) => (
                    <div onClick={() => navigate(`detail/?id=${item?.id}`)} className={`${index === 0 ? 'bg-primary1' : 'bg-white'} rounded-xl cursor-pointer   shadow-md shadow-gray-100 relative`}>
                        <div className='p-4'>
                            <img src={item.image} alt="" className=' max-w-[288.957px] max-h-[172.303px] object-cover m-auto rounded-xl relative -top-8 ' />
                            <h1 className={`${index === 0 ? 'text-white' : 'text-black'} text-[16px] font-[600] my-2`}>{item.title}</h1>
                            <div className={`${index === 0 ? 'text-white' : 'text-black'}  max-w-[293.615px] font-[400]`} dangerouslySetInnerHTML={{ __html: item?.description }} />   
                            <div className='border-[1px] rounded-l-full rounded-r-full border-gray-400 max-w-[293px] my-4' />
                            <div className="flex justify-between">
                                <h1 className='flex items-center gap-[2px] text-[12px] font-[400] '>{Array(4).fill().map(() => <IoIosStar size={16} className={`${index === 0 ? 'text-white' : 'text-primary1'}`} />)} 4.0  </h1>
                                <h1 className='text-[20px] font-[700]'>{item?.price}$</h1>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

{/*             
            <div className='flex justify-center py-10'>
                <button className='text-white bg-primary1 px-10 rounded-xl py-2 font-[700]'>
                    See More
                </button>
            </div> */}
           

        </div>
    )
}

export default Courses
