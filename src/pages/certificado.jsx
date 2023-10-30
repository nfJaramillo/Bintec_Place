import { Typography, Grid, Box, Button } from "@mui/material"
import { getNFT } from "../utils/interact";
import { useAccount } from 'wagmi'
import { useContext } from "react"
import { AppContext } from '../App.jsx';


const Home = () => {

    const contextData = useContext(AppContext);
    const { address } = useAccount()

    const getCertification = async () => {
        let response = await getNFT(address)
        contextData.severity(response.severity)
        contextData.text(response.status);
        contextData.show(true)
    }




    return (
        <Grid container direction={{ xs: 'column', md: 'row' }} alignItems={'center'} justifyContent={'center'} maxWidth="xl" sx={{ bgcolor: '#cfe8fc', minHeight: '80vh', borderRadius: 1, mt: 3, background: 'linear-gradient(to bottom, #F8F8F8, #FFFFFF)' }}>
            <Grid item xs={6} >
                <Typography textAlign={{ xs: 'center', md: 'left' }} sx={{ mt: { xs: 3, md: 3 }, ml: { xs: 0, md: 3 }, typography: { xs: 'h4', md: 'h3' } }}>Reclama aquí tu NFT</Typography>
                <Typography textAlign={{ xs: 'center', md: 'left' }} variant="h5" sx={{ mt: { xs: 3, md: 3 }, ml: { xs: 0, md: 3 } }}>Da clic en el botón y completa la transacción.</Typography>
            </Grid>
            <Grid item xs={6} container alignItems={'center'} justifyContent={'center'} sx={{mt:{xs:5,md:0}}} >
                <Box textAlign='center'>
                    <Button variant="contained" color='yellow' disabled={address != undefined ? false : true} onClick={() => getCertification()} sx={{width:{xs:'60vw',md:'30vw'}, height:{xs:'20vh',md:'20vh'}}}>
                    <Typography textAlign='center' sx={{  typography: { xs: 'h4', md: 'h3' } }}>Reclamar NFT</Typography>
                    </Button>
                </Box>
            </Grid>
        </Grid>
    )
}

export default Home

