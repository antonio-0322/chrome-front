import { ApiClient } from '../baseRqeuest';

const getSubscriptionPlans = () => ApiClient.get('payment/plans/');

const getCheckoutLink = (id) =>
  ApiClient.get(`payment/get-checkout-link/${id}/`);

export const PaymentApi = {
  getSubscriptionPlans,
  getCheckoutLink,
};
