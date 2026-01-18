import React from 'react';
import { Route, Switch } from 'wouter';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Manifesto } from './pages/Manifesto';

function App() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/manifesto" component={Manifesto} />
      <Route path="/dashboard" component={Dashboard} />
      {/* 404 Route */}
      <Route>
        <div className="h-screen flex items-center justify-center bg-background text-foreground">
           <div className="text-center">
             <h1 className="text-4xl font-serif font-bold mb-4">404</h1>
             <p className="text-neutral-500">Path not found.</p>
           </div>
        </div>
      </Route>
    </Switch>
  );
}

export default App;
