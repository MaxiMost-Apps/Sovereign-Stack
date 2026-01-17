import React from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Route, Switch } from "wouter";

function App() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        <Switch>
          <Route path="/" component={Home} />
          <Route>404: Sector Unavailable</Route>
        </Switch>
      </main>
      <Footer />
    </div>
  )
}

export default App
