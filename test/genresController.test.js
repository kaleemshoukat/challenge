const { mockRequest, mockResponse } = require('../app/helpers/interceptor');
const genresController = require('../app/controllers/genresController');

describe("Genres Tests", () => {
    test("Create", async () => {
        let req = mockRequest();
        let res = mockResponse();

        req = {
            name: "Funny12",
            description: "Funny12 movies test description."
        };

        await genresController.create(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    })

    test("Create Fail", async () => {
        let req = mockRequest();
        let res = mockResponse();

        req = {
            name: "",
            description: "Funny movies test description."
        };

        await genresController.create(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
    })

})