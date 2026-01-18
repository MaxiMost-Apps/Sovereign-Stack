import React from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Vault } from './pages/Vault';
import { Route, Switch } from "wouter";

function App() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/vault" component={Vault} />
          {/* Add more routes here as needed */}
          <Route>404: Signal Lost</Route>
        </Switch>
      </main>
      <Footer />
    </div>
  )
}

export default App
