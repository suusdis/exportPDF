const request = require("supertest");
const { response } = require("../app.js");
const app = require("../app.js");
const getExtension = require('../controllers/pdfServices');

const createFromTemplate = require('../controllers/pdfServices');
const correctData  = {
  "environment": "localhost",
  "inputFile": "template_docx.docx",
  "outputFile": "nieuwbouw_5.docx"
}
const incorrectData  = {
  "environment": "localhost",
  "inputFile": "InDesignTest1.docx",
  "outputFile": "nieuwbouw_5.zip"
}

// // Test should pass telling its a valid action putting a zip file in and recieving a zip file back --
test('insert .zip file should say its a .zip file', () => {
  expect(getExtension("bla.zip")).toBe(".zip");
});

//test should pass with a code 200 meaning it was a valid action
describe('POST /pdf/createpdf', function() {
  it('responds with json', function() {
    const response = request(app)
      .post('/pdf/createpdf')
      .set('authorization', 'Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDkyNTQ4MjMsImlhdCI6MTY0OTI1NDIyMywiaXNzIjoiQ2xhcHBmb3JtIEIuVi4iLCJzdWIiOjEsInR5cGUiOiJhY2Nlc3MifQ.Hj1_LaI5w_d1JoKLCmszxY7Hfa05gIudXjQlW04GVGOzEItBLqPLyPdqP0XNeinQ9tS3ucYEbCNxYpK-IfH1uLCtm1HtJfgx8wEfQ57qo3xIZCAZ2PSx6ju_4BfABS3c_JRELjOU9DMDB2aOHFb-hrgG0SV7hdXJ0gEYYUE9C1G5p4pVBPpUimvrCgXw13eUK2cgtSLw1pIWmSf98CK3QgkZ1cXKBnoC0DyxXe1NBqvNhXFlJBfxiccXys9sL1Hqf1TzEV-j4qfGWef3VgclMCIxGJf9_XTukttoPXv1pbQTiLgj80h0VmeE1TdrnFV6LOeSaVrBKwT-2NnfFe_Q5RSuWR_c655X_GdjLhYHccRHeve9ZOFIMU3UoODsr2Lgcw9TkYhlbQEd54mFu26fzy2-PmdwpUsT-H_0vuZgtS0UsqTVe5_zW0zvedxkc_1pind8QRFrcEkyMnhbX6n-JVKjYvJzkSZkxn1WQY3ORgwnRPWgxsdieaCUr-RmkjF0ya_hwLwcrgC2_Y3UctUU1a6_1WQc-0NDDneZmj8B1Ai1RBlt8iGURZVlRd8t95OfGqLWMf_e7cXdPGqPWNiT9RWfpywKY5f_BSZPj5LdsLH8adxP-lmTASaZ9cpCMgFZNu8OFooju8vWzxwSWGW9Wvqjkne6f06N9_NmnD9aczY')
      .send(correctData)
    //  .expect(response.headers["authorization"]).toMatch(/json/)
    .expect(response => {console.log(response)})
    .expect(200);
  });
});

//test should pass with a code 200 meaning it was a invalid action
describe('POST /pdf/createpdf', function() {
  it('responds with json', function() {
    const response = request(app)
      .post('/pdf/createpdf')
      .set('authorization', 'Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDkyNTQ4MjMsImlhdCI6MTY0OTI1NDIyMywiaXNzIjoiQ2xhcHBmb3JtIEIuVi4iLCJzdWIiOjEsInR5cGUiOiJhY2Nlc3MifQ.Hj1_LaI5w_d1JoKLCmszxY7Hfa05gIudXjQlW04GVGOzEItBLqPLyPdqP0XNeinQ9tS3ucYEbCNxYpK-IfH1uLCtm1HtJfgx8wEfQ57qo3xIZCAZ2PSx6ju_4BfABS3c_JRELjOU9DMDB2aOHFb-hrgG0SV7hdXJ0gEYYUE9C1G5p4pVBPpUimvrCgXw13eUK2cgtSLw1pIWmSf98CK3QgkZ1cXKBnoC0DyxXe1NBqvNhXFlJBfxiccXys9sL1Hqf1TzEV-j4qfGWef3VgclMCIxGJf9_XTukttoPXv1pbQTiLgj80h0VmeE1TdrnFV6LOeSaVrBKwT-2NnfFe_Q5RSuWR_c655X_GdjLhYHccRHeve9ZOFIMU3UoODsr2Lgcw9TkYhlbQEd54mFu26fzy2-PmdwpUsT-H_0vuZgtS0UsqTVe5_zW0zvedxkc_1pind8QRFrcEkyMnhbX6n-JVKjYvJzkSZkxn1WQY3ORgwnRPWgxsdieaCUr-RmkjF0ya_hwLwcrgC2_Y3UctUU1a6_1WQc-0NDDneZmj8B1Ai1RBlt8iGURZVlRd8t95OfGqLWMf_e7cXdPGqPWNiT9RWfpywKY5f_BSZPj5LdsLH8adxP-lmTASaZ9cpCMgFZNu8OFooju8vWzxwSWGW9Wvqjkne6f06N9_NmnD9aczY')
      .send(incorrectData)
    //  .expect(response.headers["authorization"]).toMatch(/json/)
    .expect(response => {console.log(response)})
    .expect(400);
  });
});

