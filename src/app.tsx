import React from 'react';
import { MainLayout } from './layout/main_layout';
import { Provider } from 'react-redux';
import { store } from './store/store';

function App() {
  return (
    <Provider store={store}>
      <main>
        <MainLayout />
      </main>
    </Provider>
  );
}

export default App;
