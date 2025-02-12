import { Controller, Post, Req, Res } from "@nestjs/common";
import * as Busboy from "busboy";

@Controller()
export class UploadController {
    @Post("upload")
    async upload(@Req() req: any, @Res() res: any) {
        const bb = Busboy({ headers: req.headers });

        bb.on("file", (name, file, info) => {
            console.log(info);

            file.on("data", (data) => {
                console.log(data);
            })
        });

        bb.on("close", () => {
            console.log("close");
            res.end();
        });

        req.pipe(bb);
    }
}