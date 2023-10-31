import { GdServerModule } from "@glidecms/deliver-core-dev";
import { ExternalDataService } from "./external-data.service";

@GdServerModule({
  bootstrapComponentName: "",
  declarations: [],
  imports: [],
  providers: [ExternalDataService],
})
export class MainModule {}
