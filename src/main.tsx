import '@ant-design/v5-patch-for-react-19';

// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// CSS
import './index.css'
import './style/cursors.css'
import 'katex/dist/katex.min.css'; // Import KaTeX CSS

// Components
import App from './App.tsx'

// Redux
import { Provider } from 'react-redux'
import { store, persistor } from './Redux/store.ts'
import { PersistGate } from 'redux-persist/integration/react' 

// router
import { BrowserRouter } from 'react-router-dom'


createRoot(document.getElementById('root')!).render(
      <Provider store={store}>
        {/* 等待 redux-persist rehydrate 完成后再渲染 UI */}
        <PersistGate persistor={persistor}>
          <BrowserRouter basename="/Watermarking-and-Removal-in-Generative-Image-Pipelines/">
              <App />
          </BrowserRouter>
        </PersistGate>
      </Provider>
  ,
)

