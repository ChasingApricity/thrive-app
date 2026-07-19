import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { AppProvider } from '@/hooks/useAppContext';
import { MobileContainer } from '@/components/layout/mobile-container';
import { AnimatePresence } from 'framer-motion';

import Welcome from '@/pages/welcome';
import Assessment from '@/pages/assessment';
import Home from '@/pages/home';
import MorningCheckin from '@/pages/checkin/morning';
import NightReflection from '@/pages/checkin/night';
import Meals from '@/pages/meals';
import Snacks from '@/pages/snacks';
import StressRelief from '@/pages/stress-relief';
import Insights from '@/pages/insights';
import Learn from '@/pages/learn';
import Profile from '@/pages/profile';
import Progress from '@/pages/progress';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();

function Router() {
  return (
    <AnimatePresence mode="wait">
      <Switch>
        <Route path="/" component={Welcome} />
        <Route path="/assessment" component={Assessment} />
        <Route path="/home" component={Home} />
        <Route path="/checkin/morning" component={MorningCheckin} />
        <Route path="/checkin/night" component={NightReflection} />
        <Route path="/meals" component={Meals} />
        <Route path="/snacks" component={Snacks} />
        <Route path="/stress-relief" component={StressRelief} />
        <Route path="/insights" component={Insights} />
        <Route path="/learn" component={Learn} />
        <Route path="/profile" component={Profile} />
        <Route path="/progress" component={Progress} />
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <MobileContainer>
              <Router />
            </MobileContainer>
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </AppProvider>
    </QueryClientProvider>
  );
}

export default App;
