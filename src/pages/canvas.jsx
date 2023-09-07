import { Grid, Button, Fab, Box } from "@mui/material"
import { useEffect, useState } from "react"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import CheckIcon from '@mui/icons-material/Check';
import { getAllPixels, setPixelColor } from "../utils/interact";

const Canvas = () => {


    const rows = 30
    const columns = 50
    const [selectedIndex, setSelectedIndex] = useState(-1)
    const [selectedSubIndex, setSelectedSubIndex] = useState(-1)
    const [selectedColor, setSelectedColor] = useState(-1)
    const Colors = {
        0: '#ffffff',
        1: '#2c2a29',
        2: '#ffffff',
        3: '#ffd204',
        4: '#00c587',
        5: '#ff803a',
        6: '#9f62d2',
        7: '#ffb8d2',
        8: '#01cdeb',
    }

    const [pixels, setPixels] = useState(Array(rows).fill().map(() =>
        Array(columns).fill(2)))

    useEffect(() => {
        async function fetchData() {
            setPixels(await getAllPixels())

        }
        fetchData()

    }, []);

    const handlePixelClick = (index, sIndex) => {
        setSelectedIndex(index)
        setSelectedSubIndex(sIndex)

    }

    const handleConfirmation = async () => {
         setPixelColor(selectedIndex, selectedSubIndex, selectedColor)
    }


    return (

        <Grid container direction={{ xs: 'column', md: 'row' }} maxWidth="xl" sx={{ justifyContent: 'center', display: 'flex', alignItems: 'center', minHeight: '85vh', width: '99vw', maxWidth: '100vw', bgcolor: '#cfe8fc', borderRadius: 1, mt: 3, background: '#f7f7f7' }}>

            <Grid item xs={12} sm={8} >
                <TransformWrapper initialScale={0.9} minScale={0.9} initialPositionX={50} initialPositionY={40} >
                    <TransformComponent>
                        <Grid container direction='column' height={{ xs: '50vh', md: '80vh' }}>
                            {pixels.map((items, index) => {
                                return (
                                    <Grid item key={index}  height={{ xs: '0.7vh', md: '2.5vh' }}>
                                        {items.map((pixelColor, sIndex) => {
                                            return (
                                                <Button onClick={() => handlePixelClick(index, sIndex)} key={sIndex} sx={{ border: index === selectedIndex && sIndex === selectedSubIndex ? 1 : 0, padding: 0, minWidth: { xs: '0.7vh', md: '2.5vh' }, minHeight: { xs: '0.7vh', md: '2.5vh' }, backgroundColor: Colors[pixelColor], borderRadius: 0, '&:hover': { border: 1, backgroundColor: Colors[pixelColor] } }}>
                                                </Button>

                                            )
                                        })}
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </TransformComponent>
                </TransformWrapper>

            </Grid>

            <Grid item xs={12} sm={4}>
                <Grid container sx={{ justifyContent: 'center' }} spacing={1}>
                    <Grid item xs={12}>
                        <Box textAlign='center'>
                            <Fab color="black2" onClick={() => setSelectedColor(1)} sx={{height: { xs: '8vh'}, width: { xs: '8vh'},border: 1 === selectedColor ? 2 : 0 }}></Fab>
                            <Fab color="white2" onClick={() => setSelectedColor(2)} sx={{height: { xs: '8vh'}, width: { xs: '8vh'}, border: 2 === selectedColor ? 2 : 0 }}></Fab>
                            <Fab color="yellow" onClick={() => setSelectedColor(3)} sx={{height: { xs: '8vh'}, width: { xs: '8vh'}, border: 3 === selectedColor ? 2 : 0 }}></Fab>
                            <Fab color="green" onClick={() => setSelectedColor(4)} sx={{height: { xs: '8vh'}, width: { xs: '8vh'}, border: 4 === selectedColor ? 2 : 0 }} ></Fab>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box textAlign='center'>
                            <Fab color="orange" onClick={() => setSelectedColor(5)} sx={{height: { xs: '8vh'}, width: { xs: '8vh'}, border: 5 === selectedColor ? 2 : 0 }}></Fab>
                            <Fab color="purple" onClick={() => setSelectedColor(6)} sx={{height: { xs: '8vh'}, width: { xs: '8vh'}, border: 6 === selectedColor ? 2 : 0 }}></Fab>
                            <Fab color="pink" onClick={() => setSelectedColor(7)} sx={{height: { xs: '8vh'}, width: { xs: '8vh'}, border: 7 === selectedColor ? 2 : 0 }}></Fab>
                            <Fab color="blue" onClick={() => setSelectedColor(8)} sx={{height: { xs: '8vh'}, width: { xs: '8vh'}, border: 8 === selectedColor ? 2 : 0 }}></Fab>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box textAlign='center'>
                            <Button variant="outlined" onClick={() => handleConfirmation()} startIcon={<CheckIcon />}>
                                Confirm
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>



        </Grid>

    )
}

export default Canvas