//Tests convertDocxToPdf for error message when wrong data is inserted
describe('Tests convertDocxToPdf for error message when wrong data is inserted', function() {
  it('responds with error 400', function() {
    const response = request(app)
      .post('/pdf/createpdf')
      .set('authorization', 'Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDkyNTQ4MjMsImlhdCI6MTY0OTI1NDIyMywiaXNzIjoiQ2xhcHBmb3JtIEIuVi4iLCJzdWIiOjEsInR5cGUiOiJhY2Nlc3MifQ.Hj1_LaI5w_d1JoKLCmszxY7Hfa05gIudXjQlW04GVGOzEItBLqPLyPdqP0XNeinQ9tS3ucYEbCNxYpK-IfH1uLCtm1HtJfgx8wEfQ57qo3xIZCAZ2PSx6ju_4BfABS3c_JRELjOU9DMDB2aOHFb-hrgG0SV7hdXJ0gEYYUE9C1G5p4pVBPpUimvrCgXw13eUK2cgtSLw1pIWmSf98CK3QgkZ1cXKBnoC0DyxXe1NBqvNhXFlJBfxiccXys9sL1Hqf1TzEV-j4qfGWef3VgclMCIxGJf9_XTukttoPXv1pbQTiLgj80h0VmeE1TdrnFV6LOeSaVrBKwT-2NnfFe_Q5RSuWR_c655X_GdjLhYHccRHeve9ZOFIMU3UoODsr2Lgcw9TkYhlbQEd54mFu26fzy2-PmdwpUsT-H_0vuZgtS0UsqTVe5_zW0zvedxkc_1pind8QRFrcEkyMnhbX6n-JVKjYvJzkSZkxn1WQY3ORgwnRPWgxsdieaCUr-RmkjF0ya_hwLwcrgC2_Y3UctUU1a6_1WQc-0NDDneZmj8B1Ai1RBlt8iGURZVlRd8t95OfGqLWMf_e7cXdPGqPWNiT9RWfpywKY5f_BSZPj5LdsLH8adxP-lmTASaZ9cpCMgFZNu8OFooju8vWzxwSWGW9Wvqjkne6f06N9_NmnD9aczY')
      .send(incorrectData)
    //  .expect(response.headers["authorization"]).toMatch(/json/)
    .expect(response => {console.log(response)})
    .expect(400);
  });
});

//Tests convertDocxToPdf for error message when wrong data is inserted
describe('Tests convertDocxToPdf if the right data is inserted', function() {
  it('responds with status 200', function() {
    const response = request(app)
      .post('/pdf/createpdf')
      .set('authorization', 'Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDkyNTQ4MjMsImlhdCI6MTY0OTI1NDIyMywiaXNzIjoiQ2xhcHBmb3JtIEIuVi4iLCJzdWIiOjEsInR5cGUiOiJhY2Nlc3MifQ.Hj1_LaI5w_d1JoKLCmszxY7Hfa05gIudXjQlW04GVGOzEItBLqPLyPdqP0XNeinQ9tS3ucYEbCNxYpK-IfH1uLCtm1HtJfgx8wEfQ57qo3xIZCAZ2PSx6ju_4BfABS3c_JRELjOU9DMDB2aOHFb-hrgG0SV7hdXJ0gEYYUE9C1G5p4pVBPpUimvrCgXw13eUK2cgtSLw1pIWmSf98CK3QgkZ1cXKBnoC0DyxXe1NBqvNhXFlJBfxiccXys9sL1Hqf1TzEV-j4qfGWef3VgclMCIxGJf9_XTukttoPXv1pbQTiLgj80h0VmeE1TdrnFV6LOeSaVrBKwT-2NnfFe_Q5RSuWR_c655X_GdjLhYHccRHeve9ZOFIMU3UoODsr2Lgcw9TkYhlbQEd54mFu26fzy2-PmdwpUsT-H_0vuZgtS0UsqTVe5_zW0zvedxkc_1pind8QRFrcEkyMnhbX6n-JVKjYvJzkSZkxn1WQY3ORgwnRPWgxsdieaCUr-RmkjF0ya_hwLwcrgC2_Y3UctUU1a6_1WQc-0NDDneZmj8B1Ai1RBlt8iGURZVlRd8t95OfGqLWMf_e7cXdPGqPWNiT9RWfpywKY5f_BSZPj5LdsLH8adxP-lmTASaZ9cpCMgFZNu8OFooju8vWzxwSWGW9Wvqjkne6f06N9_NmnD9aczY')
      .send(correctData)
    //  .expect(response.headers["authorization"]).toMatch(/json/)
    .expect(response => {console.log(response)})
    .expect(200);
  });
});