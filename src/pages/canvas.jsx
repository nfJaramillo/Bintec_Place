import { Grid, Button, Fab, Box, Typography, Dialog } from "@mui/material"
import { useEffect, useState, useContext } from "react"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import CheckIcon from '@mui/icons-material/Check';
import { getAllPixels, setPixelColor } from "../utils/interact";
import { AppContext } from '../App.jsx';
import { useAccount } from 'wagmi'
import { useWeb3Modal } from '@web3modal/react'
import CircleIcon from '@mui/icons-material/Circle';

const Canvas = () => {

    const { address } = useAccount()
    const contextData = useContext(AppContext);
    const rows = 30
    const columns = 50
    const [selectedIndex, setSelectedIndex] = useState(-1)
    const [selectedSubIndex, setSelectedSubIndex] = useState(-1)
    const [selectedColor, setSelectedColor] = useState(-1)
    const [open, setOpen] = useState(false);
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

    const { isOpen } = useWeb3Modal()

    useEffect(() => {
        async function fetchData() {
            setPixels(await getAllPixels())

        }
        fetchData()
        console.log(isOpen)

    }, []);

    const handlePixelClick = (index, sIndex) => {
        setSelectedIndex(index)
        setSelectedSubIndex(sIndex)

    }

    const handleConfirmation = async () => {
        let response = await setPixelColor(selectedIndex, selectedSubIndex, selectedColor, address)
        contextData.severity(response.severity)
        contextData.text(response.status);
        contextData.show(true)
    }

    return (

        <Grid container direction={{ xs: 'column', md: 'row' }} maxWidth="xl" maxHeight={{ xs: '200vh', md: '78vh' }} sx={{ justifyContent: 'center', display: 'flex', alignItems: 'center', minHeight: '78vh', width: '99vw', maxWidth: { xs: '96vw', md: '100vw' }, bgcolor: '#cfe8fc', borderRadius: 1, mt: 3, background: { xs: 'linear-gradient(to bottom, #F8F8F8, #FFFFFF)', md: '#f7f7f7' } }}>

            <Grid item xs={2} display={{ xs: 'block', md: 'none' }} sx={{ mt: 3, mb: 3 }}>
                <Box textAlign='center'>
                    <Button variant="contained" onClick={() => setOpen(true)} color='yellow'>
                        Instrucciones
                    </Button>
                </Box>
            </Grid>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <Box textAlign='center'>
                    <Typography variant="h5" sx={{ m: 1 }}><CircleIcon sx={{ height: '1vh', verticalAlign: "middle", visibility: 'hidden' }} />Instrucciones</Typography>
                    <Typography variant="h6" sx={{ m: 1 }}><CircleIcon sx={{ height: '1vh', verticalAlign: "middle" }} />Conéctate con Metamask en el botón azul en la esquina superior derecha</Typography>
                    <Typography variant="h6" sx={{ m: 1 }}><CircleIcon sx={{ height: '1vh', verticalAlign: "middle" }} />Selecciona un pixel y un color</Typography>
                    <Typography variant="h6" sx={{ m: 1 }}><CircleIcon sx={{ height: '1vh', verticalAlign: "middle" }} />Confirma en el botón al final de la página</Typography>
                </Box>
            </Dialog>

            <Grid item xs={4} md={8} maxwidth={'1000'}  >
                <TransformWrapper initialScale={0.9} minScale={0.9} initialPositionX={20} initialPositionY={25}  >
                    <TransformComponent>
                        <Grid container wrap="nowrap" direction='column' height={{ xs: '40vh', md: '80vh' }} >
                            {pixels.map((items, index) => (
                                <Grid item key={index} height={{ xs: '0.7vh',sm:'1.3vh', md: '1.6vh', lg:'2.2vh', xl:'2.5vh' }}>
                                    {items.map((pixelColor, sIndex) => (

                                        <Button onClick={() => handlePixelClick(index, sIndex)} key={sIndex} sx={{ border: index === selectedIndex && sIndex === selectedSubIndex ? 1 : 0, padding: 0, minWidth: { xs: '0.7vh', sm:'1.3vh', md: '1.6vh', lg:'2.2vh', xl:'2.5vh'  }, minHeight: { xs: '0.7vh', sm:'1.3vh', md: '1.6vh', lg:'2.2vh', xl:'2.5vh'  }, backgroundColor: Colors[pixelColor], borderRadius: 0, '&:hover': { border: 1, backgroundColor: Colors[pixelColor] } }}>
                                        </Button>
                                    ))}
                                </Grid>
                            ))}
                        </Grid>
                    </TransformComponent>
                </TransformWrapper>

            </Grid>

            <Grid item xs={6} md={4} display={{ xs: isOpen ? 'none' : 'block', md: 'block' }} sx={{ mt: { xs: 3, md: 0 } }}>
                <Grid container sx={{ justifyContent: 'center' }} spacing={3}>
                    <Grid item xs={12} display={{ xs: 'none', md: 'block' }}>
                        <Box textAlign='center'>
                            <Typography variant="h4"><CircleIcon sx={{ height: '1vh', verticalAlign: "middle", visibility: 'hidden' }} />Instrucciones</Typography>
                            <Typography variant="h5"><CircleIcon sx={{ height: '1vh', verticalAlign: "middle" }} /> Conéctate con Metamask</Typography>
                            <Typography variant="h5"><CircleIcon sx={{ height: '1vh', verticalAlign: "middle" }} />Selecciona un pixel y un color</Typography>
                            <Typography variant="h5"><CircleIcon sx={{ height: '1vh', verticalAlign: "middle" }} />Confirma</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box textAlign='center'>
                            <Fab color="black2" onClick={() => setSelectedColor(1)} sx={{ height: { xs: '8vh' }, width: { xs: '8vh' }, border: 1 === selectedColor ? 2 : 0 }}></Fab>
                            <Fab color="white2" onClick={() => setSelectedColor(2)} sx={{ height: { xs: '8vh' }, width: { xs: '8vh' }, border: 2 === selectedColor ? 2 : 0 }}></Fab>
                            <Fab color="yellow" onClick={() => setSelectedColor(3)} sx={{ height: { xs: '8vh' }, width: { xs: '8vh' }, border: 3 === selectedColor ? 2 : 0 }}></Fab>
                            <Fab color="green" onClick={() => setSelectedColor(4)} sx={{ height: { xs: '8vh' }, width: { xs: '8vh' }, border: 4 === selectedColor ? 2 : 0 }} ></Fab>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box textAlign='center'>
                            <Fab color="orange" onClick={() => setSelectedColor(5)} sx={{ height: { xs: '8vh' }, width: { xs: '8vh' }, border: 5 === selectedColor ? 2 : 0 }}></Fab>
                            <Fab color="purple" onClick={() => setSelectedColor(6)} sx={{ height: { xs: '8vh' }, width: { xs: '8vh' }, border: 6 === selectedColor ? 2 : 0 }}></Fab>
                            <Fab color="pink" onClick={() => setSelectedColor(7)} sx={{ height: { xs: '8vh' }, width: { xs: '8vh' }, border: 7 === selectedColor ? 2 : 0 }}></Fab>
                            <Fab color="blue" onClick={() => setSelectedColor(8)} sx={{ height: { xs: '8vh' }, width: { xs: '8vh' }, border: 8 === selectedColor ? 2 : 0 }}></Fab>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box textAlign='center'>
                            <Button variant='contained' color='green' disabled={address != undefined && selectedIndex != -1 && selectedSubIndex != -1 && selectedColor != -1 ? false : true} onClick={() => handleConfirmation()} startIcon={<CheckIcon />}>
                                Confirmar
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>



        </Grid>

    )
}

export default Canvas

