export default () => ({
  expo: {
    extra: {
      ACCESS_KEY:
        process.env.ACCESS_KEY || "Xy4u4hVMFAQSKO0sRY57zq5vtzw10wwpPPqTz0ejL7Q",
      eas: {
        projectId: "173dad65-c6bf-4cb3-b742-ab2b4afc249d",
      },
    },
    runtimeVersion: {
      policy: "sdkVersion",
    },
    updates: {
      fallbackToCacheTimeout: 0,
      url: "https://u.expo.dev/173dad65-c6bf-4cb3-b742-ab2b4afc249d",
    },
  },
});
