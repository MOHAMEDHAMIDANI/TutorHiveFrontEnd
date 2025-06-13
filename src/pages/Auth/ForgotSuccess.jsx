import { Form } from 'antd';
import emailImage from '../../assets/email.png'
import password from '../../assets/password.png'
import { useLocation, useNavigate } from 'react-router-dom';


const ForgotSuccess = () => {

const navigate = useNavigate()
const location = useLocation()

const params = new URLSearchParams(location.search)
const email = params.get('email')

console.log(email);

const handleNext = () => {
    navigate('/auth/change-password/?email=' + email)
}



    return (
        <div className='flex justify-center items-center min-h-screen bg-primary1'>

            <div className='bg-secondary2 px-10 py-6 rounded-xl shadow-md shadow-secondary2 lg:min-w-[500px]'>
                <div className="flex justify-center">
                    <img src={emailImage} alt="" />
                </div>
                <div>
                    <h1 className='font-semibold text-2xl text-center mt-4 '>Check your email</h1>
                    <p className='text-center font-[400] text-sm mt-4 '>Check your email we've sent you otp on </p>

                    <p className='text-center font-[500] text-sm '>{email}</p>
                </div>
                <Form>

                    <div className='mt-6 pb-10'>
                        <button onClick={handleNext} className='w-full !bg-primary1 hover:!bg-sky-400 font-[600]   rounded-xl py-[10px]' htmlType='submit'>
                            <h1 className='text-white font-[600] '   >Next</h1>
                        </button>
                    </div>
                </Form>

            </div>

            <img src={password} className='absolute hidden lg:block bottom-0 right-0' alt="" />


        </div>
    )
}

export default ForgotSuccess
