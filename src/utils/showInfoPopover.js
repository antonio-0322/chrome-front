import { getLeftDays } from './getLeftDays';

export const showInfoPopover = (
  userData,
  setStatus,
  setSubscriptionPopover,
  clicked = false,
) => {
  const statusArr = [];

  if (
    userData?.active_subscription &&
    !userData?.active_subscription?.today_applications.possible
  ) {
    statusArr.push(5);
  }
  if (
    userData?.active_subscription?.plan === 1 &&
    getLeftDays(userData?.active_subscription?.end_date) < 1 &&
    !clicked
  ) {
    statusArr.push(1);
  }
  if (
    !userData?.active_subscription &&
    userData?.has_used_free_subscription &&
    userData?.last_used_subscription?.plan === 1
  ) {
    statusArr.push(2);
  }
  if (
    !userData?.active_subscription &&
    userData?.last_used_subscription?.plan * 1 > 1
  ) {
    statusArr.push(3);
  }
  if (
    userData?.active_subscription?.plan > 1 &&
    userData?.active_subscription?.job_submissions.possible !== 0 &&
    userData?.active_subscription?.job_submissions.possible <=
      userData?.active_subscription?.today_applications.total &&
    !clicked
  ) {
    statusArr.push(4);
  }
  setStatus(statusArr);
  return { enableToApply: true };
};
