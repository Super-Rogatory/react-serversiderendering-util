import React, { Component } from 'react';

class Grid extends Component {
	constructor(props) {
		super(props);

		let repos;
		// eslint-disable-next-line no-undef
		if (__isBrowser__) {
			repos = window.__INITIAL_DATA__;
			delete window.__INITIAL_DATA__;
		} else {
			repos = this.props.staticContext.data;
		}

		this.state = {
			repos,
		};
	}

	render() {
		return (
			<ul style={{ display: 'flex', flexWrap: 'wrap' }}>
				{this.state.repos.map(({ name, owner, stargazers_count, html_url }) => (
					<li key={name} style={{ margin: 30 }}>
						<ul>
							<li>
								<a href={html_url}>{name}</a>
							</li>
							<li>@{owner.login}</li>
							<li>{stargazers_count} stars</li>
						</ul>
					</li>
				))}
			</ul>
		);
	}
}

export default Grid;
