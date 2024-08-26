// @mui
import { styled } from "@mui/material/styles";
import { Container, Typography } from "@mui/material";
// components
import Page from "../../components/Page";

// ----------------------------------------------------------------------

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 400,
  margin: "auto",
  padding: theme.spacing(4, 0),
}));

// ----------------------------------------------------------------------

export default function SuccessView() {
  return (
    <Page title="Account Activation">
      <Container>
        <ContentStyle>
          <Typography variant="h5" gutterBottom align='center'>
            Thank You
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} align='center'>
            You are successfully verified.
          </Typography>
        </ContentStyle>
      </Container>
    </Page>
  );
}
