import { Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import {
  Card, Button, CardContent, Divider,
} from '@mui/material';
import XIcon from '@mui/icons-material/X';
import Box from '@mui/material/Box';

// This component is a combination of an image and a material UI card to be used in the AboutMe page.
export default function AboutMeCardCombo({ aboutMe }) {
  return (
    <Box id="about-me">
      <Box id="about-me-image">
        <Image src={aboutMe.aboutMeImage} alt="About Me Image(Original is anime style image of Ilja Dragunov" width={500} height={450} style={{ marginBottom: '20px' }} />
      </Box>
      <Card id="about-me-card">
        <CardContent>
          <h5>
            {aboutMe.aboutMeText}
          </h5>
          <Divider sx={{ backgroundColor: 'black', margin: '20px 0' }} />
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="text"
              color="inherit"
              onClick={() => { window.location.href = aboutMe.aboutMeProfileLink; }}
            >
              <XIcon />
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

AboutMeCardCombo.propTypes = {
  aboutMe: PropTypes.shape({
    aboutMeText: PropTypes.string,
    aboutMeProfileLink: PropTypes.string,
    aboutMeImage: PropTypes.string,
  }).isRequired,
};
