import { Grid, Icon, IconButton, TextField } from '@mui/material';
import { SimpleCard } from 'app/components';

function ListProductVariant() {
    return (
        <Grid
            container
            mt={1}
            justify="space-between"
            alignItems="center"
            ml={1}
        >
            <SimpleCard title={'SẢN PHẨM 1'}>
                {/* dong1 */}
                <Grid display="flex" mb={2}>
                    <Grid
                        item
                        xs={2}
                        display="flex"
                        justify="space-between"
                        alignItems="center"
                    >
                        <TextField
                            type="text"
                            name="username"
                            id="standard-basic"
                            value={''}
                            label="COLOR"
                            fullWidth
                        />
                        <Grid item>
                            <IconButton className="button" aria-label="Delete">
                                <Icon>delete</Icon>
                            </IconButton>
                        </Grid>
                    </Grid>

                    <Grid
                        item
                        xs={2}
                        display="flex"
                        justify="space-between"
                        alignItems="center"
                    >
                        <TextField
                            type="text"
                            name="username"
                            id="standard-basic"
                            value={''}
                            label="RAM"
                            fullWidth
                        />
                        <Grid item>
                            <IconButton className="button" aria-label="Delete">
                                <Icon>delete</Icon>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid display="flex" mb={2}>
                    <Grid
                        item
                        xs={2}
                        display="flex"
                        justify="space-between"
                        alignItems="center"
                    >
                        <TextField
                            type="text"
                            name="username"
                            id="standard-basic"
                            value={''}
                            label="COLOR"
                            fullWidth
                        />
                        <Grid item>
                            <IconButton className="button" aria-label="Delete">
                                <Icon>delete</Icon>
                            </IconButton>
                        </Grid>
                    </Grid>

                    <Grid
                        item
                        xs={2}
                        display="flex"
                        justify="space-between"
                        alignItems="center"
                    >
                        <TextField
                            type="text"
                            name="username"
                            id="standard-basic"
                            value={''}
                            label="RAM"
                            fullWidth
                        />
                        <Grid item>
                            <IconButton className="button" aria-label="Delete">
                                <Icon>delete</Icon>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            </SimpleCard>
        </Grid>
    );
}

export default ListProductVariant;
