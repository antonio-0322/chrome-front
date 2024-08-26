import { Typography, useMediaQuery } from "@mui/material";

function MobileSupportAlert() {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (isMobile && (
    <Typography align='center' sx={{ color: "#646464" }}>
      *This website works best on desktop/laptop
    </Typography>)
  )
}

export { MobileSupportAlert }
