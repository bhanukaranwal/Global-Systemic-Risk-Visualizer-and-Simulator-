import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ControlPanel from './components/ControlPanel';
import NetworkGraph from './components/NetworkGraph';
import ResultsDashboard from './components/ResultsDashboard';
import { getInitialData, runSimulation } from './services/api';
import './App.css';

const darkTheme = createTheme({ palette: { mode: 'dark' } });

function App() {
    const [network, setNetwork] = useState({ nodes: [], edges: [] });
    const [simulationResults, setSimulationResults] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getInitialData().then(data => {
            setNetwork(data);
        });
    }, []);

    const handleRunSimulation = async (shock) => {
        setIsLoading(true);
        const results = await runSimulation(shock);
        setSimulationResults(results);
        setCurrentStep(0);
        setIsLoading(false);
    };

    const displayedNetwork = simulationResults.length > 0 ? simulationResults[currentStep] : {nodes: network.nodes, edges: network.edges, metrics: {}};

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Box sx={{ display: 'flex', height: '100vh' }}>
                <ControlPanel
                    nodes={network.nodes}
                    onRunSimulation={handleRunSimulation}
                    isLoading={isLoading}
                />
                <Box component="main" sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h4" gutterBottom>
                        Global Systemic Risk Visualizer
                    </Typography>
                    <Box sx={{ flexGrow: 1, position: 'relative', border: '1px solid grey', borderRadius: '4px' }}>
                        <NetworkGraph networkData={displayedNetwork} />
                    </Box>
                    <ResultsDashboard
                        results={simulationResults}
                        currentStep={currentStep}
                        setCurrentStep={setCurrentStep}
                    />
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default App;
