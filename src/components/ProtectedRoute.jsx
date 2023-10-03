import { useNavigate, useLocation } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { db } from '../firebaseConfig'

function ProtectedRoute({ element }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [permission, setPermission] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const docRef = doc(db, "permissions", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setPermission(data.type);
        } else {
          console.log("No permissions set for user");
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return null;

  if (!user) {
    // Use state to remember the location user was trying to access
    navigate('/sign-in', { state: { from: location } });
    return null;
  }

  if (user && permission !== "candidate") {
    navigate('/sign-up');
    return null;
  }

  return element;
}

export default ProtectedRoute;