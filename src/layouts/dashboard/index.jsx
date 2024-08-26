import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
// @mui
import { Box, CssBaseline, styled } from '@mui/material';
// layout components
import Sidebar from './Drawer';
import Header from './Header';
// animations
import { motion } from 'framer-motion';
// configs
import { pageTransition, pageVariants } from '../../config/outletAnimations';
import {
  SubscriptionPopover,
  WelcomePopover,
} from '../../sections/dashboard/general';
import { useAuthStore } from '../../zustand/auth.store';
import { usePaymentStore } from '../../zustand/payment.store';
import { showInfoPopover } from '../../utils/showInfoPopover';
import { useExtensionInfoStore } from '../../zustand/extensionInfo';
import { Storage } from '../../storage';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function DashboardLayout() {
  const { pathname } = useLocation();
  const { userData } = useAuthStore();
  const { plans } = usePaymentStore();
  const { isExtension, setIsExtension } = useExtensionInfoStore();
  const [status, setStatus] = useState([0, 0, 0, 0]);
  const [subscriptionPopover, setSubscriptionPopover] = useState(false);
  const [extensionPopover, setExtensionPopover] = useState(false);
  const [open, setOpen] = useState(false);
  const [welcomePopover, setWelcomePopover] = useState(false);

  const welcomeHandler = () => {
    setWelcomePopover(!welcomePopover);
    Storage.removeItem('is-first-login');
  };

  useEffect(() => {
    welcomePopover &&
      setTimeout(() => {
        setWelcomePopover(false);
      }, 4000);
  }, [welcomePopover]);

  const handleDrawerTrigger = () => {
    setOpen(!open);
  };

  const handleInfoPopover = (clicked) => {
    setIsExtension(true);
    return showInfoPopover(
      userData,
      setStatus,
      setSubscriptionPopover,
      clicked,
    );
  };
  let timeoutClose;

  const cancelTimeout = () => {
    clearTimeout(timeoutClose);
    setTimeout(
      () =>
        setStatus((prev) => {
          prev.shift();
          return [...prev];
        }),
      500,
    );
  };

  useEffect(() => {
    !subscriptionPopover && setExtensionPopover(!isExtension);
  }, [isExtension]);

  useEffect(() => {
    if (subscriptionPopover) {
      timeoutClose = setTimeout(() => {
        setSubscriptionPopover(false);
        setTimeout(
          () =>
            setStatus((prev) => {
              prev.shift();
              return [...prev];
            }),
          500,
        );
      }, 10000);
    }
  }, [subscriptionPopover]);

  useEffect(() => {
    if (status.length && status[0] !== 0) {
      setSubscriptionPopover(true);
    } else {
      if (!userData?.is_welcome_said && status[3] !== 0) {
        Storage.setItem('is-first-login', true);
        welcomeHandler();
      }
    }
  }, [status.length]);

  useEffect(() => {
    if (pathname === '/dashboard/general') handleInfoPopover();
  }, [pathname]);

  useEffect(() => {
    Storage.getItem('is-first-login') && welcomeHandler();
  }, [userData]);

  return (
    <Box display={'flex'}>
      <CssBaseline />
      {userData && (
        <Header trigger={handleDrawerTrigger} open={open} userData={userData} />
      )}

      <Sidebar trigger={handleDrawerTrigger} open={open} />

      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <motion.div
          key={pathname}
          initial='initial'
          animate='in'
          variants={pageVariants}
          transition={pageTransition}
        >
          <Outlet context={handleInfoPopover} />

          <WelcomePopover
            state={extensionPopover}
            onClick={() => setIsExtension(true)}
          />

          <WelcomePopover
            onClick={welcomeHandler}
            state={welcomePopover}
            title={'welcome'}
          />

          <SubscriptionPopover
            state={subscriptionPopover}
            status={status[0]}
            planName={plans?.find(
              (plan) => plan.id === userData?.last_used_subscription?.plan,
            )}
            setState={setSubscriptionPopover}
            cancelTimeout={cancelTimeout}
          />
        </motion.div>
      </Box>
    </Box>
  );
}
