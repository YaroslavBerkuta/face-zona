type Keys = "accessToken" | "refreshToken";

class StorageService {
  private data: Record<Keys, string> = {
    accessToken: null,
    refreshToken: null,
  };

  constructor() {
    this.init();
  }

  private init() {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    this.data = {
      accessToken,
      refreshToken,
    };
  }

  public set(key: Keys, value: string) {
    this.data[key] = value;
    localStorage.setItem(key, value);
  }

  public get(key: Keys) {
    return this.data[key];
  }

  public remove(key: Keys) {
    this.data[key] = null;
    localStorage.removeItem(key);
  }
}

export const storageService = new StorageService();
