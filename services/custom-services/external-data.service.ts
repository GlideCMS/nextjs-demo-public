import { GdService } from "@glidecms/deliver-core-dev/services";
import axios from "axios";

const LRU = require("lru-cache");
const cacheClient = new LRU({
  max: 500,
  maxAge: 300000,
});

export interface IExternalDataService {
  getMostPopularData();
}

@GdService({
  scope: 1,
})
export class ExternalDataService implements IExternalDataService {
  constructor() {
    setInterval(
      () => {
        this.fetchMostPopularData();
      },
      process.env.ENVIRONMENT === "qa" ? 1000 * 60 * 20 : 1000 * 60 * 60 * 2
    );
  }

  public async getMostPopularData() {
    let data = cacheClient.get("most-popular-data");
    if (!data) {
      data = (await axios.get("https://jsonplaceholder.typicode.com/posts"))
        .data;
      cacheClient.set("most-popular-data", data);
      return data;
    }

    return data;
  }

  private fetchMostPopularData() {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((r) => {
        if ((r as any).data.length) {
          cacheClient.set("most-popular-data", (r as any).data);
        }
      })
      .catch((e) => console.log("Error fetching MP feed: "));
  }
}
