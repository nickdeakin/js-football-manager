import supertest from "supertest";
import {app} from "./app";
import {Server} from "http";

describe("app", function () {
    let listener: Server;

    beforeEach(() => {
        listener = app().listen(5000, () => {});
    })

    afterEach((done) => {
        listener.close(done);
    });

    it("should get /", async () => {
        const res = await supertest(listener).get("/");
        expect(res.status).toBe(200);
        expect(res.body.status).toBe('UP');
    });
});