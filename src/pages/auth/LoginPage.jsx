//Login.jsx

import { Button, Form, Input, Carousel, Checkbox, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import AuthCarousel from '../../components/auth/AuthCarousel';
import { useState } from 'react';
import Logo from "../../../public/cap.png";

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState();

    const onFinish = async (values) => {
        try {
            setLoading(true);
            const res = await fetch(process.env.REACT_APP_SERVER_URL + "/login", {
                method: "POST",
                body: JSON.stringify(values),
                headers: { "Content-Type": "application/json; charset=UTF-8" }
            });

            const data = await res.json();

            if (res.status === 200) {
                message.success("Successfully Logged In!");
                navigate("/");
            } else if (res.status === 403) {
                message.error(data.error);
            } else if (res.status === 404) {
                message.error(data.error);
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
                    <Form layout='vertical' size='large' onFinish={onFinish} initialValues={{ remember: false }}>
                        <Form.Item label="Email" name={"email"} rules={[{ required: true, message: "Email Cannot Be Blank!" }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Password" name={"password"} rules={[{ required: true, message: "Password Cannot Be Blank!" }]}>
                            <Input.Password />
                        </Form.Item>
                        <Form.Item name={"remember"} valuePropName='checked'>
                            <div className='flex justify-between items-center'>
                                <Checkbox>
                                    Remember Me
                                </Checkbox>
                                <Link>
                                    Forgot Password?
                                </Link>
                            </div>
                        </Form.Item>
                        <Form.Item>
                            <Button type='primary' htmlType='submit' className="w-full bg-[#EC4837]" size='large' loading={loading}>Sign In</Button>
                        </Form.Item>
                    </Form>
                    <div className='flex justify-center absolute left-0 bottom-10 w-full font-semibold'>
                        Don't have an account yet? &nbsp;
                        <Link to="/register" className='text-[#EC4837]'>
                            Register Now
                        </Link>
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

export default Login;