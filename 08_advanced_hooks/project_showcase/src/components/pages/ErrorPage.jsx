import React from 'react'
import { useRouteError } from 'react-router-dom'
import Header from '../navigation/Header';

const ErrorPage = () => {
    const {error} = useRouteError();

  return (
    <div>
        <Header />
        {error.message}
    </div>
  )
}

export default ErrorPage