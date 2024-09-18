import { useEffect, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box } from "@mui/material";

import AppRoutes from "./routes/AppRoutes";
import LoadingSpinner from "./components/Common/LoadingSpinner";
import Footer from "./components/Common/Footer";

const App = () => {
  const authUser = useStoreState((state) => state.user.user);
  const setUser = useStoreActions((actions) => actions.user.setUser);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);

  return (
    <Box>
      <Suspense fallback={<LoadingSpinner />}>
        <AppRoutes authUser={authUser} />
      </Suspense>
      <Footer />
      <Toaster />
    </Box>
  );
};

export default App;
