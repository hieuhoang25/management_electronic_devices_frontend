import { SimpleCard } from 'app/components';
import PaginationTable from '../material-kit/tables/PaginationTable';
import { useState } from 'react';
import { brandTableHeader } from 'app/utils/constant';
import { useEffect } from 'react';
import axios from 'axios.js';
import { Container } from '../material-kit/auto-complete/AppAutoComplete';

function AppBrand() {
    const [brands, setBrands] = useState();
    const [pageBrand, setPageBrand] = useState(0);
    const [rowsPerPageBrand, setRowsPerPageBrand] = useState(5);
    const [loading, setLoading] = useState(false);
    const handleChangePageBrand = (_, newPage) => {
        setPageBrand(newPage);
    };

    // eslint-disable-next-line
    useEffect(async () => {
        setLoading(true);
        const brandResponse = await axios
            .get(process.env.REACT_APP_BASE_URL + 'brand')
            .catch((res) => console.log(res.response));
        setBrands(brandResponse.data);
        setLoading(false);
    }, []);
    const handleChangeRowsPerPageBrand = (event) => {
        setRowsPerPageBrand(+event.target.value);
        setPageBrand(0);
    };
    return (
        <Container>
            <SimpleCard title="Quản lý màu sắc">
                <PaginationTable
                    tableHeader={brandTableHeader}
                    data={brands || []}
                    tableName="brand"
                    page={pageBrand}
                    setPage={setPageBrand}
                    rowsPerPage={rowsPerPageBrand}
                    setRowsPerPage={setRowsPerPageBrand}
                    handleChangeRowsPerPage={handleChangeRowsPerPageBrand}
                    handleChangePage={handleChangePageBrand}
                    loading={loading}
                    setLoading={setLoading}
                />
            </SimpleCard>
        </Container>
    );
}

export default AppBrand;
