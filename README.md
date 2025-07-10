# Global Systemic Risk Visualizer and Simulator (GSRVS) - v2.0

## Overview

GSRVS is an enterprise-grade, open-source platform for simulating and visualizing financial contagion. Built with a modern tech stack, it provides a powerful, interactive environment for researchers, regulators, and financial professionals to conduct sophisticated systemic risk analysis.

## Key Enhancements in v2.0

-   **Sophisticated Simulation Engine:** Models multi-stage contagion, including credit losses, funding shocks, and asset fire sales.
-   **Interactive React Frontend:** A dynamic and user-friendly interface for building scenarios, controlling simulations, and analyzing results.
-   **RESTful API Backend:** A robust FastAPI backend serving data and handling complex calculations.
-   **Containerized with Docker:** Get the entire application running with a single command.
-   **Advanced Visualization:** Interactive network graphs and time-series dashboards to track key risk metrics.

## Key Features

-   **Dynamic Network Visualization:** Interactive graphs powered by React Flow.
-   **Shock Simulation Engine:** Simulate defaults, liquidity shocks, and asset price crashes.
-   **Scenario Builder:** Interactively design and save complex scenarios.
-   **Capital & Liquidity Modeling:** Tracks regulatory capital (CET1) and liquidity buffers.
-.  **Contagion Pathways Analyzer:** Trace the exact pathways of shock propagation.
-   **Risk Dashboards:** Real-time charts for capital shortfalls, defaulted assets, and more.

## Getting Started

### Prerequisites

-   Docker and Docker Compose

### Running the Project

This project is fully containerized. To get started, simply clone the repository and run Docker Compose.

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/GSRVS.git](https://github.com/your-username/GSRVS.git)
    cd GSRVS
    ```

2.  **Build and run the containers:**
    ```bash
    docker-compose up --build
    ```

3.  **Access the application:**
    -   **Frontend UI:** Open your browser to `http://localhost:3000`
    -   **Backend API Docs:** Access the interactive API documentation at `http://localhost:8000/docs`

## Project Architecture

-   **`/api`**: The Python backend powered by FastAPI. It handles all data processing, simulation logic, and serves the REST API.
-   **`/client`**: The React.js frontend. It provides the user interface for interacting with the simulation.
-   **`/data`**: Contains sample data files for a quick start.

## Usage

1.  **Load Data:** The application loads the sample data by default.
2.  **Configure Scenario:** Use the "Control Panel" on the left to define the initial shock (e.g., select an institution to default, or define a market-wide asset price drop).
3.  **Run Simulation:** Click the "Run Simulation" button.
4.  **Analyze Results:**
    -   Observe the **Network Graph** as nodes change color to reflect their status (Healthy, Stressed, Defaulted).
    -   Watch the **Results Dashboard** to see charts of key metrics evolving over the simulation rounds.

## Contributing

We welcome contributions! Please see `CONTRIBUTING.md` for guidelines.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
