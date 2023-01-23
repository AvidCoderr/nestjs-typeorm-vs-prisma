import { Injectable } from "@nestjs/common";
import { HealthCheck } from "@yetoman/dto";

@Injectable()
export class AppService {
  ping(): HealthCheck {
    return { pong: true };
  }
}
