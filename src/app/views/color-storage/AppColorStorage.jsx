import { SimpleCard } from 'app/components';
import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { Divider } from '@mui/material';
import { Container } from '../material-kit/auto-complete/AppAutoComplete';
import { colorTableHeader, storageTableHeader } from 'app/utils/constant';
import { useEffect } from 'react';
import axios from 'axios.js';
import { useState } from 'react';
const ColorStorageTable = Loadable(lazy(() => import('./ColorStorageTable')));

function AppColorStorage() {
    const [colors, setColors] = useState([{}]);
    const [storages, setStorages] = useState([{}]);
    const [pageColor, setPageColor] = useState(0);
    const [pageStorage, setPageStorage] = useState(0);
    const [rowsPerPageColor, setRowsPerPageColor] = useState(5);
    const [rowsPerPageStorage, setRowsPerPageStorage] = useState(5);

    const handleChangePageColor = (_, newPage) => {
        setPageColor(newPage);
    };
    const handleChangePageStorage = (_, newPage) => {
        setPageStorage(newPage);
    };

    const handleChangeRowsPerPageColor = (event) => {
        setRowsPerPageColor(+event.target.value);
        setPageColor(0);
    };
    const handleChangeRowsPerPageStorage = (event) => {
        setRowsPerPageStorage(+event.target.value);
        setPageStorage(0);
    };
    // eslint-disable-next-line
    useEffect(async () => {
        const colorRsesponse = await axios.get(
            process.env.REACT_APP_BASE_URL + 'color',
        );
        setColors(colorRsesponse.data);
        const storagesResponse = await axios
            .get(process.env.REACT_APP_BASE_URL + 'storage')
            .catch((res) => console.log(res.response));
        setStorages(storagesResponse.data);
    }, []);
    return (
        <Container>
            <SimpleCard title="Quản lý màu sắc">
                <ColorStorageTable
                    tableHeader={colorTableHeader}
                    data={colors || ''}
                    tableName="color"
                    page={pageColor}
                    setPage={setPageColor}
                    rowsPerPage={rowsPerPageColor}
                    setRowsPerPage={setRowsPerPageColor}
                    handleChangeRowsPerPage={handleChangeRowsPerPageColor}
                    handleChangePage={handleChangePageColor}
                />
            </SimpleCard>
            <Divider />
            <SimpleCard title="Quản lý dung lượng">
                <ColorStorageTable
                    tableHeader={storageTableHeader}
                    data={storages || ''}
                    tableName="storage"
                    page={pageStorage}
                    setPage={setPageStorage}
                    rowsPerPage={rowsPerPageStorage}
                    setRowsPerPage={setRowsPerPageStorage}
                    handleChangeRowsPerPage={handleChangeRowsPerPageStorage}
                    handleChangePage={handleChangePageStorage}
                />
            </SimpleCard>
        </Container>
    );
}

export default AppColorStorage;
