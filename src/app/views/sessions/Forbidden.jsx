import { Box, Button, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const FlexBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
}));

const JustifyBox = styled(FlexBox)(() => ({
  maxWidth: 320,
  flexDirection: 'column',
  justifyContent: 'center',
}));

const IMG = styled('img')(() => ({
  width: '100%',
  marginBottom: '32px',
}));

const ForbiddenRoot = styled(FlexBox)(() => ({
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh !important',
}));

const Forbidden = () => {
  const navigate = useNavigate();

  return (
    <ForbiddenRoot>
      <JustifyBox>
        <IMG src="https://i.pinimg.com/736x/d5/be/85/d5be852bf324686ddf6f7bfa3d7c3ada.jpg" alt="" />

        <Button
          color="primary"
          variant="contained"
          sx={{ textTransform: 'capitalize' }}
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
      </JustifyBox>
    </ForbiddenRoot>
  );
};

export default Forbidden;
