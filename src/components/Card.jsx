import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function MuiCard({ category, name, price, quantityInCart }) {
    return (
        <Box sx={{ maxWidth: 275, width: '100%' }}>
            <Card variant="outlined">
                <React.Fragment>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            {name}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {category}
                        </Typography>
                        <Typography variant="body2">
                            ${price}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        {
                            quantityInCart > 0 ? <div style={{ display: 'flex' }}>
                                <Button variant="contained"><AddIcon /></Button>
                                <TextField id="outlined-basic" variant="outlined" value={quantityInCart} />
                                <Button variant="contained"><RemoveIcon /></Button>
                            </div> : <Button variant="contained" >Add to cart</Button>
                        }

                    </CardActions>
                </React.Fragment>
            </Card>
        </Box>
    );
}