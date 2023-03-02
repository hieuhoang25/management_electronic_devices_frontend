import { Button, styled } from '@mui/material';

const StyledButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(1),
}));
const ButtonProduct = ({
    variant,
    color,
    size,
    fullWidth = true,
    children,
    onClick,
}) => {
    return (
        <StyledButton
            variant={variant.toString()}
            color={color.toString()}
            size={size.toString()}
            fullWidth={fullWidth}
            onClick={onClick}
        >
            {children}
        </StyledButton>
    );
};
export default ButtonProduct;
