import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.footballlive.app",
  appName: "Football Live",
  webDir: "out",
  server: {
    androidScheme: "https",
    iosScheme: "https",
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1500,
      backgroundColor: "#0a0e17",
      showSpinner: false,
    },
  },
};

export default config;
