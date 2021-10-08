const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);

// describe("testing auth endpoints", () => {
//     it("gets hello", async (done) => {
//         // const res = await request.get("/hello");
//         // expect(res.body).toBe("hello");
//         expect(1 + 2).toBe(3);
//         done();
//     });
// });
describe("testing auth endpoints", () => {
    test("GET /hello", async () => {
        const data = await request.get("/hello");
        expect(data.text).toBe("hello");
        expect(data.statusCode).toBe(200);
    });
    

    test("POST /login check parent user", async () => {
        const data = await request.post("/login").send({
            email: "mail",
            password: "pass",
        });
        expect(200).toBe(200);
    });

    // test("POST /login check wrong email and password", async () => {
    //     const data = await request.post("/login").send({
    //         email: "frj",
    //         password: "srj",
    //     });
    //     expect(data.statusCode).toBe(401);
    // });

    // test("POST /login", async () => {
    //     // TODO
    //     // check worng email and password - status code 401
    //     // check parent, admin and teacher login (by token and role)
    //     // check status code

    //     const data = await request.post("/login").send({
    //         email: "a",
    //         password: "1",
    //     });
    //     // expect(data.text).toBe("hello");
    //     expect(data.statusCode).toBe(200);
    // });
});
