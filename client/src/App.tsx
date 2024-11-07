import { BrowserRouter as Router } from 'react-router-dom';
import { SigninForm } from './components/core/auth/login/components/SigninForm';
import Page from './pages/formPage/page';
function App() {
  return (
    <Router>
      <Page />
      {/* Other components */}
    </Router>
  );
}

export default App;
