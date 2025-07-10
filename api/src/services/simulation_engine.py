import networkx as nx
import numpy as np

class SimulationEngine:
    """
    A more realistic simulation engine that models capital and contagion.
    """
    def __init__(self, graph: nx.DiGraph):
        self.graph = graph
        self.simulation_log = []

    def run_full_simulation(self, initial_shock):
        """Runs the simulation until the network stabilizes."""
        self._log_state(0)
        
        # Apply initial shock
        self._apply_initial_shock(initial_shock)
        self._log_state(1)

        round_num = 2
        while True:
            newly_defaulted_count = self._propagate_shock_round()
            self._log_state(round_num)
            if newly_defaulted_count == 0:
                break
            round_num += 1

        return self.simulation_log

    def _apply_initial_shock(self, shock):
        node_id = shock['target_node']
        if node_id in self.graph:
            self.graph.nodes[node_id]['status'] = 'default'
            self.graph.nodes[node_id]['capital'] = 0

    def _propagate_shock_round(self):
        """Calculates losses and new defaults for one round."""
        newly_defaulted = 0
        nodes_to_evaluate = [n for n, d in self.graph.nodes(data=True) if d['status'] == 'healthy']

        for node_id in nodes_to_evaluate:
            capital = self.graph.nodes[node_id]['capital']
            
            # Calculate losses from defaulted counterparties
            credit_losses = 0
            for pred in self.graph.predecessors(node_id):
                if self.graph.nodes[pred]['status'] == 'default':
                    exposure = self.graph.get_edge_data(pred, node_id)['exposure']
                    # Assume a Loss Given Default (LGD) of 40%
                    credit_losses += exposure * 0.4 
            
            # Update capital and check for default
            new_capital = capital - credit_losses
            self.graph.nodes[node_id]['capital'] = new_capital

            if new_capital < 0: # Simplified default condition
                self.graph.nodes[node_id]['status'] = 'default'
                newly_defaulted += 1

        return newly_defaulted

    def _log_state(self, round_num):
        """Captures the state of the network at a given round."""
        state = {
            "round": round_num,
            "nodes": [data for _, data in self.graph.nodes(data=True)],
            "edges": [{"source": u, "target": v, "exposure": d['exposure']} for u, v, d in self.graph.edges(data=True)],
            "metrics": {
                "num_defaults": sum(1 for _, d in self.graph.nodes(data=True) if d['status'] == 'default'),
                "total_capital": sum(d['capital'] for _, d in self.graph.nodes(data=True) if d['status'] == 'healthy')
            }
        }
        self.simulation_log.append(state)
