import { SimpleCard } from 'app/components';
import CollapsibleTable from '../material-kit/tables/CollapsibleTable';
import { Container } from '../material-kit/tables/AppTable';
import { Grid } from '@mui/material';
import { orderTableHeader } from 'app/utils/constant';
import Badge from '@mui/material/Badge';
import { Button } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import styled from '@emotion/styled';
import { useState } from 'react';
import Loading from 'app/components/MatxLoading';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getOrderList, getListCountionOrder} from 'app/redux/actions/OrderAction';
const StyledButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(1),
}));


function AppOrder() {
    const dispatch = useDispatch();


    const [status1, setStatus1] = useState(false)
    const [status2, setStatus2] = useState(false)
    const [status3, setStatus3] = useState(false)
    const [status4, setStatus4] = useState(false)
    const [reload, setReload] = useState(true);
    const [loading, setLoading] = useState(false);
    const orders = useSelector((state) => state.orders);
    const listCountion = useSelector((state) => state.orders.listCountion);
    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(async () => {
        setLoading(true);
        
        await dispatch(getOrderList(selectedOptions.join()));
        await dispatch(getListCountionOrder());

        setLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reload]);
    const handleOptionClick = (option, index) => {
        switch (index) {
            case 1:
                setStatus1(!status1)
                break;
            case 2:
                setStatus2(!status2)
                break;
            case 3:
                setStatus3(!status3)
                break;
            case 4:
                setStatus4(!status4)
                break;
            default:
                break;
        }
    if (selectedOptions.includes(option)) {
      // Nếu option đã được chọn, thì bỏ chọn
      setSelectedOptions(selectedOptions.filter(item => item !== option));
    } else {
      // Nếu option chưa được chọn, thì thêm vào danh sách chọn
      setSelectedOptions([...selectedOptions, option]);
    }
    setReload(!reload)
  };
    return loading === true ? (
        <>
            <Loading />
        </>
    ) : (
        <Container>
            <SimpleCard title="Quản lý đơn hàng">
            <Grid
                   container
                   direction="row"
                   justifyContent="space-evenly"
                   alignItems="center"  spacing={0.5}
                >
                    <Grid xs={3} item>
                    <Badge color="info" badgeContent={listCountion.CXN} >
                    <StyledButton
                        
                        variant= { status1 == true  ? "contained" : "outlined"}
                        color="info"
                        onClick={() => handleOptionClick("Chờ xác nhận", 1)}
                    
                    >
                        Chờ xác nhận
                    </StyledButton>   
                    </Badge>
                    </Grid>
                    <Grid xs={3} item>
                    <Badge color="warning" badgeContent={listCountion.DG} >
                    <StyledButton
                        
                        variant={ status2 == true  ? "contained" : "outlined"}
                        color="warning"
                        onClick={() => handleOptionClick("Đang giao", 2)}
                    
                    >
                       Đang giao
                    </StyledButton>   
                    </Badge>
                    </Grid>
                    <Grid xs={3} item>
                    <Badge color="error" badgeContent={listCountion.DH} >
                    <StyledButton
                        
                        variant={ status3 == true  ? "contained" : "outlined"}
                        color="error"
                        onClick={() => handleOptionClick("Đã hủy", 3)}
                    
                    >
                       Đã huỷ 
                    </StyledButton>   
                    </Badge>
                    </Grid>
                    <Grid xs={3} item>
                    <Badge color="success" badgeContent={listCountion.HT} >
                    <StyledButton
                        
                        variant={ status4 == true  ? "contained" : "outlined"}
                        color="success"
                        onClick={() => handleOptionClick("Hoàn thành", 4)}
                    
                    >
                        Hoàn thành
                    </StyledButton>   
                    </Badge>
                    </Grid>
                </Grid>
 
              
            </SimpleCard>



            <SimpleCard >
            <CollapsibleTable tableHeader={orderTableHeader} orders={ orders} setLoading = {setLoading} setReload = {setReload} reload = {reload} loading ={loading}/>
            </SimpleCard>
        
        </Container>
    );
}

export default AppOrder;
