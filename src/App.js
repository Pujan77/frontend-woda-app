import React from 'react';
import { ChakraProvider, Box, VStack, Grid, theme } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Loader } from './components';
import { Landing } from './pages';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routingItems } from './content/content';
import SidebarWithHeader from './layout/SidebarWithHeader';
function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SidebarWithHeader />}>
            {routingItems.map(nav => (
              <Route
                key={nav.title}
                path={nav.to}
                exact={nav.exact}
                element={nav.component}
              />
            ))}
          </Route>
        </Routes>{' '}
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
