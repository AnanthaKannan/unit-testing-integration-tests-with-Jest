const request = require("supertest");
const app = require("../../app");
const endPointUrl = "/to-dos/";
const newTodo = require("../mock-data/new-todo.json");

let firstTodo, newTodoId;

const testData = { title: 'make integration test done', done: true};
const nonExistingTodoId = '60b9dc6946741643d9351a90';

describe(endPointUrl, () => {
  test(`POST ${endPointUrl}`, async () => {
    const response = await request(app).post(endPointUrl).send(newTodo);
    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe(newTodo.title);
    expect(response.body.done).toBe(newTodo.done);
    newTodoId = response.body._id;
  });

    test(`should return error 500 on malformed data with POST ${endPointUrl}`, async () => {
    const response = await request(app)
      .post(endPointUrl)
      .send({ title: "Missing done property" });
    expect(response.statusCode).toBe(500);
    expect(response.body).toStrictEqual({
      message: "Todo validation failed: done: Path `done` is required.",
    });
  });

  test(`GET ${endPointUrl}`, async () => {
    const response = await request(app).get(endPointUrl);
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0].title).toBeDefined();
    expect(response.body[0].done).toBeDefined();
    firstTodo = response.body[0];
  });

  test(`Get by Id ${endPointUrl} :todoId`, async() => {
      const response = await request(app).get(`${endPointUrl}${firstTodo._id}`);
      expect(response.statusCode).toBe(200);
      expect(response.body.title).toBe(firstTodo.title);
      expect(response.body.done).toBe(firstTodo.done);    
  });

  test(`GET todo doesn't exist ${endPointUrl}`, async() => {
    const response = await request(app).get(`${endPointUrl}${nonExistingTodoId}`);
    expect(response.statusCode).toBe(404);
  });

  it(`PUT ${endPointUrl}`, async() => {
    const res = await request(app)
    .put(`${endPointUrl}${newTodoId}`)
    .send(testData);
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe(testData.title);
    expect(res.body.done).toBe(testData.done);
  });

  it(`DELETE ${endPointUrl}`, async() => {
    const res = await request(app)
    .delete(`${endPointUrl}${newTodoId}`)
    .send();
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe(testData.title);
    expect(res.body.done).toBe(testData.done);
  });

  test(`Delete todo doesn't exist ${endPointUrl}`, async() => {
    const response = await request(app)
    .delete(`${endPointUrl}${nonExistingTodoId}`)
    .send();
    expect(response.statusCode).toBe(404);
  });

});
