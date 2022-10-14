import Constants from "expo-constants";

function getAccessKey() {
  const ACCESS_KEY: string = Constants.expoConfig.extra.ACCESS_KEY;

  if (!ACCESS_KEY) {
    throw new Error("ACCESS_KEY is missing.");
  }

  return ACCESS_KEY;
}

export const Env = {
  ACCESS_KEY: getAccessKey(),
};
