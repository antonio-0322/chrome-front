// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography, Grid, useMediaQuery } from '@mui/material';
// components
import { Page, PaymentPlanCard } from '../../components';
import { useAuthStore } from '../../zustand/auth.store';
import { usePaymentStore } from '../../zustand/payment.store';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(2, 0),
}));

// ----------------------------------------------------------------------

export default function Pricing() {
  const { userData } = useAuthStore();
  const { plans } = usePaymentStore();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (
    <Page title='Pricing plans'>
      <Container>
        <ContentStyle>
          <Typography variant='h5' mb={1}>
            Pricing Plans
          </Typography>
          <Typography variant='body2' color={'text.secondary'}>
            {"Pricing that's affordable and transparent."}
          </Typography>

          <Grid container mt={3.5} sx={{display: "flex", justifyContent: "center", flexDirection: isMobile ? "column" : "row"}}>
            {plans?.map((item, index) => (
              <Grid item xs={12} md={12/plans?.length} key={index} sx={{mb: isMobile ? 2 : 0}}>
                <PaymentPlanCard
                  id={item.id}
                  is_favorite={item.is_favorite}
                  amount={item.amount}
                  slug={item.slug}
                  label={item.label}
                  image={item.image}
                  current={
                    userData
                      ? item.id === userData?.active_subscription?.plan
                      : false
                  }
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  options={item.options}
                  icon={item.icon}
                  sx={{
                    borderRadius: isMobile ? '10px' : `${
                      index === 0
                        ? '10px 0 0 10px'
                        : index === plans?.length - 1
                        ? ' 0 10px 10px 0'
                        : '0'
                    }`,
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </ContentStyle>
      </Container>
    </Page>
  );
}
