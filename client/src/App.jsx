import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useStoreActions, useStoreState } from "easy-peasy";
import AppRoutes from "./routes/AppRoutes";
import { Box } from "@mui/material";

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
      <AppRoutes authUser={authUser} />
      <Toaster />
    </Box>
  );
};

export default App;
