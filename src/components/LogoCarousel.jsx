import { Typography, useMediaQuery } from "@mui/material";
import { Container, Stack } from "@mui/system";
import Slider from 'react-infinite-logo-slider';
import { CircleLogo, CloudflareLogo, GustoLogo, InstacartLogo, PandadocLogo, PelotonLogo, RedditLogo, SpaceXLogo, WorkatoLogo } from "../assets/icons/CompanyLogos";

function LogoCarousel() {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const LogoContainer = ({ children }) => (
    <div style={{ width: isMobile ? '150px' : '300px', display: 'flex', justifyContent: 'center', alignItems: 'center', opacity: "50%" }}>
      {children}
    </div>
  );

  return (
    <Stack alignItems="center" justifyContent="center" direction="column" gap="1rem" width="100vw">
      <Typography align='center' marginTop='2rem' fontWeight="600" fontSize="1.1rem" sx={{ color: "#646464" }}>
        Apply to 5000+ companies with a click of button
      </Typography>
      <Container maxWidth={"100%"}>
        <Slider
          width={isMobile ? '200px' : '250px'}
          duration={40}
          pauseOnHover={false}
          blurBorders={false}
        >
          <Slider.Slide>
            <LogoContainer>
              <CircleLogo />
            </LogoContainer>
          </Slider.Slide>
          <Slider.Slide>
            <LogoContainer>
              <RedditLogo />
            </LogoContainer>
          </Slider.Slide>
          <Slider.Slide>
            <LogoContainer>
              <PandadocLogo />
            </LogoContainer>
          </Slider.Slide>
          <Slider.Slide>
            <LogoContainer>
              <InstacartLogo />
            </LogoContainer>
          </Slider.Slide>
          <Slider.Slide>
            <LogoContainer>
              <PelotonLogo />
            </LogoContainer>
          </Slider.Slide>
          <Slider.Slide>
            <LogoContainer>
              <GustoLogo />
            </LogoContainer>
          </Slider.Slide>
          <Slider.Slide>
            <LogoContainer>
              <CloudflareLogo />
            </LogoContainer>
          </Slider.Slide>
          <Slider.Slide>
            <LogoContainer>
              <WorkatoLogo />
            </LogoContainer>
          </Slider.Slide>
          <Slider.Slide>
            <LogoContainer>
              <SpaceXLogo />
            </LogoContainer>
          </Slider.Slide>
        </Slider>
      </Container>
    </Stack>
  );
}

export default LogoCarousel;
