process.env.NODE_ENV = "test";

const app = require("../../app");
const request = require("supertest");
const URLmap = require("../../models/urlmap");
const Counter = require("../../models/counter");
const mongoose = require("mongoose");

describe("routes/books", () => {
    let mongodb;
  
    beforeAll(async () => {
      const dbUri = "mongodb://localhost/url_test_db";
      mongodb = await mongoose.connect(dbUri, () => {
        console.log("Database connected successfully");
      });
  
      await URLmap.deleteMany().exec();
      await Counter.deleteMany().exec();
      let counter = new Counter({_id: 'url_count', count: 10000});
        counter.save(function(err) {
            if(err) return console.error(err);
            console.log('counter inserted');
        });
    });

    it("POST /shorten-url should create new url shortcode and save in database", async () => {
        const URL = "www.yahoo.com.sg";
        
        const response = await request(app).post("/shorten-url").send({ url: URL });
        expect(response.status).toEqual(200);
        expect(response.header["content-type"]).toContain("application/json");
        expect(response.body.message).toEqual("URL Shortened and saved to database.");
        expect(response.body.urlshorten).toBeDefined;
    });

    it("GET /shorten-url should return all urls that are stored in database", async () => {
        const response = await request(app).get("/shorten-url");
    
        expect(response.status).toEqual(200);
        expect(response.header["content-type"]).toContain("application/json");
        expect(response.body).toBeDefined;
    });
    
    afterAll(async () => {
        URLmap.deleteMany().exec();
        Counter.deleteMany().exec();
        mongodb.close();
    });
});