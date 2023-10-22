import { rest } from "msw";

const baseURL = "https://the-shop2-0-d8de1f67b769.herokuapp.com/";

export const handlers = [
  rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {

    return res(
      ctx.json({
        "id":3,
        "owner":"maria",
        "created_at":"16 Oct 2023",
        "updated_at":"22 Oct 2023",
        "name":"",
        "content":"I am from SouthTirol",
        "image":"https://res.cloudinary.com/ddigiimwd/image/upload/v1/media/images/no-results_a2yf4e",
        "is_owner":false,
        "properties_count":2,
        "prospective_buyer_count":1,
        "sold_count":2
    })
    );
  }),
  rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];