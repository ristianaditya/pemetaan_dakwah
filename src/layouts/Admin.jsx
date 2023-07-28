// Chakra imports
import { ChakraProvider, Portal, useDisclosure } from '@chakra-ui/react';
import Footer from '../components/Footer/Footer.jsx';
// Layout components
import AdminNavbar from '../components/Navbars/AdminNavbar.jsx';
import Sidebar from '../components/Sidebar/index.jsx';
import React, { useState } from 'react';
import { Redirect, Route, Switch, useLocation, useHistory, } from 'react-router-dom';
import routes from '../routes.jsx';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
// Custom Chakra theme
import theme from '../theme/theme.jsx';

// Custom components
import MainPanel from '../components/Layout/MainPanel';
import PanelContainer from '../components/Layout/PanelContainer';
import PanelContent from '../components/Layout/PanelContent';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Dashboard(props) {
	const { ...rest } = props;
	// states and functions
	const [ sidebarVariant, setSidebarVariant ] = useState('transparent');
	const [ fixed, setFixed ] = useState(false);
	// functions for changing the states from components
	const getRoute = () => {
    let history = useHistory(); 

    const token = localStorage.getItem('access_token') != "" && localStorage.getItem('access_token') ? true : false

    if (!token) {
      history.push("/maps");
    }
		return token;
		// return window.location.pathname !== '/admin/full-screen-maps';
	};
	const getActiveRoute = (routes) => {
		let activeRoute = 'Default Brand Text';
		for (let i = 0; i < routes.length; i++) {
      if (window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
			}
		}
		return activeRoute;
	};
	// This changes navbar state(fixed or not)
	const getActiveNavbar = (routes) => {
		let activeNavbar = false;
		for (let i = 0; i < routes.length; i++) {
			if (routes[i].category) {
				let categoryActiveNavbar = getActiveNavbar(routes[i].views);
				if (categoryActiveNavbar !== activeNavbar) {
					return categoryActiveNavbar;
				}
			} else {
				if (window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1) {
					if (routes[i].secondaryNavbar) {
						return routes[i].secondaryNavbar;
					}
				}
			}
		}

		return activeNavbar;
	};
	const getRoutes = (routes) => {
    let location = useLocation();

		return routes.map((prop, key) => {
      // console.log( useLocation());

      if (prop.layout + prop.path == location.pathname) {
        // console.log(prop)
        return <Route path={prop.layout + prop.path} component={prop.component} key={key} />;
      }

			// if (prop.layout === '/maps/admin') {
			// 	return <Route path={prop.layout + prop.path} component={prop.component} key={key} />;
			// } else {
			// 	return null;
			// }
		});
	};
	const { isOpen, onOpen, onClose } = useDisclosure();
	document.documentElement.dir = 'ltr';
	// Chakra Color Mode
	return (
		<ChakraProvider theme={theme} resetCss={false}>
			<Sidebar
				routes={routes}
				logoText={'PEMETAAN DAKWAH'}
				display='none'
				sidebarVariant={sidebarVariant}
				{...rest}
			/>
			<MainPanel
				w={{
					base: '100%',
					xl: 'calc(100% - 275px)'
				}}>
				<Portal>
					<AdminNavbar
						onOpen={onOpen}
						logoText={'PEMETAAN DAKWAH'}
						brandText={getActiveRoute(routes)}
						secondary={getActiveNavbar(routes)}
						fixed={fixed}
						{...rest}
					/>
				</Portal>
				{getRoute() ? (
					<PanelContent>
						<PanelContainer>
							<Switch>
								{getRoutes(routes)}
								<Redirect from='/maps/admin' to='/maps/admin/dashboard' />
							</Switch>
						</PanelContainer>
					</PanelContent>
        ) : null} 
				<Footer />
			</MainPanel>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
		</ChakraProvider>
	);
}
