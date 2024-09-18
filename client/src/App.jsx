import { useEffect, Suspense, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box } from "@mui/material";

import AppRoutes from "./routes/AppRoutes";
import LoadingSpinner from "./components/Common/LoadingSpinner";
import Navbar from "./components/Common/Navbar";
import Footer from "./components/Common/Footer";

const App = () => {
  const authUser = useStoreState((state) => state.user.user);
  const setUser = useStoreActions((actions) => actions.user.setUser);
  const initializeSocket = useStoreActions(
    (actions) => actions.socket.initializeSocket
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, [setUser]);

  useEffect(() => {
    if (authUser) {
      initializeSocket();
    }
  }, [authUser, initializeSocket]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Box>
      <Navbar isAuthenticated={!!authUser} role={authUser?.role} />
      <Suspense fallback={<LoadingSpinner />}>
        <AppRoutes authUser={authUser} />
      </Suspense>
      <Footer />
      <Toaster />
    </Box>
  );
};

export default App;
