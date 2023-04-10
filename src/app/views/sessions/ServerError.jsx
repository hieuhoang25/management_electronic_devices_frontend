import { Box, styled } from '@mui/material';

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

const ServerError = () => {
    return (
        <ForbiddenRoot>
            <JustifyBox>
                <IMG src="/assets/images/illustrations/502.png" alt="" />
            </JustifyBox>
        </ForbiddenRoot>
    );
};

export default ServerError;
