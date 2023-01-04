interface IConfig {
  API_URL: string;
}

const config: IConfig = {
  API_URL: "http://185.69.154.136:5800",
  // API_URL: "http://localhost:3000/",
};

if (process.env.NODE_ENV === "production") {
  config.API_URL = "http://185.69.154.136:5800";
}

if (process.env.NODE_ENV === "stage") {
  config.API_URL = "http://185.69.154.136:5800";
}

export default config;
