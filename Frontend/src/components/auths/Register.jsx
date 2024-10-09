import React, { useState } from 'react';
import './Register.scss';
import { Grid, Typography, Button, Box } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // Import Axios

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '', 
    contactNumber: ''
  });
  
  const navigate = useNavigate();

  const { firstname, lastname, contactNumber, email, username, password, confirmPassword } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!firstname || !lastname || !email || !username || !password || !confirmPassword || !contactNumber) {
      toast.error('All fields are required');
      return false;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }

    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const body = {
        firstname,
        lastname,
        contactNumber,
        email,
        username,
        password,
        confirmPassword
      };

      const response = await axios.post('http://localhost:5000/signup/register', body);

    
      toast.success('Registration successful!', {
        autoClose: 2000, // Toast will be shown for 2 seconds
      });
  
      // Delay the navigation to allow toast to display
      setTimeout(() => {
        navigate('/login');
      }, 2000); // Navigate after 2 seconds
      
      
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = error.response?.data?.error || 'Something went wrong. Please try again.';
      toast.error(errorMessage);
    }
  };

  return (
    <div className='register-container'>
      <ToastContainer />
      <Grid container>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" fontWeight="bold" style={{ textAlign: 'center', marginTop: '50px' }}>
            Easy. Quick. Efficient.
          </Typography>
          <Box sx={{ display: 'Grid', alignItems: 'center', height: '80%', flexWrap: 'wrap', marginLeft: '50px' }}>
            <div>
              <img
                className='image-reduced1'
                src='https://img.freepik.com/premium-photo/professional-bill-design-money-banking-finance-commerce-market_1316704-24000.jpg?uid=R154751350&ga=GA1.1.1985983126.1725981835&semt=ais_hybrid'
                alt="Personalized loans"
              />
            </div>
            <Button onClick={() => navigate("/")} style={{ marginLeft: '-100px' }}>Get Started</Button>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <form onSubmit={onSubmit} className='register-form'>
            <Typography variant="h4" fontWeight="bold" style={{ textAlign: 'center', marginBottom: '30px', marginTop:'5px', fontSize:'30px' }}>
              Sign Up
            </Typography>
            <div className='register-form__row'>
              <div className='register-form__group'>
                <label htmlFor='firstname' className='register-form__label'>First Name:</label>
                <input type='text' name='firstname' value={firstname} onChange={onChange} className='register-form__input' placeholder='Enter your first name' required />
              </div>
              <div className='register-form__group'>
                <label htmlFor='lastname' className='register-form__label'>Last Name:</label>
                <input type='text' name='lastname' value={lastname} onChange={onChange} className='register-form__input' placeholder='Enter your last name' required />
              </div>
            </div>
            <div className='register-form__row'>
              <div className='register-form__group'>
                <label htmlFor='contactNumber' className='register-form__label'>Contact Number:</label>
                <input type='number' name='contactNumber' value={contactNumber} onChange={onChange} className='register-form__input' placeholder='Contact Number' required />
              </div>
              <div className='register-form__group'>
                <label htmlFor='email' className='register-form__label'>Email:</label>
                <input type='email' name='email' value={email} onChange={onChange} className='register-form__input' placeholder='Input your email address' required />
              </div>
            </div>
            <div className='register-form__group'>
              <label htmlFor='username' className='register-form__label'>Username:</label>
              <input type='text' name='username' value={username} onChange={onChange} className='register-form__input' placeholder='Choose a username' required />
            </div>
            <div className='register-form__group'>
              <label htmlFor='password' className='register-form__label'>Password:</label>
              <input type='password' name='password' value={password} onChange={onChange} className='register-form__input' placeholder='*************' required />
            </div>
            <div className='register-form__group'>
              <label htmlFor='confirmPassword' className='register-form__label'>Confirm Password:</label>
              <input type='password' name='confirmPassword' value={confirmPassword} onChange={onChange} className='register-form__input' placeholder='*************' required />
            </div>
            <button type='submit' className='register-form__submit'>Create Account</button>
            <div className='register-form__redirect'>
              <span className='register-form__text'>Already have an account? </span>
              <a href='/login' className='register-form__link'>Sign in</a>
            </div>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default Register;
