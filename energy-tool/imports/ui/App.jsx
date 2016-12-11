import React, { Component, PropTypes } from 'react';
import { Button, Nav, NavItem } from 'react-bootstrap';
import TimeType from '../shared/enums.js';
import EnergyGraph from './EnergyGraph.jsx';
import TodoList from './TodoList.jsx';

// App component - represents the whole app
export default class App extends Component {
  constructor(props) {
    super(props);

    // Define the state
    this.state = {
      graphType: TimeType.DAY,
      activeNav: 1,
    };
  }

  // Triggered when a navigation tab is selected
  handleSelect(selectedKey) {
    this.setState({
      activeNav: selectedKey
    });
  }

  // Separate method to display component
  getPageContent() {
    return (
      <div>
        { this.state.activeNav == 1 ?
            <EnergyGraph
              graphType={this.state.graphType}>
            </EnergyGraph> : <TodoList/>
        }
      </div>
    );
  }

	render() {

    // Variable declared in render() method
    const pageContent = this.state.activeNav == 1 ?
        <EnergyGraph
          graphType={this.state.graphType}>
        </EnergyGraph> : <TodoList/>;

		return (
			<div className="container">
				<header>
          <h1>Princeton Energy Graph</h1>
          <Nav bsStyle="pills" activeKey={this.state.activeNav} onSelect={this.handleSelect.bind(this)}>
            <NavItem eventKey={1}>Energy Graph</NavItem>
            <NavItem eventKey={2}>TodoList</NavItem>
          </Nav>
				</header>

        { /* Inline ternary if-else */ }
        { this.state.activeNav == 1 ?
         <EnergyGraph
         graphType={this.state.graphType}>
         </EnergyGraph> :
         <TodoList></TodoList>
        }
			</div>
		);
	}
}

