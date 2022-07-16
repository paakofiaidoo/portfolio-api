"use strict";

/**
 * visitor service.
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::visitor.visitor", ({ strapi }) => ({
  // Method 2: Wrapping a core action (leaves core logic in place)
  async find(ctx) {
    // some custom logic here
    ctx.query = { ...ctx.query, local: "en" };

    // Calling the default core action
    const { data, meta } = await super.find(ctx);

    const API_KEY = process.env.MAILGUN_API_KEY;
    const DOMAIN = process.env.MAILGUN_DOMAIN;

    const formData = require("form-data");
    const Mailgun = require("mailgun.js");

    const mailgun = new Mailgun(formData);
    const client = mailgun.client({ username: "api", key: API_KEY });

    const messageData = {
      from: "Excited User <me@samples.mailgun.org>",
      to: "paakofiaidoo17@gmail.com",
      subject: "Hello",
      text: "Testing some Mailgun awesomeness!",
    };

    client.messages
      .create(DOMAIN, messageData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });

    return { data, meta };
  },
}));
