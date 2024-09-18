import { createTheme } from "@mui/material/styles";

// Define custom colors
export const COLORS = {
  primary: "#3D5AFE", // Soft blue for primary actions
  secondary: "#FF4081", // Warm pink for secondary actions
  background: "#171717", // Main dark background
  cardBackground: "#212121", // Slightly darker card background
  textPrimary: "#E0E0E0", // Off-white primary text color
  textSecondary: "#B0B0B0", // Light gray for secondary text
};

// Define spacing units
export const SPACING = {
  xs: 1, // 4px
  sm: 2, // 8px
  md: 3, // 12px
  lg: 4, // 16px
  xl: 6, // 24px
};

// Define custom typography
export const TYPOGRAPHY = {
  h1: { fontSize: "2.5rem", fontWeight: 700, color: COLORS.textPrimary },
  h2: { fontSize: "2rem", fontWeight: 600, color: COLORS.textPrimary },
  h3: { fontSize: "1.75rem", fontWeight: 500, color: COLORS.textPrimary },
  h4: { fontSize: "1.5rem", fontWeight: 500, color: COLORS.textPrimary },
  h5: { fontSize: "1.25rem", fontWeight: 400, color: COLORS.textPrimary },
  h6: { fontSize: "1rem", fontWeight: 400, color: COLORS.textPrimary },
  body1: { fontSize: "1rem", fontWeight: 400, color: COLORS.textPrimary },
  body2: { fontSize: "0.875rem", fontWeight: 400, color: COLORS.textSecondary },
};

// Define custom shadows
export const SHADOWS = {
  sm: "0px 1px 3px rgba(0, 0, 0, 0.3)",
  md: "0px 3px 6px rgba(0, 0, 0, 0.4)",
  lg: "0px 10px 20px rgba(0, 0, 0, 0.5)",
};

// Create theme instance
const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: COLORS.background,
      paper: COLORS.cardBackground,
    },
    primary: { main: COLORS.primary },
    secondary: { main: COLORS.secondary },
    text: {
      primary: COLORS.textPrimary,
      secondary: COLORS.textSecondary,
    },
  },
  typography: {
    ...TYPOGRAPHY,
  },
  shadows: [
    "none",
    SHADOWS.sm,
    SHADOWS.sm,
    SHADOWS.md,
    SHADOWS.md,
    SHADOWS.lg,
    SHADOWS.lg,
    SHADOWS.lg,
    SHADOWS.lg,
  ],
  spacing: 4,
});

export default theme;
