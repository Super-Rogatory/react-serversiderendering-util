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
			loading: repos ? false : true,
		};

		this.fetchRepos = this.fetchRepos.bind(this);
	}

	componentDidMount() {
		if (!this.state.repos) {
			this.fetchRepos(this.props.match.params.id);
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.match.params.id !== this.props.match.params.id) {
			this.fetchRepos(this.props.match.params.id);
		}
	}

	fetchRepos(lang) {
		this.setState({ loading: true });
		this.props.fetchInitialData(lang).then((repos) => this.setState({ repos, loading: false }));
	}

	render() {
		if (this.state.loading) {
			return <div>Loading</div>;
		}
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
