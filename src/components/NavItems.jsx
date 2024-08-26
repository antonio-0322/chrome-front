import React, { useState } from 'react';
import { Drawer, IconButton, MenuItem, MenuList, useMediaQuery } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { FullDemo } from './FullDemo';
import { pxToRem } from '../utils/getFontValue';

const MenuItems = () => {
  const { pathname } = useLocation();

  const navigate = useNavigate();
  const navigation = [
    {
      label: 'Pricing',
      route: '/pricing',
    },
    {
      label: 'Login',
      route: '/auth/login',
    },
  ];

  return (
    <>
      <FullDemo />
      {navigation.map((item) => (
        pathname !== item.route ? (
          <MenuItem
            key={item.label}
            onClick={() => navigate(item.route)}
            sx={{
              ml: 1,
              mr: 1,
              fontSize: pxToRem(16),
              color: 'primary.dark',
            }}
          >
            {item.label}
          </MenuItem>
        ) : null
      ))}
    </>
  )
}

const HamburgerMenu = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={handleOpen}>
        <Menu />
      </IconButton>
      <Drawer anchor="top" open={open} onClose={handleClose}>
        <MenuItems />
      </Drawer>
    </>
  );
};

function NavItems() {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));
  return (
    <>
      <MenuList sx={{ display: 'flex', alignItems: 'center' }}>
        {isMobile ? <HamburgerMenu /> : <MenuItems />}
      </MenuList>
    </>
  );
}

export default NavItems;
