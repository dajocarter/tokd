import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInAnonymously,
  signOut as firebaseSignOut,
  User as FirebaseUser,
} from 'firebase/auth'
import { auth } from '../firebase'

type User = {
  uid: string
  email?: string | null
}

type AuthContextValue = {
  user: User | null
  loading: boolean
  signIn: (email?: string, password?: string) => Promise<void>
  signUp: (email?: string, password?: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

function fromFirebaseUser(u: FirebaseUser | null): User | null {
  if (!u) return null
  return { uid: u.uid, email: u.email }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (fbUser) => {
      setUser(fromFirebaseUser(fbUser))
      setLoading(false)
    })
    return () => unsub()
  }, [])

  const signIn = async (email?: string, password?: string) => {
    try {
      if (email && password) {
        await signInWithEmailAndPassword(auth, email, password)
      } else {
        // fallback to anonymous sign-in if no credentials supplied
        await signInAnonymously(auth)
      }
    } catch (err) {
      console.error('signIn error', err)
      throw err
    }
  }

  const signUp = async (email?: string, password?: string) => {
    try {
      if (email && password) {
        await createUserWithEmailAndPassword(auth, email, password)
      } else {
        // fallback to anonymous create
        await signInAnonymously(auth)
      }
    } catch (err) {
      console.error('signUp error', err)
      throw err
    }
  }

  const signOut = async () => {
    try {
      await firebaseSignOut(auth)
    } catch (err) {
      console.error('signOut error', err)
      throw err
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export default AuthContext
