import React from 'react';

import MainStack from './src/navigation/MainStack';
import ErrorBoundary from './src/screens/ErrorBoundary';
import {NavigationContainer} from '@react-navigation/native';

function App() {
  return (
    <NavigationContainer>
      <ErrorBoundary>
        <MainStack />
      </ErrorBoundary>
    </NavigationContainer>
  );
}

export default App;
