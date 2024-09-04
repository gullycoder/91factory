import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './MainNavigator';
import { UserProvider } from './src/context/UserContext';
import { ProductProvider } from './src/context/ProductContext';
// import { DemandProvider } from './src/context/DemandContext';
// import { SupplyProvider } from './src/context/SupplyContext';



const App = () => {
  return (
    <NavigationContainer >
      <MainNavigator />
    </NavigationContainer>
  );
};


export default () => {
  return (
    <UserProvider>
      <ProductProvider>
        <App />
      </ProductProvider>
    </UserProvider>
  );
};