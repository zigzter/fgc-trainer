import { describe, expect, it } from "vitest";
import { formatDate } from "./formatDate";

const railsDate = "2024-10-26T19:07:25.466Z";

describe("formatDate tests", () => {
    it("formats a Rails date", () => {
        const result = formatDate(railsDate);
        expect(result).toBe("10/26/2024, 12:07:25 PM");
    });

    it("handles invalid input", () => {
        const result = formatDate("asdf");
        expect(result).toBe("");
    });
});
