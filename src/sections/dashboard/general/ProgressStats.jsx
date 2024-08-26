import { useNavigate } from 'react-router-dom';
import moment from 'moment';
// @mui
import { Box, Grid, useTheme, Button } from '@mui/material';
// components
import { ProgressCard, Iconify } from '../../../components';
// assets
import { getLeftDays } from '../../../utils/getLeftDays';
import { usePaymentStore } from '../../../zustand/payment.store';
import { useAuthStore } from '../../../zustand/auth.store';
import no_data_chart from '../../../assets/dashboard/no_data_chart.svg';
import { PATH_DASHBOARD } from '../../../routes/paths';

// ----------------------------------------------------------------------

const getPercentage = (currNum, totalNum) => {
  return ((currNum / totalNum) * 100).toFixed(2);
};

export default function ProgressStats() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { plans } = usePaymentStore();
  const { userData } = useAuthStore();
  const PRIMARY_DARK = theme.palette.primary.dark;
  const SECONDARY = theme.palette.secondary.main;
  const GREEN = theme.palette.success.main;
  const RED = theme.palette.error.main;

  const subscriptionData =
    userData?.active_subscription || userData?.last_used_subscription;

  const currentPlan = plans.find((plan) => plan.id === subscriptionData?.plan);

  const noDataCards = () => [
    {
      title: 'Daily Jobs Applied',
      color: SECONDARY,
      progress: 0,
      pricing: false,
      used: 0,
      total: `No Data`,
      remained: `Select Plan to Continue`,
      progressTitle: `Today 0 Jobs Applied`,
      progressTotal: ``,
      icon: <Iconify icon={'ic:twotone-badge'} sx={{ fontSize: 32 }}></Iconify>,
    },
    {
      title: 'Total Jobs Applied',
      color: PRIMARY_DARK,
      progress: 0,
      pricing: false,
      used: 0,
      total: `No Data`,
      remained: `Select Plan to Continue`,
      progressTitle: `Total 0 Jobs Applied`,
      progressTotal: ``,
      icon: <Iconify icon={'ic:twotone-badge'} sx={{ fontSize: 32 }}></Iconify>,
    },
    {
      title: 'Pricing Plan',
      color: GREEN,
      progress: 0,
      pricing: true,
      remained: `Select Plan to Continue`,
      planName: `No Active Plan`,
      progressTitle: ``,
      progressTotal: ``,
      icon: no_data_chart,
      linkButton: (
        <Button
          fullWidth
          variant={'contained'}
          sx={{ height: 33 }}
          onClick={() => navigate(PATH_DASHBOARD.pricing)}
        >
          CHOOSE PLAN
        </Button>
      ),
    },
  ];

  const freePlanCard = (today_applications, job_submissions, end_date) => ({
    title: 'Pricing Plan',
    color: job_submissions.possible > today_applications.total ? GREEN : RED,
    progress: getPercentage(job_submissions.used, job_submissions.total),
    pricing: true,
    remained:
      getLeftDays(end_date) === 0
        ? 'will expire today'
        : `${getLeftDays(end_date)} days left`,
    planName: `${currentPlan?.name} Plan`,
    progressTitle: `Your Plan Valid Until`,
    progressTotal: moment(end_date).format('DD MMMM YYYY'),
    icon: currentPlan?.image,
  });

  const paidPlanCard = (today_applications, job_submissions) => ({
    title: 'Pricing Plan',
    color: job_submissions.possible > today_applications.total ? GREEN : RED,
    progress: getPercentage(job_submissions.used, job_submissions.total),
    pricing: true,
    remained: `Total ${job_submissions.total} Jobs Apps`,
    planName: `${currentPlan?.name} Plan`,
    progressTitle: `Your Plan Timeline`,
    progressTotal: '',
    icon: currentPlan?.image,
  });

  const cardConfigs = (today_applications, job_submissions, end_date) => [
    {
      title: 'Daily Jobs Applied',
      color: SECONDARY,
      progress: getPercentage(
        today_applications.used,
        today_applications.total,
      ),
      pricing: false,
      used: today_applications.used,
      total: `${today_applications.total}`,
      remained: `${today_applications.possible} left`,
      progressTitle: `Today ${today_applications.used} Jobs Applied`,
      progressTotal: `${today_applications.total} / Daily`,
      icon: <Iconify icon={'ic:twotone-badge'} sx={{ fontSize: 32 }}></Iconify>,
    },
    {
      title: 'Total Jobs Applied',
      color: PRIMARY_DARK,
      progress: getPercentage(job_submissions.used, job_submissions.total),
      pricing: false,
      used: job_submissions.used,
      total: `${job_submissions.total}`,
      remained: `${job_submissions.possible} left`,
      progressTitle: `Total ${job_submissions.used} Jobs Applied`,
      progressTotal: `${job_submissions.total} / Total`,
      icon: <Iconify icon={'ic:twotone-badge'} sx={{ fontSize: 32 }}></Iconify>,
    },
    currentPlan?.id === 1
      ? freePlanCard(today_applications, job_submissions, end_date)
      : paidPlanCard(today_applications, job_submissions, end_date),
  ];

  return (
    <Grid container spacing={3} mt={0}>
      {(userData?.active_subscription
        ? cardConfigs(
            userData.active_subscription.today_applications,
            userData.active_subscription.job_submissions,
            userData.active_subscription.end_date,
          )
        : noDataCards()
      ).map((item, index) => {
        return (
          <Grid item md={4} key={index}>
            <ProgressCard
              title={item.title}
              used={item.used}
              total={item.total}
              progress={item.progress}
              points={item.check_info}
              color={item.color}
              icon={item.icon}
              remained={item.remained}
              pricing={item.pricing}
              planName={item.planName}
              progressTitle={item.progressTitle}
              progressTotal={item.progressTotal}
              linearProgress={item.progressTitle}
              linkButton={item.linkButton}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}
