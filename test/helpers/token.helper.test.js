import { generateToken, verifyToken } from "../../src/helpers/token.helper";
import { expect, jest, test, describe } from "@jest/globals";

describe("generate accesss token func", () => {
  test("should throw error when payload is null", async () => {
    expect(() => {
      generateToken().accessToken();
    }).toThrowError();
  });
  test("should throw error when payload  is number", () => {
    expect(() => {
      generateToken(123).accessToken();
    }).toThrowError();
  });
  test("should throw error when payload  is string", () => {
    expect(() => {
      generateToken("123").accessToken();
    }).toThrowError();
  });
  test("should throw error when payload is invalid obj", () => {
    expect(() => {
      generateToken({
        email,
      }).accessToken();
    }).toThrowError();
  });
  test("should generate string token when payload  is emtpy object  {}", () => {
    const token = generateToken({}).accessToken();
    expect(typeof token).toBe("string");
    expect(token.length).toBeGreaterThan(0);
  });
  test("should generate string token when payload  is object  {}", () => {
    const token = generateToken({
      email: "email",
    }).accessToken();
    expect(typeof token).toBe("string");
    expect(token.length).toBeGreaterThan(0);
  });
})

describe("generate refresh token func", () => {
    test("should throw err when payload is null", async () => {
      expect(() => {
        generateToken().accessToken();
      }).toThrowError();
    });
    test("should throw err when payload  is number", () => {
      expect(() => {
        generateToken(123).accessToken();
      }).toThrowError();
    });
    test("should throw err when payload  is string", () => {
      expect(() => {
        generateToken("123").accessToken();
      }).toThrowError();
    });
    test("should throw err when payload is invalid obj", () => {
      expect(() => {
        generateToken({
          email,
        }).accessToken();
      }).toThrowError();
    });
    test("should generate string token when payload  is emtpy object  {}", () => {
      const token = generateToken({}).accessToken();
      expect(typeof token).toBe("string");
      expect(token.length).toBeGreaterThan(0);
    });
    test("should generate string token when payload  is object  {}", () => {
      const token = generateToken({
        email: "email",
      }).accessToken();
      expect(typeof token).toBe("string");
      expect(token.length).toBeGreaterThan(0);
    });
  });

  describe("verify access token func", () => {
    test('should throw err when token is null' , () => {
        expect( () => {
            verifyToken().accessToken();
          }).toThrowError();
    })
    test('should throw err when token is number' , () => {
        expect( () => {
            verifyToken(1123).accessToken();
          }).toThrowError();
    })
    test('should throw err when token is obj {}' , () => {
        expect( () => {
            verifyToken({}).accessToken();
          }).toThrowError();
    })
    test('should throw err when token is string and is invalid token ' , () => {
        expect( () => {
            verifyToken('1213123213ssssss').accessToken();
          }).toThrowError();
    })
    test('should throw err when token is string and is valid token but expired ' , () => {
        const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsIiwiaWF0IjoxNjYyOTU5MjA1LCJleHAiOjE2NjI5NTkyNjV9.RIYTNM3j_Kw29T9SIEbeFIEbZAM684v2-iRtYEiI6a' ;
        expect( () => {
            verifyToken(mockToken).accessToken();
          }).toThrowError();
    })
    test('should throw err when token is string and is valid token but unexpired ' , () => {
        const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsIiwiaWF0IjoxNjYyOTU5NjUxLCJleHAiOjE2OTQ1MTcyNTF9.XKX_x4Mds-gn2ErlQhcjqL7v1UXtGPSSsdQCkyBA_-0' ;
        const {email} = verifyToken(mockToken).accessToken();
        expect(email).toBeTruthy()
    })
  })
  