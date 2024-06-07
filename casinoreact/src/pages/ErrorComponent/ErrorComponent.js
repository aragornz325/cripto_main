import React from 'react';
import { Info, Link, Title } from './styles';
import Layout from '../../components/Layout';

function ErrorComponent() {
  return (
    <>
      <Title>Error 404</Title>
      <Info>The page you are looking for is not available or does not exist. Please check the url you submitted and try again.</Info>
    </>
  )
}

export default ErrorComponent;