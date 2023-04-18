import { LoadingButton } from '@mui/lab';
import { Alert, Card, Checkbox, Grid, TextField } from '@mui/material';
import { Box, styled } from '@mui/system';
import { Paragraph } from 'app/components/Typography';
import useAuth from 'app/hooks/useAuth';
import { Formik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Snackbar } from '@mui/material';
import * as Yup from 'yup';

const FlexBox = styled(Box)(() => ({ display: 'flex', alignItems: 'center' }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: 'center' }));

const ContentBox = styled(Box)(() => ({
    height: '100%',
    padding: '32px',
    position: 'relative',
    background: 'rgba(0, 0, 0, 0.01)',
}));

const JWTRoot = styled(JustifyBox)(() => ({
    background: '#1A2038',
    minHeight: '100% !important',
    '& .card': {
        maxWidth: 800,
        minHeight: 400,
        margin: '1rem',
        display: 'flex',
        borderRadius: 12,
        alignItems: 'center',
    },
}));

// inital login credentials
const initialValues = {
    userName: '',
    password: '',
    remember: true,
};

// form field validation schema
const validationSchema = Yup.object().shape({
    password: Yup.string()
        // .min(6, 'Password must be 6 character length')
        .required('Password is required!'),
    userName: Yup.string().required('User is required!'),
});

const JwtLogin = () => {
    // const theme = useTheme();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState('');
    // eslint-disable-next-line
    const { isAuthenticated, login } = useAuth();
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar(false);
    };
    const handleFormSubmit = async (values) => {
        let { userName, password } = values;

        let newObject = { userName: userName, password: password };
        setLoading(true);
        try {
            let response = await login(newObject);

            if (response.error) {
                setAlert(response.error);

                setLoading(false);
                return;
            } else {
                if (response.request === 'forbidden') {
                    navigate('/session/403');
                } else {
                    navigate('/');
                }
            }
        } catch (e) {
            console.log(e);
            setOpenSnackBar(true);
            setAlert('Tài khoản và mật khẩu không chính xác!');
            setLoading(false);
        }
    };

    return (
        <JWTRoot>
            <Card className="card">
                <Grid container>
                    <Grid item sm={6} xs={12}>
                        <JustifyBox p={4} height="100%" sx={{ minWidth: 320 }}>
                            <img
                                src="/assets/images/illustrations/dreamer.svg"
                                width="100%"
                                alt=""
                            />
                        </JustifyBox>
                    </Grid>

                    <Grid item sm={6} xs={12}>
                        <ContentBox>
                            <Formik
                                onSubmit={handleFormSubmit}
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                            >
                                {({
                                    values,
                                    errors,
                                    touched,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                }) => (
                                    <form onSubmit={handleSubmit}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            type="text"
                                            name="userName"
                                            label="Tên đăng nhập"
                                            variant="outlined"
                                            onBlur={handleBlur}
                                            value={values.userName}
                                            onChange={handleChange}
                                            helperText={
                                                touched.userName &&
                                                errors.userName
                                            }
                                            error={Boolean(
                                                errors.userName &&
                                                    touched.userName,
                                            )}
                                            sx={{ mb: 3 }}
                                        />

                                        <TextField
                                            fullWidth
                                            size="small"
                                            name="password"
                                            type="password"
                                            label="Password"
                                            variant="outlined"
                                            onBlur={handleBlur}
                                            value={values.password}
                                            onChange={handleChange}
                                            helperText={
                                                touched.password &&
                                                errors.password
                                            }
                                            error={Boolean(
                                                errors.password &&
                                                    touched.password,
                                            )}
                                            sx={{ mb: 1.5 }}
                                        />

                                        <FlexBox justifyContent="space-between">
                                            <FlexBox gap={1}>
                                                <Checkbox
                                                    size="small"
                                                    name="remember"
                                                    onChange={handleChange}
                                                    checked={values.remember}
                                                    sx={{ padding: 0 }}
                                                />

                                                <Paragraph>
                                                    Remember Me
                                                </Paragraph>
                                            </FlexBox>

                                            {/* <NavLink
                                                to="/session/forgot-password"
                                                style={{
                                                    color: theme.palette.primary
                                                        .main,
                                                }}
                                            >
                                                Quên mật khẩu?
                                            </NavLink> */}
                                        </FlexBox>

                                        <LoadingButton
                                            type="submit"
                                            color="primary"
                                            loading={loading}
                                            variant="contained"
                                            sx={{ my: 2 }}
                                        >
                                            Đăng nhập
                                        </LoadingButton>
                                    </form>
                                )}
                            </Formik>
                            <Snackbar
                                open={openSnackBar}
                                autoHideDuration={4000}
                                onClose={handleCloseSnackBar}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                            >
                                <Alert
                                    onClose={handleCloseSnackBar}
                                    severity="warning"
                                    md={{ width: '100%' }}
                                >
                                    {alert}
                                </Alert>
                            </Snackbar>
                        </ContentBox>
                    </Grid>
                </Grid>
            </Card>
        </JWTRoot>
    );
};

export default JwtLogin;
