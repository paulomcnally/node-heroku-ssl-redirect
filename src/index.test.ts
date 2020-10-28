import sslRedirect from "./index";

describe("is actually a middleware", () => {
  process.env.NODE_ENV = "development";
  const middleware = sslRedirect();

  it("return a function", () => {
    expect(middleware).toBeInstanceOf(Function);
  });

  it("accepts three arguments", () => {
    expect(middleware.length).toBe(3);
  });

  it("calls next once", () => {
    const fakeNext = jest.fn();
    // @ts-ignore
    middleware({}, {}, fakeNext);
    expect(fakeNext).toBeCalled();
  });
});

describe("responds accordingly", () => {
  process.env.NODE_ENV = "production";
  let middleware = sslRedirect(["production"]);
  let fakeRedirect = jest.fn();
  let dummyReq = {
    headers: { "x-forwarded-proto": "http" },
    hostname: "hostname",
    originalUrl: "/originalUrl"
  };

  let dummyRes = {
    redirect: fakeRedirect
  };

  beforeEach(() => {
    middleware = sslRedirect(["production"]);

    fakeRedirect = jest.fn();
    dummyReq = {
      headers: { "x-forwarded-proto": "http" },
      hostname: "hostname",
      originalUrl: "/originalUrl"
    };
    dummyRes = {
      redirect: fakeRedirect
    };
  });

  it("only redirects if it has header x-forwarded-proto", () => {
    // @ts-ignore
    middleware(dummyReq, dummyRes, {});

    expect(fakeRedirect).not.toBeCalled();
    expect(fakeNext).toBeCalled();
 });

  it("runs on insecure urls", () => {
    // @ts-ignore
    middleware(dummyReq, dummyRes, {});

    expect(dummyReq.headers["x-forwarded-proto"]).not.toMatch(/^https:\/\//);
  });

  it("doesn't run on secure urls", () => {
    dummyReq.headers["x-forwarded-proto"] = "https";
    const fakeNext = jest.fn();
    // @ts-ignore
    middleware(dummyReq, dummyRes, fakeNext);

    expect(dummyRes.redirect).not.toBeCalled();
    expect(fakeNext).toBeCalled();
  });

  it("passess right redirect arguments", () => {
    // @ts-ignore
    middleware(dummyReq, dummyRes, {});

    const redirectCall = dummyRes.redirect.mock.calls[0];

    expect(redirectCall.length).toBe(2);
    expect([301, 302]).toContain(redirectCall[0]);
    expect(redirectCall[1]).toMatch(/^https:\/\//);
  });

  it("redirect status 301", () => {
    middleware = sslRedirect(["production"], 301);
    // @ts-ignore
    middleware(dummyReq, dummyRes, {});

    const redirectCall = dummyRes.redirect.mock.calls[0];

    expect(redirectCall[0]).toBe(301);
  });

  it("redirect status 302", () => {
    middleware = sslRedirect(["production"], 302);
    // @ts-ignore
    middleware(dummyReq, dummyRes, {});

    const redirectCall = dummyRes.redirect.mock.calls[0];

    expect(redirectCall[0]).toBe(302);
  });
});

describe("different environment", () => {
  process.env.NODE_ENV = "production";

  const fakeRedirect = jest.fn();
  const dummyReq = {
    headers: { "x-forwarded-proto": "http" }
  };

  const dummyRes = {
    redirect: fakeRedirect
  };
  it("doesn't redirect if environment is different", () => {
    const middleware = sslRedirect(["development", "other"]);
    const fakeNext = jest.fn();
    // @ts-ignore
    middleware(dummyReq, dummyRes, fakeNext);

    expect(fakeRedirect).not.toBeCalled();
    expect(fakeNext).toBeCalled();
  });
});
