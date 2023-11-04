import { BadRequestException, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { StatusService } from "../status/status.service";
import { DbService } from "../db/db.service";

@Injectable()
export class CheckerService {
  constructor(
    private readonly httpService: HttpService,
    private readonly dbService: DbService,
    private readonly statusService: StatusService,
  ) {}

  async check(dbId: string, userId: string) {
    try {
      const db = await this.dbService.findOne(dbId);
      if (!db)
        throw new BadRequestException({
          message: `База данных с id ${dbId} не найдена`,
          status: "ERROR",
        });

      const connectionString = db.connection;

      let result;
      await this.httpService.axiosRef
        .post("http://195.54.32.97:3000", {
          connection: `${connectionString}`,
        })
        .then((r) => (result = r))
        .catch(() => console.log("Error"));
      const metrics = { ...result.data };

      if (metrics["status"].toString().toUpperCase() == "ERROR") {
        this.httpService.axiosRef
          .post("http://195.54.32.97:4000/sendMessage", {
            chatId: userId,
            message: `ОШИБКА!!!!!!!! ${db.name}`,
          })
          .catch(() => console.log("e"));
      }

      delete metrics["status"];
      const keys = Object.keys(metrics);
      const metricsValues = keys.map((k) => {
        return { key: k, value: metrics[k] };
      });
      const res = await this.statusService.create({
        state: result.data["status"],
        dbId: dbId,
        metrics: metricsValues,
      });
      return res;
    } catch (e) {
      console.log(e);
    }
  }
}
