import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
// @mui
import { Container, Stack } from '@mui/material';
// assets
import Logo from '../../assets/logo/logo.svg';

export default function LogoOnlyLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      navigate('/auth/login');
    }, 3000);

    return () => {
      clearTimeout(redirectTimeout);
    };
  }, [navigate]);

  return (
    <>
      <Container>
        <Stack direction="row" justifyContent="center" mt={9}>
          <img src={Logo} alt="Auto Submit logo" />
        </Stack>
      </Container>
      <Outlet />
    </>
  );
}
