import { Redirect, Route } from 'react-router-dom'
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { listCircleSharp, personCircleSharp, searchSharp } from 'ionicons/icons'
import Activity from './pages/Activity'
import Discover from './pages/Discover'
import Account from './pages/Account'
import Splash from './pages/Splash'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { AuthProvider, useAuth } from './context/AuthContext'
import { IonSpinner } from '@ionic/react'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css'

/* Theme variables */
import './theme/variables.css'

setupIonicReact()

function Routes() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          height: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <IonSpinner name='crescent' />
      </div>
    )
  }

  if (!user) {
    return (
      <IonRouterOutlet>
        <Route exact path='/'>
          <Splash />
        </Route>
        <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path='/signup'>
          <Signup />
        </Route>
        <Route>
          <Splash />
        </Route>
      </IonRouterOutlet>
    )
  }

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path='/activity'>
          <Activity />
        </Route>
        <Route exact path='/discover'>
          <Discover />
        </Route>
        <Route exact path='/account'>
          <Account />
        </Route>
        <Route exact path='/'>
          <Redirect to='/activity' />
        </Route>
      </IonRouterOutlet>
      <IonTabBar slot='bottom'>
        <IonTabButton tab='activity' href='/activity'>
          <IonIcon aria-hidden='true' icon={listCircleSharp} />
          <IonLabel>Activity</IonLabel>
        </IonTabButton>
        <IonTabButton tab='discover' href='/discover'>
          <IonIcon aria-hidden='true' icon={searchSharp} />
          <IonLabel>Discover</IonLabel>
        </IonTabButton>
        <IonTabButton tab='account' href='/account'>
          <IonIcon aria-hidden='true' icon={personCircleSharp} />
          <IonLabel>Account</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  )
}

export default function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </IonReactRouter>
    </IonApp>
  )
}
