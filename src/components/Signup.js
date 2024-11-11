import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

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

function Signup() {
  const [username, setUsername] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      await axios.post('http://localhost:5000/signup', {
        username,
        mobile,
        password
      });
      alert('Sign up successful');
      navigate('/login');
    } catch (error) {
      console.error('Error signing up:', error);
      alert('Sign up failed');
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h2>Sign Up for QuickReserve</h2>
        <Input
          type="text"
          placeholder="User Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button type="submit">Sign Up</Button>
        <Link href="/login">Already have an account? Login</Link>
      </Form>
    </Container>
  );
}

export default Signup;