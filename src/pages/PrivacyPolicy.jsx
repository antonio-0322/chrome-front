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

export default function Landing() {
  return (
    <Page title='Privacy Policy'>
      <Container>
        <LayoutStyles>
          <Typography variant={'h4'} mb={4}>Company & Website Information</Typography>

          <Typography variant={'h6'} mb={1}>Introduction</Typography>
          <Typography mb={2}>This is the privacy policy for autosubmit.ai</Typography>

          <Typography variant={'h6'} mb={1}>Definitions</Typography>
          <Typography mb={1}>Personal data means any information relating to an identified or identifiable
            natural person (data subject); an identifiable natural person is one who can
            be identified, directly or indirectly, in particular by reference to an identifier
            such as a name, an identification number, location data, an online identifier
            or to one or more factors specific to the physical, physiological, genetic,
            mental, economic, cultural or social identity of that natural person.
          </Typography>
          <Typography mb={1}>
            Processing means any operation or set of operations which is performed on
            personal data or on sets of personal data, whether or not by automated
            means, such as collection, recording, organisation, structuring, storage,
            adaptation or alteration, retrieval, consultation, use, disclosure by
            transmission, dissemination or otherwise making available, alignment or
            combination, restriction, erasure or destruction.
          </Typography>
          <Typography mb={1}>
            Controller means the natural or legal person, public authority, agency or other
            body which, alone or jointly with others, determines the purposes and means
            of the processing of personal data.
          </Typography>
          <Typography mb={1}>
            Processor means a natural or legal person, public authority, agency or other
            body which processes personal data on behalf of the controller.
          </Typography>
          <Typography mb={1}>
            Recipient means a natural or legal person, public authority, agency or another
            body, to which the personal data are disclosed, including both processors and
            controllers.
          </Typography>
          <Typography mb={1}>
            Legal basis means a lawful ground for data processing under the GDPR.
          </Typography>

          <Typography variant={'h6'} mb={1} mt={2}>Data Processing Activities</Typography>
          <Typography mb={1}>
            We collect certain personal information to provide specific services and functionalities on
            our website.
          </Typography>
          <Typography mb={1}>
            The following sections describe the different data processing activities we conduct on our
            website. The information particularly reflects the processing purposes, what personal data
            we process for this purpose as well as the legal basis for the processing.
          </Typography>

          <Typography variant={'subtitle1'} sx={{textDecoration: 'underline', fontStyle: 'italic'}} mb={1} mt={2}>Informational use of our website</Typography>
          <Typography mb={1}>
            a) If you visit our website for informational purposes only, i.e. surfing on our website
            without specifically providing personal data, we will process the following information
            about you. The information may include a limited amount of personal data:
          </Typography>
          <ul>
            <li>IP Address</li>
            <li>Referrer URL</li>
            <li>Browser Information</li>
            <li>Device Information</li>
            <li>Date and time of the user request</li>
          </ul>
          <Typography mb={1}>
            This information is processed to enable you to use our website (e.g. by adapting our
            website to the needs of your device or browser).
          </Typography>
          <Typography mb={1}>
            The legal basis for this data processing is performance of contract, Art. 6 para. 1 sentence
            1 lit. b GDPR, as we need the information for the effective provision of our website, and
            for providing you the services of our website at your request. Without the processing of
            the above-mentioned personal data, we will not be able to carry out the communication
            over the network and provide you with the required functionalities of our website.
          </Typography>
          <Typography mb={1}>
            We retain this personal data for 2 years.
          </Typography>

          <Typography variant={'subtitle1'} sx={{textDecoration: 'underline', fontStyle: 'italic'}} mb={1} mt={2}>Users may create a user account on</Typography>
          <Typography mb={1}>
            a) You have the possibility to register for a user account on our website. During
            registration we will process the following personal data about you:
          </Typography>
          <ul>
            <li>First Name</li>
            <li>Last Name</li>
            <li>Email Address</li>
            <li>Address</li>
            <li>Payment Info</li>
          </ul>
          <Typography mb={1}>
            b) The lawfulness of this data processing is "performance of contract" follows from Art. 6
            para. 1 sentence 1 lit. b GDPR. The processing is required for the effective provision and
            the administration of your user account. Without providing the data required for
            registration, it is not possible to create a user account on our website.
          </Typography>
          <Typography mb={1}>
            We retain your personal data till you have a user account with us
          </Typography>
          <Typography mb={1}>
            c) You can delete your customer account as follows:
          </Typography>
          <Typography mb={1}>
            i. Please contact us by e-mail at [email address] with your written request for deletion. If
            you decide to delete your customer account, the account data will be deleted, unless
            further data retention is required or justified under the applicable law.
          </Typography>
          <Typography mb={1}>
            ii. You can also delete your entire account within your customer account. If you decide to
            delete data or your customer account, the account data will be deleted, unless further
            data retention is required or justified under the applicable law.
          </Typography>

          <Typography variant={'subtitle1'} sx={{textDecoration: 'underline', fontStyle: 'italic'}} mb={1} mt={2}>Users may contact you via the contact form</Typography>
          <Typography mb={1}>
            You can contact us using the contact details provided on the website. If you contact us,
            we will process the content of your inquiry, your name, your e-mail address or telephone
            number, if applicable, our answers as well as all information that you voluntarily provide
            us with in the context of the inquiry in order to be able to adequately handle your request.
          </Typography>
          <Typography mb={1}>
            You can also contact us via the contact form on our website. In this case, we collect the
            following personal data:
          </Typography>
          <Typography mb={1}>
            We will process this data as well as the content of your inquiry, our answers and all
            information that you voluntarily provide us with in the context of the inquiry in order to be
            able to adequately handle your request.
          </Typography>
          <Typography mb={1}>
            The lawfulness of this data processing is "legitimate interests" (results from Art. 6 para. 1
            sentence 1 lit. b, f GDPR), as this data processing is necessary to ensure proper contact
            and the provision of customer service. This provision of adequate customer service is our
            legitimate interest that requires us to process your personal data.
          </Typography>
          <Typography mb={1}>
            We will retain your data as long as necessary to adequately process your request.
            Afterwards, it will be deleted, unless longer storage is required or justified by law.
          </Typography>
          <Typography mb={1}>
            The retention period for the personal data processed to process your request is 2 years.
            Afterwards, it will be deleted, unless longer storage is required or justified by law.
          </Typography>
          <Typography mb={1}>
            You have a right to object to processing based on our legitimate interests. As a
            consequence of any valid objection, we will no longer process your data unless we have
            sufficiently compelling and legitimate grounds for the processing.
          </Typography>

          <Typography variant={'subtitle1'} sx={{textDecoration: 'underline', fontStyle: 'italic'}} mb={1} mt={2}>Users may sign up for a newsletter</Typography>
          <Typography mb={1}>
            a) You may register for our newsletter on our website. During the registration process we
            collect the following personal data:
          </Typography>
          <ul>
            <li>First Name</li>
            <li>Last Name</li>
            <li>Email Address</li>
          </ul>
          <Typography mb={1}>
            We process this data to provide you with the newsletter. The data processing is based on
            your consent (Art. 6 para. 1 sentence 1 lit. a GDPR). The consent is voluntary. You can
            revoke your consent at any time without giving reasons with effect for the future. To do
            so, simply click on the 'Unsubscribe' link included in every newsletter or send us an email.
          </Typography>
          <Typography mb={1}>
            b) We will retain your data as long as necessary you are subscribed to the newsletter.
            Afterwards, it will be deleted, unless longer storage is required or justified by law. Once
            you have unsubscribed from the newsletter, we will retain your just strictly necessary
            information to ensure that we respect your newsletter subscription preferences in the
            future.
          </Typography>
          <Typography mb={1}>
            c) The retention period for the personal data is: 2 years
          </Typography>
          <Typography mb={1}>
            Afterwards, it will be deleted, unless longer storage is required or justified by law.
          </Typography>

          <Typography variant={'subtitle1'} sx={{textDecoration: 'underline', fontStyle: 'italic'}} mb={1} mt={2}>Your website provides for a blog</Typography>
          <Typography mb={1}>
            a) Our website includes a blog where we regularly publish posts. You can publicly
            comment on our blog. If you do so, we will process the following personal data on you:
          </Typography>
          <Typography mb={1}>
            We process this data to enable you to participate on the blog. Thus, processing is
            necessary to provide that service. The legal basis of this data processing is
            performance of contract (Art. 6 para. 1 sentence 1 lit. b GDPR). Without the processing
            of your data, we cannot enable you to participate in the blog
          </Typography>
          <Typography mb={1}>
            b) When you post a comment, the following information will be visible for other users of
            our website:
          </Typography>
          <Typography mb={1}>
            c) To post such comments in the blog, you need to create a user account (see above).
          </Typography>
          <Typography mb={1}>
            d) You can delete your posts at any time.
          </Typography>
          <Typography mb={1}>
            f) The retention period for the personal data is: 2 years
          </Typography>
          <Typography mb={1}>
            Afterwards, it will be deleted, unless longer storage is required or justified by law.
          </Typography>

          <Typography variant={'subtitle1'} sx={{textDecoration: 'underline', fontStyle: 'italic'}} mb={1} mt={2}>Users can apply for a job via an application form on your sit</Typography>
          <Typography mb={1}>
            a) If you apply for a job in our company, we will process your name, contact details,
            qualifications and other data that you provide us with your application.
          </Typography>
          <Typography mb={1}>
            b) You may further use the application form we provide in this regard on our website. In
            this case we will process the following data categories:
          </Typography>
          <Typography mb={1}>
            c) We process your data exclusively for the purpose of assessing your application and
            conducting the application process. If you do not provide the required personal data,
            unfortunately, we cannot consider your application. You do not have to enter data that is
            marked as voluntary in order for the application to be considered. The processing is
            justified under "performance of contract" legal basis Art. 6 para. 1 sentence 1 lit. b
            GDPR as it is necessary in order to take steps at your request prior to entering into an
            employment contract.
          </Typography>
          <Typography mb={1}>
            d) If the application procedure ends without an employment relationship being
            established, the retention period for your data is: 2 years
          </Typography>
          <Typography mb={1}>
            Afterwards, it will be deleted, unless longer storage is required or justified by law. If you
            are also interested in other positions, we will store your data with your consent, until you
            request deletion of the data. You can opt-in to receive future job notifications from us
            and you may refuse to stop receiving future job notifications from us at any time
          </Typography>

          <Typography variant={'h6'} mb={1}>No processing of personal data of children</Typography>
          <Typography mb={2}>
            We do not knowingly collect or solicit personal data from persons under the age of 13.
            The website is not directed at children under the age of 13. In the event that we learn
            that we have collected personal data of a child under the age of 13 without parental
            consent, we will delete that information as quickly as possible. If you believe that we
            may have personal data from or about a child under 13, please contact us using the
            contact details outlined in this policy.
          </Typography>

          <Typography variant={'h6'} mb={1}>
            No processing of personal data relating to criminal convictions
            and offences
          </Typography>
          <Typography mb={2}>
            We do not knowingly collect or process sensitive personal data.
          </Typography>

          <Typography variant={'h6'} mb={1}>No processing of sensitive personal data</Typography>
          <Typography mb={2}>
            We do not knowingly collect or process personal data relating to criminal convictions and
            offences.
          </Typography>

          <Typography variant={'h6'} mb={1}>
            No processing for automated individual decision-making
            including profiling
          </Typography>
          <Typography mb={2}>
            We do not knowingly collect or process personal data for automated individual decision-making including profiling.
          </Typography>

          <Typography variant={'h6'} mb={1}>
            Cookies
          </Typography>
          <Typography variant={'subtitle1'} sx={{textDecoration: 'underline', fontStyle: 'italic'}} mb={1} mt={2}>Use of Cookies and other Web Technologies</Typography>
          <Typography mb={1}>
            Cookies and similar tracking technologies are placed on your computer or mobile device
            to collect, store, and use information about you when you visit our website.
          </Typography>
          <Typography mb={1}>
            This website uses cookies or similar technologies ("cookies"). There are different kinds
            of cookies:
          </Typography>
          <Typography mb={1}>
            Strictly necessary cookies are cookies that are necessary to provide the services and
            features available through the websites, e.g. shopping. Without the cookie the service
            cannot be provided.
          </Typography>
          <Typography variant={'subtitle1'} sx={{textDecoration: 'underline', fontStyle: 'italic'}} mb={1} mt={2}>Non-necessary cookies</Typography>
          <Typography mb={1}>
            Some of the cookies described above are so-called first party cookies where we are
            responsible for dropping the cookies and processing the personal data. Other cookies we
            use may be provided by third party (third party cookies). These third parties drop the
            cookies and process the collected personal data for their own purposes, e.g. to provide
            you advertisement.
          </Typography>

          <Typography variant={'h6'} mb={1}>
            Data Sharing
          </Typography>
          <Typography variant={'subtitle1'} sx={{textDecoration: 'underline', fontStyle: 'italic'}} mb={1} mt={2}>Sharing your personal information with service providers</Typography>
          <Typography mb={1}>
            We do not engage with service providers for the processing of personal data in connection
            with the website and/or functions/services on the website.
          </Typography>

          <Typography variant={'subtitle1'} sx={{textDecoration: 'underline', fontStyle: 'italic'}} mb={1} mt={2}>Third party recipients of your personal information</Typography>
          <Typography mb={1}>
            There are no data recipients located in countries outside the European Union, and they
            do not have access to personal data from a country outside the European Union.
          </Typography>

          <Typography variant={'subtitle1'} sx={{textDecoration: 'underline', fontStyle: 'italic'}} mb={1} mt={2}>International Data Transfer</Typography>
          <Typography mb={1}>
            No data recipients (service providers or third party recipients) are located in countries
            outside of the European Union and/or do the data recipients access the personal data
            from a country outside the European Union.
          </Typography>
          <Typography mb={1}>
            We do not transfer or provide access to your personal data to data recipients located in
            countries outside the Federated Republic of Brazil.
          </Typography>

          <Typography variant={'h6'} mb={1}>
            Data Retention
          </Typography>
          <Typography mb={1}>
            How long we retain your personal information
          </Typography>
          <Typography mb={1}>
            Unless otherwise stated in this privacy policy, we retain your personal data only as long
            as necessary for the respective purpose. Subsequently, we will delete your data, unless
            we are legally entitled or obliged to further storage.
          </Typography>
          <Typography mb={1}>
            Please refer to the section on Data Processing Activities to find out the exact retention
            period for different categories of your personal data and/or different processing purposes.
          </Typography>

          <Typography variant={'h6'} mb={1}>
            Data Security
          </Typography>
          <Typography mb={1}>
            How we protect your personal information
          </Typography>
          <Typography mb={1}>
            We implemented appropriate technical and organizational measures to ensure a level of
            security appropriate to the risk, taking into account the state of the art, the costs of
            implementation and the nature, scope, context and purposes of processing as well as the
            risk of varying likelihood and severity for the rights and freedoms of natural persons.
          </Typography>

          <Typography variant={'h6'} mb={1}>
            Your Rights
          </Typography>
          <Typography mb={1}>
            Depending on the circumstances, you may be entitled to exercise some or all of the
            following rights:
          </Typography>
          <Typography mb={1}>
            1. Obtain confirmation as to whether or not your personal data is being processed and
            access to copy of your personal data undergoing processing.
          </Typography>
          <Typography mb={1}>
            1. require (i) access to and/or duplicates of your personal data retained, (ii) receive the
            personal data concerning you, which you have provided to us, in a structured, commonly
            used and machine-readable format and (iii) to transmit those personal data to another
            controller without hindrance from our side; where technically feasible you shall have the
            right to have the personal data transmitted directly from us to another controller;
          </Typography>
          <Typography mb={1}>
            2. request rectification, removal or restriction of your personal data;
          </Typography>
          <Typography mb={1}>
            3. Where the data processing is based on your consent, refuse to provide and – without
            impact to data processing activities that have taken place before such withdrawal –
            withdraw your consent to processing of your personal data at any time;
          </Typography>
          <Typography mb={1}>
            4. take legal actions in relation to any potential breach of your rights regarding the
            processing of your personal data, as well as to lodge complaints before the competent
            data protection regulators;
          </Typography>
          <Typography mb={1}>
            5. not to be subject to any automated decision making, including profiling (automatic
            decisions based on data processing by automatic means, for the purpose of assessing
            several personal aspects) which produce legal effects on you or affects you with similar
            significance.
          </Typography>
          <Typography mb={1}>
            Further, you may be entitled to object, out of grounds relating to your particular situation,
            at any time to processing of personal data concerning you, including object to direct
            marketing and automated individual decision-making including profiling. In this case,
            please provide us with information about your particular situation. After the assessment
            of the facts presented by you we will either stop processing your personal data or present
            you our compelling legitimate grounds for an ongoing processing.
          </Typography>
          <Typography mb={1}>
            You also have a right to lodge a complaint with the supervisory authority. The contact
            details of your supervisory authority are:
          </Typography>

          <Typography variant={'h6'} mb={1}>
            Updates to this notice
          </Typography>
          <Typography mb={1}>
            We may update this Privacy Policy from time to time. If we modify our Privacy Policy, we
            will post the revised version here, with an updated revision date. You agree to visit these
            pages periodically to be aware of and review any such revisions. If we make material
            changes to our Privacy Policy, we may also notify you by other means prior to the changes
            taking effect, such as by posting a notice on our websites or sending you a notification.
            By continuing to use our website after such revisions are in effect, you accept and agree
            to the revisions and to abide by them.
          </Typography>
          <Typography mb={1}>
            This privacy policy was last updated on January 29th, 2024
          </Typography>
        </LayoutStyles>
      </Container>
    </Page>
  );
}
