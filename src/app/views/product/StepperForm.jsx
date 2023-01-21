import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import { Breadcrumb } from 'app/components';
import React from 'react';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { Container as ContainerStepper } from '../material-kit/forms/AppForm';
import FormStepper1 from './Form/FormStepper1';
import { connect } from 'react-redux';
import { ProductForm, StatusDisable } from 'app/redux/actions/ProductAction';
import { PropTypes } from 'prop-types';

function getSteps() {
    return [
        'Chọn loại sản phẩm cần tạo',
        'Nhập thông tin sản phẩm',
        'Tạo sản phẩm',
    ];
}

function getStepContent(stepIndex) {
    switch (stepIndex) {
        case 0:
            return `Vui lòng nhập tên sản phẩm và loại sản phẩm cần tạo mới`;

        case 1:
            return `Vui lòng nhập đầy đủ thông tin của sản phẩm`;

        case 2:
            return `In laoreet, dui vel tristique facilisis, velit dui dictum diam, nec feugiat mi mauris eu nunc. Nullam auctor eget ante ac laoreet. Aliquam et ante ligula. Nam imperdiet augue magna, ac tincidunt neque mollis nec. Sed eu nunc sit amet tellus commodo elementum non sit amet sem. Etiam ipsum nibh, rutrum vel ultrices in, vulputate ac dolor. Morbi dictum lectus id orci dapibus, et faucibus nulla viverra. Nulla consectetur ex vitae pretium vehicula. Quisque varius tempor erat et semper. Vivamus consectetur, eros sit amet ornare facilisis, nulla felis laoreet tortor, sit amet egestas risus ipsum sed eros.`;

        default:
            return `Hoàn thành tạo sản phẩm`;
    }
}

function StepperForm(props) {
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();
    const { products, StatusDisable } = props;

    const handleNext = () => {
        return setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () =>
        setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const handleReset = () => setActiveStep(0);

    const handleForm = (index) => {
        if (index === 0) {
            return <FormStepper1 />;
        } else if (index === 1) {
        }
    };
    const handleSubmit = () => {
        StatusDisable(false);
    };

    return (
        <>
            <ValidatorForm
                onSubmit={handleSubmit}
                onError={(errors) => console.log(errors)}
            >
                <ContainerStepper>
                    <Box className="breadcrumb">
                        <Breadcrumb
                            routeSegments={[
                                { name: 'Sản phẩm', path: '/product' },
                                { name: 'Thêm mới' },
                            ]}
                        />
                    </Box>

                    <Box>
                        <Stepper activeStep={activeStep} alternativeLabel>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>

                        <Box mt={4}>
                            {activeStep === steps.length ? (
                                <Box>
                                    <Typography>All steps completed</Typography>

                                    <Button
                                        sx={{ mt: 2 }}
                                        variant="contained"
                                        color="secondary"
                                        onClick={handleReset}
                                    >
                                        Reset
                                    </Button>
                                </Box>
                            ) : (
                                <Box>
                                    <Typography>
                                        {getStepContent(activeStep)}
                                    </Typography>

                                    {handleForm(activeStep)}

                                    <Box pt={2}>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                        >
                                            Quay về
                                        </Button>

                                        <Button
                                            disabled={products.inputNextStatus}
                                            sx={{ ml: 2 }}
                                            variant="contained"
                                            color="primary"
                                            onClick={handleNext}
                                            type="submit"
                                            className="button"
                                        >
                                            {activeStep === steps.length - 1
                                                ? 'Hoàn thành'
                                                : 'Kế tiếp'}
                                        </Button>
                                    </Box>
                                </Box>
                            )}
                        </Box>
                    </Box>
                </ContainerStepper>
            </ValidatorForm>
        </>
    );
}
const mapStateToProps = (state) => ({
    ProductForm: PropTypes.func.isRequired,
    StatusDisable: PropTypes.func.isRequired,
    products: state.products,
});
export default connect(mapStateToProps, { ProductForm, StatusDisable })(
    StepperForm,
);
