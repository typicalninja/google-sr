import { describe, expect, test, vi } from "vitest";
import {
	decodeResponse,
	extractUrlFromGoogleLink,
	prepareRequestConfig,
	safeGetFetch,
} from "../src/utils";

function createMockResponse(bytes: number[]): Response {
	const buffer = new Uint8Array(bytes);
	return new Response(buffer);
}

const nativeFetch = global.fetch;

test("decodeResponse should decode latin1 encoding", async () => {
	const mockedResponse = createMockResponse([0xa1, 0xa2]); // ¡, ¢
	const decodedString = await decodeResponse(mockedResponse);
	expect(decodedString).toBe("¡¢");
});

// Tests for extractUrlFromGoogleLink\
describe("extractUrlFromGoogleLink", () => {
	test("should extract the correct URL from a valid Google redirect link", ({
		expect,
	}) => {
		const googleLink = "/url?q=https://example.com&sa=somethingunrelated&ved=0";
		const extractedUrl = extractUrlFromGoogleLink(googleLink);
		expect(extractedUrl).toBe("https://example.com");
	});

	test("should return null when the Google redirect link does not contain a valid URL", ({
		expect,
	}) => {
		const googleLink = "/url?sa=U&sa=somethingunrelated&ved=0";
		const extractedUrl = extractUrlFromGoogleLink(googleLink);
		expect(extractedUrl).toBeNull();
	});
});

describe("safeGetFetch", () => {
	test("should throw TypeError if options are missing", async () => {
		// @ts-expect-error Testing missing options
		await expect(safeGetFetch()).rejects.toThrow(TypeError);
	});

	test("should throw TypeError if URL is not provided", async () => {
		await expect(safeGetFetch({})).rejects.toThrow(TypeError);
	});

	test("should fetch a valid URL", async () => {
		// mocking fetch
		global.fetch = vi.fn().mockImplementationOnce(() =>
			Promise.resolve({
				ok: true,
				status: 200,
			}),
		);

		const url = "https://example.com";
		const response = await safeGetFetch({
			url,
			queryParams: new URLSearchParams({ q: "test" }),
		});
		expect(global.fetch).toHaveBeenCalledWith("https://example.com?q=test", {
			method: "GET",
			url: "https://example.com",
			queryParams: expect.any(URLSearchParams),
		});
		expect(response.ok).toBe(true);
		expect(response.status).toBe(200);
		vi.clearAllMocks();
		// once done, restore the original fetch
		global.fetch = nativeFetch;
	});

	test("should throw an error for non-200 status codes", async () => {
		// mocking fetch to return a non-200 status code
		global.fetch = vi.fn().mockImplementationOnce(() =>
			Promise.resolve({
				ok: false,
				status: 404,
				statusText: "Not Found",
			}),
		);

		await expect(safeGetFetch({ url: "https://example.com" })).rejects.toThrow(
			"Failed to fetch https://example.com: 404 Not Found",
		);
		vi.clearAllMocks();
	});
});

describe("prepareRequestConfig", () => {
	test("should return a valid request config with default values", () => {
		const config = prepareRequestConfig({
			query: "test",
			requestConfig: {
				queryParams: new URLSearchParams({ q: "test" }),
			},
		});

		expect(config.url).toBe("https://www.google.com/search");
		expect(config.queryParams?.toString()).toBe("q=test");
		expect(config.headers).not.toBeUndefined();
	});

	test("should throw TypeError if options are not provided", () => {
		expect(() =>
			// @ts-expect-error Testing missing URL
			prepareRequestConfig(),
		).toThrow(TypeError);
	});

	test("should throw TypeError if query is not a string", () => {
		expect(() =>
			prepareRequestConfig({
				// @ts-expect-error Testing invalid query type
				query: 123,
			}),
		).toThrow(TypeError);
	});
});
