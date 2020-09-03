import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
  
	body {
		font-family: "Montserrat", sans-serif;
		background: #eee;
	}

	a {
		text-decoration: none;
	}

	ul {
		list-style: none;
	}

	button {
		outline: none;
		cursor: pointer;
	}
`;

export default GlobalStyle;
