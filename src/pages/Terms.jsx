// @mui
import {
  Container,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import { Page } from '../components';

// ----------------------------------------------------------------------

const LayoutStyles = styled('div')(({ theme }) => ({
  padding: theme.spacing(4, 0, 4),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(8, 0, 8),
  },
}));

// ----------------------------------------------------------------------

export default function Terms() {
  return (
    <Page title='Terms & Conditions'>
      <Container>
        <LayoutStyles>
          <Typography variant={'h4'} mb={4}>Terms and Conditions for Autosubmit AI</Typography>

          <Typography variant={'h5'} mb={1}>Terms and Conditions</Typography>
          <Typography mb={2}>Last updated: January 31, 2024</Typography>
          <Typography mb={2}>Please read these terms and conditions carefully before using Our Service.</Typography>

          <Typography variant={'h5'} mb={1}>Interpretation and Definitions</Typography>
          <Typography variant={'h6'} mb={1}>Interpretation</Typography>
          <Typography mb={1}>The words of which the initial letter is capitalized have meanings defined under the
            following conditions. The following definitions shall have the same meaning regardless of
            whether they appear in singular or in plural.
          </Typography>

          <Typography variant={'h6'} mb={1}>Definitions</Typography>
          <Typography mb={1}>For the purposes of these Terms and Conditions:</Typography>
          <ul>
            <li>
              <strong>Affiliate</strong> means an entity that controls, is controlled by or is under common control
              with a party, where "control" means ownership of 50% or more of the shares, equity
              interest or other securities entitled to vote for election of directors or other
              managing authority
            </li>
            <li>
              <strong>Account</strong> means a unique account created for You to access our Service or parts
              of our Service.
            </li>
            <li>
              <strong>Country</strong> refers to: Texas, United States
            </li>
            <li>
              <strong>Company</strong> (referred to as either "the Company", "We", "Us" or "Our" in this
              Agreement) refers to Amplify Consulting LLC, 750 N. Saint Paul St., Ste. 250 PMB
              430006, Dallas, TX, 75201.
            </li>
            <li>
              <strong>Device</strong> means any device that can access the Service such as a computer, a
              cellphone or a digital tablet.
            </li>
            <li>
              <strong>Free Trial</strong> refers to a limited period of time that may be free when purchasing a
              Subscription.
            </li>
            <li>
              <strong>Service</strong> refers to the Website.
            </li>
            <li>
              <strong>Subscriptions</strong> refer to the services or access to the Service offered on a
              subscription basis by the Company to You.
            </li>
            <li>
              <strong>Terms and Conditions</strong> (also referred as "Terms") mean these Terms and
              Conditions that form the entire agreement between You and the Company
              regarding the use of the Service.
            </li>
            <li>
              <strong>Third-party Social Media Service</strong> means any services or content (including data,
              information, products or services) provided by a third-party that may be displayed,
              included or made available by the Service.
            </li>
            <li>
              <strong>Website</strong> refers to Autosubmit AI, accessible from autosubmit.ai
            </li>
            <li>
              <strong>You</strong> means the individual accessing or using the Service, or the company, or other
              legal entity on behalf of which such individual is accessing or using the Service, as
              applicable
            </li>
          </ul>

          <Typography variant={'h5'} mb={1}>Acknowledgment</Typography>
          <Typography mb={1}>
            These are the Terms and Conditions governing the use of this Service and the agreement
            that operates between You and the Company. These Terms and Conditions set out the
            rights and obligations of all users regarding the use of the Service.
          </Typography>
          <Typography mb={1}>
            Your access to and use of the Service is conditioned on Your acceptance of and
            compliance with these Terms and Conditions. These Terms and Conditions apply to all
            visitors, users and others who access or use the Service.
          </Typography>
          <Typography mb={1}>
            By accessing or using the Service You agree to be bound by these Terms and Conditions.
            If You disagree with any part of these Terms and Conditions then You may not access
            the Service.
          </Typography>
          <Typography mb={1}>
            You represent that you are over the age of 18. The Company does not permit those under
            18 to use the Service.
          </Typography>
          <Typography mb={1}>
            Your access to and use of the Service is also conditioned on Your acceptance of and
            compliance with the Privacy Policy of the Company. Our Privacy Policy describes Our
            policies and procedures on the collection, use and disclosure of Your personal information
            when You use the Application or the Website and tells You about Your privacy rights and
            how the law protects You. Please read Our Privacy Policy carefully before using Our
            Service.
          </Typography>

          <Typography variant={'h5'} mb={1}>Subscriptions</Typography>
          <Typography variant={'h6'} mb={1}>Subscription period</Typography>
          <Typography mb={1}>
            The Service or some parts of the Service are available only with a paid Subscription. You
            will be billed in advance on a recurring and periodic basis (such as daily, weekly, monthly
            or annually), depending on the type of Subscription plan you select when purchasing the
            Subscription.
          </Typography>
          <Typography mb={1}>
            At the end of each period, Your Subscription will automatically renew under the exact
            same conditions unless You cancel it or the Company cancels it.
          </Typography>

          <Typography variant={'h6'} mb={1}>Subscription cancellations</Typography>
          <Typography mb={1}>
            You may cancel Your Subscription renewal either through Your Account settings page or
            by contacting the Company. You will not receive a refund for the fees You already paid
            for Your current Subscription period and You will be able to access the Service until the
            end of Your current Subscription period.
          </Typography>

          <Typography variant={'h5'} mb={1}>Billing</Typography>
          <Typography mb={1}>
            You shall provide the Company with accurate and complete billing information including
            full name, address, state, zip code, telephone number, and a valid payment method
            information.
          </Typography>
          <Typography mb={1}>
            Should automatic billing fail to occur for any reason, the Company will issue an electronic
            invoice indicating that you must proceed manually, within a certain deadline date, with the
            full payment corresponding to the billing period as indicated on the invoice.
          </Typography>

          <Typography variant={'h5'} mb={1}>Fee Changes</Typography>
          <Typography mb={1}>
            The Company, in its sole discretion and at any time, may modify the Subscription fees.
            Any Subscription fee change will become effective at the end of the then-current
            Subscription period.
          </Typography>
          <Typography mb={1}>
            The Company will provide You with reasonable prior notice of any change in Subscription
            fees to give You an opportunity to terminate Your Subscription before such change
            becomes effective.
          </Typography>
          <Typography mb={1}>
            Your continued use of the Service after the Subscription fee change comes into effect
            constitutes Your agreement to pay the modified Subscription fee amount.
          </Typography>

          <Typography variant={'h5'} mb={1}>Refunds</Typography>
          <Typography mb={1}>
            Except when required by law, paid Subscription fees are non-refundable.
          </Typography>
          <Typography mb={1}>
            Certain refund requests for Subscriptions may be considered by the Company on a caseby-case basis and granted at the sole discretion of the Company.
          </Typography>

          <Typography variant={'h5'} mb={1}>Free Trial</Typography>
          <Typography mb={1}>
            The Company may, at its sole discretion, offer a Subscription with a Free Trial for a limited
            period of time.
          </Typography>
          <Typography mb={1}>
            You may be required to enter Your billing information in order to sign up for the Free Trial.
          </Typography>
          <Typography mb={1}>
            If You do enter Your billing information when signing up for a Free Trial, You will not be
            charged by the Company until the Free Trial has expired. On the last day of the Free Trial
            period, unless You canceled Your Subscription, You will be automatically charged the
            applicable Subscription fees for the type of Subscription You have selected.
          </Typography>
          <Typography mb={1}>
            At any time and without notice, the Company reserves the right to (i) modify the terms
            and conditions of the Free Trial offer, or (ii) cancel such Free Trial offer.
          </Typography>

          <Typography variant={'h5'} mb={1}>User Accounts</Typography>
          <Typography mb={1}>
            When You create an account with Us, You must provide Us information that is accurate,
            complete, and current at all times. Failure to do so constitutes a breach of the Terms,
            which may result in immediate termination of Your account on Our Service.
          </Typography>
          <Typography mb={1}>
            You are responsible for safeguarding the password that You use to access the Service
            and for any activities or actions under Your password, whether Your password is with Our
            Service or a Third-Party Social Media Service.
          </Typography>
          <Typography mb={1}>
            You agree not to disclose Your password to any third party. You must notify Us
            immediately upon becoming aware of any breach of security or unauthorized use of Your
            account.
          </Typography>
          <Typography mb={1}>
            You may not use as a username the name of another person or entity or that is not lawfully
            available for use, a name or trademark that is subject to any rights of another person or
            entity other than You without appropriate authorization, or a name that is otherwise
            offensive, vulgar or obscene.
          </Typography>

          <Typography variant={'h5'} mb={1}>Links to Other Websites</Typography>
          <Typography mb={1}>
            Our Service may contain links to third-party web sites or services that are not owned or
            controlled by the Company.
          </Typography>
          <Typography mb={1}>
            The Company has no control over, and assumes no responsibility for, the content, privacy
            policies, or practices of any third party web sites or services. You further acknowledge
            and agree that the Company shall not be responsible or liable, directly or indirectly, for
            any damage or loss caused or alleged to be caused by or in connection with the use of
            or reliance on any such content, goods or services available on or through any such web
            sites or services.
          </Typography>
          <Typography mb={1}>
            We strongly advise You to read the terms and conditions and privacy policies of any thirdparty web sites or services that You visit.
          </Typography>

          <Typography variant={'h5'} mb={1}>Termination</Typography>
          <Typography mb={1}>
            We may terminate or suspend Your Account immediately, without prior notice or liability,
            for any reason whatsoever, including without limitation if You breach these Terms and
            Conditions.
          </Typography>
          <Typography mb={1}>
            Upon termination, Your right to use the Service will cease immediately. If You wish to
            terminate Your Account, You may simply discontinue using the Service.
          </Typography>

          <Typography variant={'h5'} mb={1}>Limitation of Liability</Typography>
          <Typography mb={1}>
            Notwithstanding any damages that You might incur, the entire liability of the Company
            and any of its suppliers under any provision of this Terms and Your exclusive remedy for
            all of the foregoing shall be limited to the amount actually paid by You through the Service
            or 100 USD if You haven't purchased anything through the Service.
          </Typography>
          <Typography mb={1}>
            To the maximum extent permitted by applicable law, in no event shall the Company or its
            suppliers be liable for any special, incidental, indirect, or consequential damages
            whatsoever (including, but not limited to, damages for loss of profits, loss of data or other
            information, for business interruption, for personal injury, loss of privacy arising out of or
            in any way related to the use of or inability to use the Service, third-party software and/or
            third-party hardware used with the Service, or otherwise in connection with any provision
            of this Terms), even if the Company or any supplier has been advised of the possibility of
            such damages and even if the remedy fails of its essential purpose.
          </Typography>
          <Typography mb={1}>
            Some states do not allow the exclusion of implied warranties or limitation of liability for
            incidental or consequential damages, which means that some of the above limitations
            may not apply. In these states, each party's liability will be limited to the greatest extent
            permitted by law.
          </Typography>

          <Typography variant={'h5'} mb={1}>"AS IS" and "AS AVAILABLE" Disclaimer</Typography>
          <Typography mb={1}>
            The Service is provided to You "AS IS" and "AS AVAILABLE" and with all faults and
            defects without warranty of any kind. To the maximum extent permitted under applicable
            law, the Company, on its own behalf and on behalf of its Affiliates and its and their
            respective licensors and service providers, expressly disclaims all warranties, whether
            express, implied, statutory or otherwise, with respect to the Service, including all implied
            warranties of merchantability, fitness for a particular purpose, title and non-infringement,
            and warranties that may arise out of course of dealing, course of performance, usage or
            trade practice. Without limitation to the foregoing, the Company provides no warranty or
            undertaking, and makes no representation of any kind that the Service will meet Your
            requirements, achieve any intended results, be compatible or work with any other
            software, applications, systems or services, operate without interruption, meet any
            performance or reliability standards or be error free or that any errors or defects can or
            will be corrected.
          </Typography>
          <Typography mb={1}>
            Without limiting the foregoing, neither the Company nor any of the company's provider
            makes any representation or warranty of any kind, express or implied: (i) as to the
            operation or availability of the Service, or the information, content, and materials or
            products included thereon; (ii) that the Service will be uninterrupted or error-free; (iii) as
            to the accuracy, reliability, or currency of any information or content provided through the
            Service; or (iv) that the Service, its servers, the content, or e-mails sent from or on behalf
            of the Company are free of viruses, scripts, trojan horses, worms, malware, timebombs
            or other harmful components.
          </Typography>
          <Typography mb={1}>
            Some jurisdictions do not allow the exclusion of certain types of warranties or limitations
            on applicable statutory rights of a consumer, so some or all of the above exclusions and
            limitations may not apply to You. But in such a case the exclusions and limitations set
            forth in this section shall be applied to the greatest extent enforceable under applicable
            law.
          </Typography>

          <Typography variant={'h5'} mb={1}>Governing Law</Typography>
          <Typography mb={1}>
            The laws of the Country, excluding its conflicts of law rules, shall govern this Terms and
            Your use of the Service. Your use of the Application may also be subject to other local,
            state, national, or international laws.
          </Typography>

          <Typography variant={'h5'} mb={1}>Disputes Resolution</Typography>
          <Typography mb={1}>
            If You have any concern or dispute about the Service, You agree to first try to resolve the
            dispute informally by contacting the Company.
          </Typography>

          <Typography variant={'h5'} mb={1}>For European Union (EU) Users</Typography>
          <Typography mb={1}>
            If You are a European Union consumer, you will benefit from any mandatory provisions
            of the law of the country in which You are resident.
          </Typography>

          <Typography variant={'h5'} mb={1}>United States Federal Government End Use Provisions</Typography>
          <Typography mb={1}>
            If You are a U.S. federal government end user, our Service is a "Commercial Item" as
            that term is defined at 48 C.F.R. §2.101.
          </Typography>

          <Typography variant={'h5'} mb={1}>United States Legal Compliance</Typography>
          <Typography mb={1}>
            You represent and warrant that (i) You are not located in a country that is subject to the
            United States government embargo, or that has been designated by the United States
            government as a "terrorist supporting" country, and (ii) You are not listed on any United
            States government list of prohibited or restricted parties.
          </Typography>

          <Typography variant={'h5'} mb={1}>Severability and Waiver</Typography>
          <Typography variant={'h6'} mb={1}>Severability</Typography>
          <Typography mb={1}>
            If any provision of these Terms is held to be unenforceable or invalid, such provision will
            be changed and interpreted to accomplish the objectives of such provision to the greatest
            extent possible under applicable law and the remaining provisions will continue in full
            force and effect.
          </Typography>

          <Typography variant={'h6'} mb={1}>Waiver</Typography>
          <Typography mb={1}>
            Except as provided herein, the failure to exercise a right or to require performance of an
            obligation under these Terms shall not affect a party's ability to exercise such right or
            require such performance at any time thereafter nor shall the waiver of a breach constitute
            a waiver of any subsequent breach.
          </Typography>

          <Typography variant={'h5'} mb={1}>Translation Interpretation</Typography>
          <Typography mb={1}>
            These Terms and Conditions may have been translated if We have made them available
            to You on our Service. You agree that the original English text shall prevail in the case of
            a dispute.
          </Typography>

          <Typography variant={'h5'} mb={1}>Changes to These Terms and Conditions</Typography>
          <Typography mb={1}>
            We reserve the right, at Our sole discretion, to modify or replace these Terms at any time.
            If a revision is material We will make reasonable efforts to provide at least 30 days' notice
            prior to any new terms taking effect. What constitutes a material change will be
            determined at Our sole discretion.
          </Typography>
          <Typography mb={1}>
            By continuing to access or use Our Service after those revisions become effective, You
            agree to be bound by the revised terms. If You do not agree to the new terms, in whole
            or in part, please stop using the website and the Service.
          </Typography>

          <Typography variant={'h5'} mb={1}>Contact Us</Typography>
          <Typography mb={1}>
            If you have any questions about these Terms and Conditions, You can contact us:
          </Typography>
          <ul>
            <li>By email: <a href="mailto:support@autosubmit.ai">support@autosubmit.ai</a></li>
          </ul>
        </LayoutStyles>
      </Container>
    </Page>
  );
}
