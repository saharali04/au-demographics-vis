import './App.css';
import { useState, useEffect } from 'react';
import Topbar from './scenes/global/Topbar';
import Dashboard from './scenes/dashboard';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './theme';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';

function App() {
    const [regionData, setRegionData] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        fetch(
            'https://script.google.com/macros/s/AKfycbxLWnFqfeybjfY_6rTu1EQBHsi4q59XsdWGuu0UaSkbcXnLfS09-snjxWP-NP90HiUa/exec'
        )
            .then((response) => response.json())
            .then((data) => {
                setRegionData(data);
                setIsLoading(false);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, [regionData]);

    const [theme, colorMode] = useMode();

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="app" dir="col">
                    <main className="content">
                        <Topbar />
                        {isLoading ? (
                            <Box
                                gridRow="span 3"
                                sx={{
                                    display: 'flex',
                                    alignContent: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <CircularProgress color="secondary" />
                            </Box>
                        ) : (
                            <Dashboard data={regionData} />
                        )}
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
