import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography } from '@mui/material';
// components
import Page from '../../components/Page';
// sections
import {
  UpgradeInfo,
  Onboarding,
  ProgressStats,
  WelcomePopover,
  QuestionsDialog,
  StartApplyInfo,
  LinkedinQuestionsDialog,
} from '../../sections/dashboard/general';
import { useAuthStore } from '../../zustand/auth.store';
import { useExtensionInfoStore } from '../../zustand/extensionInfo';
import { EXTENSION_ID } from '../../utils/variablesFromEnv';
import { usePaymentStore } from '../../zustand/payment.store';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(2, 0),
}));

// ----------------------------------------------------------------------

export default function General() {
  const { userData } = useAuthStore();
  const { plans } = usePaymentStore();
  const { setIsExtension } = useExtensionInfoStore();
  const handleInfoPopover = useOutletContext();
  const [questionDialog, setQuestionDialog] = useState(false);
  const [linkedinQuestionsDialog, setLinkedinQuestionsDialog] = useState(false);

  const questionsDialogHandler = () => {
    if (!userData?.active_subscription && userData.has_used_free_subscription) {
      handleInfoPopover();
    } else {
      setQuestionDialog(!questionDialog);
    }
  };

  const linkedinQuestionsDialogHandler = async () => {
    try {
      // eslint-disable-next-line no-undef
      await chrome.runtime.sendMessage(
        EXTENSION_ID,
        'checkExtension',
        (response) => {
          if (response === 'extension_available') {
            if (
              (!userData?.active_subscription &&
                userData.has_used_free_subscription) ||
              userData?.active_subscription?.today_applications?.possible === 0
            ) {
              handleInfoPopover();
            } else {
              setLinkedinQuestionsDialog(!linkedinQuestionsDialog);
            }
          } else {
            setIsExtension(false);
          }
        },
      );
    } catch (error) {
      console.log(error)
      setIsExtension(false);
    }
  };

  const isHigherPlan = (!userData?.active_subscription && plans.find(item => userData?.last_used_subscription?.plan == item?.id)?.slug === "advanced")
    || plans.find(item => userData?.active_subscription?.plan == item?.id)?.slug === "advanced";

  return userData ? (
    <Page title='Dashboard General page'>
      <Container>
        <ContentStyle>
          <Typography variant='h5' mb={2}>
            Welcome {userData.first_name} 👋
          </Typography>

          {!isHigherPlan && <UpgradeInfo />}

          {userData?.job_search_filters?.length ? (
            <StartApplyInfo />
          ) : (
            <Onboarding
              setUpResume={questionsDialogHandler}
              setUpLinkedin={linkedinQuestionsDialogHandler}
            />
          )}

          {userData && <ProgressStats />}

          <QuestionsDialog
            onClose={questionsDialogHandler}
            state={questionDialog}
          />

          <LinkedinQuestionsDialog
            onClose={linkedinQuestionsDialogHandler}
            state={linkedinQuestionsDialog}
            userData={userData}
          />
        </ContentStyle>
      </Container>
    </Page>
  ) : (
    <></>
  );
}
