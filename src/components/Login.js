
import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #e8f5e9;
`;

const Form = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  margin-bottom: 1rem;
  padding: 0.5rem;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: #45a049;
  }
`;

const Link = styled.a`
  margin-top: 1rem;
  display: block;
  color: #4CAF50;
  text-align: center;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

function Login() {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/login', {
        mobile,
        password
      });

      if (response.data.user_id) {
        alert(`Signin successful. User ID: ${response.data.user_id}`);
        navigate('/head', { state: { id: response.data.user_id } }); 
      } else {
        
        alert('Incorrect password or mobile number');
      }
    } catch (error) {
      console.error('Error signing in:', error);
      alert('Login failed');
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h2>Login to QuickReserve</h2>
        <Input
          type="number"
          placeholder="Mobile No."
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Login</Button>
        <Link href="/">Don't have an account? Sign up</Link>
      </Form>
    </Container>
  );
}

export default Login;