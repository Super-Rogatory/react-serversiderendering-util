import React from 'react';
import Grid from './Grid';

class App extends React.Component {
	render() {
		return (
			<div>
				<Grid data={this.props.data} />
			</div>
		);
	}
}

export default App;
