import React from 'react';
import ReactFlow, { Background, Controls } from 'react-flow-renderer';

const statusColors = {
    healthy: '#4caf50', // green
    stressed: '#ff9800', // orange
    default: '#f44336',  // red
};

const NetworkGraph = ({ networkData }) => {
    if (!networkData || !networkData.nodes) {
        return <div>Loading network...</div>;
    }

    const elements = [
        ...networkData.nodes.map(node => ({
            id: node.id,
            data: { label: `${node.id} (C: ${Math.round(node.capital)})` },
            position: { x: Math.random() * 800, y: Math.random() * 500 }, // Positions should be calculated properly
            style: {
                background: statusColors[node.status] || '#888',
                color: 'white',
                border: '1px solid #222',
            },
        })),
        ...networkData.edges.map(edge => ({
            id: `e-${edge.source}-${edge.target}`,
            source: edge.source,
            target: edge.target,
            label: `€${edge.exposure}M`,
            animated: true,
        })),
    ];

    return (
        <ReactFlow elements={elements} style={{ width: '100%', height: '100%' }}>
            <Background />
            <Controls />
        </ReactFlow>
    );
};

export default NetworkGraph;
