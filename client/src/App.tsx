import { BrowserRouter as Router } from 'react-router-dom';
import { SigninForm } from './components/core/auth/login/components/SigninForm';
function App() {
  return (
    <Router>
      <SigninForm />
      {/* Other components */}
    </Router>
  );
}

export default App;
