import React from 'react';
import { Routing } from './src/Routing';
import { Provider } from 'react-redux'
import { store } from './redux/store';
import { PaperProvider } from 'react-native-paper';

function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <Routing />
      </PaperProvider>
    </Provider>
  );
}

export default App; 
