import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routingItems, routingItemsPrivate } from './content/content';
import SidebarWithHeader from './layout/SidebarWithHeader';
import WithSubnavigation from './layout/Simple';
import { ErrorProvider } from './context/ErrorContext';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './routes/PrivateRoute';
function App() {
  return (
    <ChakraProvider theme={theme}>
      <ErrorProvider>
        <AuthProvider>
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
              <Route
                path="/user"
                element={
                  <PrivateRoute>
                    <SidebarWithHeader />
                  </PrivateRoute>
                }
              >
                {routingItemsPrivate.map(nav => (
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
        </AuthProvider>
      </ErrorProvider>
    </ChakraProvider>
  );
}

export default App;
