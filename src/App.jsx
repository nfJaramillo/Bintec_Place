import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useState } from "react";
import { AppBarTop } from './AppBar';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home'
import Canvas from './pages/canvas';
import Certificado from './pages/certificado'
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { sepolia } from 'wagmi/chains'



export const AppContext = React.createContext(null)

const chains = [sepolia]
const projectId = 'a2f8d571d4141cefbc3a26db7f6126a0'

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)

const App = () => {

  //State variables
  const [alertText, setAlertText] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [open, setOpen] = useState(false);
  var [alert] = useState({
    text: setAlertText,
    severity: setAlertSeverity,
    show: setOpen,
  })

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <WagmiConfig config={wagmiConfig}>
      <AppContext.Provider value={alert}>
        <ThemeProvider theme={theme}>
          <div className="App">
            <AppBarTop></AppBarTop>
            <Routes>
            <Route exact path="Blockchain4Bintec/Certificado" element={<Certificado />} />
              <Route exact path="Blockchain4Bintec/Lienzo" element={<Canvas />} />
              <Route exact path="Blockchain4Bintec/" element={<Home />} />
              <Route exact path="*" element={<Navigate to='Blockchain4Bintec/' />} />
            </Routes>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity={alertSeverity} sx={{ width: '87vw' }}>
                {alertText}
              </Alert>
            </Snackbar>
          </div>
        </ThemeProvider>
        <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      </AppContext.Provider>
    </WagmiConfig>

  );
}

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const theme = createTheme({
  typography: {
    fontFamily: 'Nunito',
  },
  palette: {
    black2: createColor('#2c2a29'),
    white2: createColor('#ffffff'),
    yellow: createColor('#ffd204'),
    green: createColor('#00c587'),
    orange: createColor('#ff803a'),
    purple: createColor('#9f62d2'),
    pink: createColor('#ffb8d2'),
    blue: createColor('#01cdeb'),
    primary: {
      main: '#2c2a29',
      darker: '#ffd204',
    },
    neutral: {
      main: 'f7f7f7',
      contrastText: '#2c2a29',
    },
  },

});


export default App;