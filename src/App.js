import React from 'react';
import { ChakraProvider, Box, VStack, Grid, theme } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Loader } from './components';
import { Landing } from './pages';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routingItems } from './content/content';
import SidebarWithHeader from './layout/SidebarWithHeader';
import WithSubnavigation from './layout/Simple';
import { ErrorProvider } from './context/ErrorContext';
function App() {
  return (
    <ChakraProvider theme={theme}>
      <ErrorProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<WithSubnavigation />}>
              {routingItems.map(nav => (
                <Route
                  key={nav.title}
                  path={nav.to}
                  exact={nav.exact}
                  element={nav.component}
                />
              ))}
            </Route>
            <Route path="/user" element={<SidebarWithHeader />} />
          </Routes>{' '}
        </BrowserRouter>
      </ErrorProvider>
    </ChakraProvider>
  );
}

export default App;
