import { store, persistor } from '@/features/store'
import { LayoutProps } from '@/types/common'
import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';

const ReduxProvider: React.FC<LayoutProps> = ({ children }) => {
  return <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
        {children}
    </PersistGate>
  </Provider>
}

export default ReduxProvider