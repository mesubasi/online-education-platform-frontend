//Register.jsx

import { Button, Form, Input, Carousel, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import AuthCarousel from '../../components/auth/AuthCarousel';
import { useState } from 'react';
import Logo from "../../../public/cap.png";


const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState();

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const res = await fetch(process.env.REACT_APP_SERVER_URL + "/register", {
                method: "POST",
                body: JSON.stringify(values),
                headers: { "Content-Type": "application/json; charset=UTF-8" }
            });

            const data = await res.json();

            if (res.status === 200) {
                message.success(data.success);
                setTimeout(() => {
                    navigate("/login");
                }, 3000);
            }


        } catch (err) {
            message.error("Oops. Something Went Wrong!");
            console.log(err);
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className='h-screen'>
            <div className='flex justify-between h-full'>
                <div className='xl:px-20 px-10 w-full flex flex-col h-full justify-center relative'>
                    <div className='flex justify-center items-center max-h-screen pb-5'>
                        <div className='max-w-20'>
                            <img src={Logo} className='w-full' />
                        </div>
                    </div>
                    <Form layout='vertical' size='large' onFinish={onFinish}>
                        <Form.Item label="Username" className='font-semibold' name={"username"} rules={[{ required: true, message: "Username Cannot Be Blank!" }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Email" className='font-semibold' name={"email"} rules={[{ required: true, message: "Email Cannot Be Blank!" }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Password" className='font-semibold' name={"password"} rules={[{ required: true, message: "Password Cannot Be Blank!" }]}>
                            <Input.Password />
                        </Form.Item>
                        <Form.Item label="Password Again" className='font-semibold' name={"passwordAgain"} dependencies={["password"]} rules={[{ required: true, message: "Password Again Cannot Be Blank!" }, ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error("The password that you entered do not match!"));
                            },
                        }),]}>
                            <Input.Password />
                        </Form.Item>
                        <Form.Item>
                            <Button type='primary' htmlType='submit' className='w-full bg-[#EC4837]' size='large' loading={loading}>Register</Button>
                        </Form.Item>
                    </Form>
                    <div className='flex justify-center absolute left-0 bottom-10 w-full font-semibold'>
                        Do you have an account? &nbsp;
                        <Link to="/login" className='text-[#EC4837]'>
                            Login Now</Link>
                    </div>
                </div>
                <div className='xl:w-4/6 lg:w-3/5 md:w-1/2 md:flex hidden bg-[#EC4837]'>
                    <div className='w-full h-full flex items-center'>
                        <div className='w-full'>
                            <Carousel className='!h-full px-6' autoplay autoplaySpeed={3000}>
                                <AuthCarousel img="/images/responsive.svg" title="Responsive" desc="Compatibility with All Device Sizes" />
                                <AuthCarousel img="/images/statistic.svg" title="Statistics" desc="Expanded Statistics" />
                                <AuthCarousel img="/images/customer.svg" title="Student Satisfaction" desc="Students Satisfied with the Education at the End of the Experience" />
                                <AuthCarousel img="/images/admin.svg" title="Panel" desc="One-Stop Management" />
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Register