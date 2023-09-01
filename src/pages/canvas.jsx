import { Grid, Button } from "@mui/material"
import { useEffect } from "react"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const Canvas = () => {


    const rows = 50;
    const columns = 30;


    const pixels = Array(rows).fill().map(() =>
        Array(columns).fill('#ffffff'));

    useEffect(() => {

    }, []);

    return (

        <Grid container direction={{ xs: 'column', md: 'row' }} justifyContent="center" maxWidth="xl" sx={{ display: 'flex', alignItems: 'center', height: '80vh', width: '99vw', bgcolor: '#cfe8fc', borderRadius: 1, mt: 3, background: 'linear-gradient(to bottom, #F8F8F8, #FFFFFF)' }}>
            <TransformWrapper>
                <TransformComponent>
                    {pixels.map((items, index) => {
                        return (
                            <div key={index} >
                                {items.map((subItems, sIndex) => {
                                    return (
                                        <Grid item key={sIndex} sx={{padding:0, margin:0 ,width: 20, height: 20}}>
                                            <Button variant="outlined" sx={{padding:0, minWidth: 1, minHeight: 1, width: 20, height: 20, backgroundColor: subItems, borderRadius: 0 }}>
                                            </Button>
                                        </Grid>
                                    )
                                })}
                            </div>
                        );
                    })}
                </TransformComponent>
            </TransformWrapper>
        </Grid>

    )
}

export default Canvas

