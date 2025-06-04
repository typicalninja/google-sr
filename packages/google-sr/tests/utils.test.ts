import { describe, expect, test } from "vitest";
import { GOOGLE_SEARCH_URL } from "../src/constants";
import {
	decodeResponse,
	extractUrlFromGoogleLink,
	isEmpty,
	prepareRequestConfig,
	safeGetFetch,
} from "../src/utils";

describe("extractUrlFromGoogleLink", () => {
	test("should extract URL from q parameter", () => {
		const googleLink =
			"https://google.com/url?q=https%3A%2F%2Fexample.com&sa=U";
		expect(extractUrlFromGoogleLink(googleLink)).toBe("https://example.com");
	});

	test("should extract URL from imgurl parameter", () => {
		const googleLink =
			"https://google.com/url?imgurl=https%3A%2F%2Fexample.com%2Fimage.jpg";
		expect(extractUrlFromGoogleLink(googleLink)).toBe(
			"https://example.com/image.jpg",
		);
	});

	test("should return null for invalid URLs", () => {
		expect(extractUrlFromGoogleLink(null)).toBeNull();
		expect(extractUrlFromGoogleLink("invalid-url")).toBeNull();
		expect(
			extractUrlFromGoogleLink("https://google.com/url?invalid=param"),
		).toBeNull();
	});
});

describe("isEmpty", () => {
	test("strict mode should return true if any value is empty", () => {
		expect(isEmpty(true, "value", "", "another")).toBe(true);
		expect(isEmpty(true, "value", null, "another")).toBe(true);
		expect(isEmpty(true, "value", undefined, "another")).toBe(true);
	});

	test("non-strict mode should return true only if all values are empty", () => {
		expect(isEmpty(false, "", null, undefined)).toBe(true);
		expect(isEmpty(false, "value", "", null)).toBe(false);
	});
});

describe("prepareRequestConfig", () => {
	test("should prepare request config with default headers", () => {
		const config = prepareRequestConfig({ query: "test query" });
		expect(config.url).toBe(GOOGLE_SEARCH_URL);
		expect(config.headers).toBeDefined();
		expect(config.queryParams).toBeInstanceOf(URLSearchParams);
		// @ts-expect-error above expects queryParams to be URLSearchParams
		const query = config.queryParams?.get("q");
		expect(query).toBe("test query");
	});

	test("should throw error for invalid query type", () => {
		// @ts-expect-error Testing invalid type
		expect(() => prepareRequestConfig({ query: 123 })).toThrow(TypeError);
	});

	test("should merge custom headers with default headers", () => {
		const config = prepareRequestConfig({
			query: "test",
			requestConfig: {
				headers: {
					"Custom-Header": "value",
				},
			},
		});

		const headers = config.headers as Record<string, string>;
		expect(headers["Custom-Header"]).toBe("value");
		expect(headers["User-Agent"]).toBeDefined();
	});
});

describe("safeGetFetch", () => {
	test("should throw error for missing URL", async () => {
		await expect(safeGetFetch({})).rejects.toThrow(TypeError);
	});
});
