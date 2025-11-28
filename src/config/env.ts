export const getEnv = () => {
    const frontendUrl = import.meta.env.VITE_FRONTEND_URL;
  
    if (!frontendUrl) throw new Error("VITE_FRONTEND_URL is missing in .env");

    return {
      frontendUrl,
    };
};
  