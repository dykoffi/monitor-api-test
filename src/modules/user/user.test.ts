import app from "../../server/_globalRoutes";
import { User, Prisma as PTypes } from "@prisma/client"


describe("User routes tester", () => {

    let user: User
    let data: PTypes.UserCreateInput = {
        first_name : "",
        last_name : "",
        year_name : 52,
    }
    const request = require("supertest")(app);

    // Post operation

    it("/POST Create new User", async() => {

        user = (await request
            .post(`/User`)
            .send(data)
            .expect("Content-Type", /json/)
            .expect(201)
        )._body.data

    });

    it("/POST Create new User with unexpected data", async() => {
        await request
            .post(`/User`)
            .send({})
            .expect("Content-Type", /json/)
            .expect(400)
    });

    // Get operations

    it("/GET get all User", async() => {
        await request
            .get(`/User`)
            .expect("Content-Type", /json/)
            .expect(200)

    });

    describe("GET /user/id", () => {

        it("Show specify User", async() => {
            await request
                .get(`/User/${user.id_}`)
                .expect("Content-Type", /json/)
                .expect(200)
        });

        it("Try with not exist id_", async() => {
            await request
                .get(`/User/0`)
                .expect("Content-Type", /json/)
                .expect(404)
        });

        it("Try with unexpected id_", async() => {
            await request
                .get(`/User/zero`)
                .expect("Content-Type", /json/)
                .expect(500)
        });
    });


    // Put operations

    describe("PUT /user/id", () => {

        it("Modify specify User", async() => {
            await request
                .put(`/User/${user.id_}`)
                .send({})
                .expect("Content-Type", /json/)
                .expect(201)
        });

        it("Try with not exist id_", async() => {
            await request
                .put(`/User/0`)
                .send({})
                .expect("Content-Type", /json/)
                .expect(404)
        });

        it("Try with unexpected id_", async() => {
            await request
                .put(`/User/zero`)
                .send({})
                .expect("Content-Type", /json/)
                .expect(500)
        });
    });


    // Delete operation

    describe("DELETE /user/id", () => {

        it("Delete specify User", async() => {
            await request
                .del(`/User/${user.id_}`)
                .expect("Content-Type", /json/)
                .expect(201)
        });

        it("Try with not exist id_", async() => {
            await request
                .del(`/User/0`)
                .expect("Content-Type", /json/)
                .expect(404)
        });

        it("Try with unexpected id_", async() => {
            await request
                .del(`/User/zero`)
                .expect("Content-Type", /json/)
                .expect(500)
        });
    });

});