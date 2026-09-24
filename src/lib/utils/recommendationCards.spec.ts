import { describe, expect, it } from "vitest";
import { recommendationBlocks } from "./recommendationCards";

const recommendation = `![product](https://cdn.example.com/perfume.jpg)
### Soft Violet by Example House (unisex) - £75
A soft, powdery violet for everyday wear.

[Read the full scent profile in our Store >>](https://www.prettysmellslab.com/products/soft-violet)

---`;

describe("recommendationBlocks", () => {
	it("turns the documented recommendation block into a product card", () => {
		const blocks = recommendationBlocks(recommendation);
		expect(blocks).toHaveLength(1);
		expect(blocks[0]).toMatchObject({
			type: "recommendation",
			recommendation: {
				title: "Soft Violet by Example House (unisex) - £75",
				productHandle: "soft-violet",
			},
		});
	});

	it("leaves non-recommendation Markdown untouched", () => {
		expect(recommendationBlocks("Thanks — I hope that helps.")).toEqual([
			{ type: "markdown", content: "Thanks — I hope that helps." },
		]);
	});

	it("does not infer a best match from a card's position", () => {
		const block = recommendationBlocks(recommendation)[0];
		expect(block.type).toBe("recommendation");
		if (block.type === "recommendation") expect("bestMatch" in block.recommendation).toBe(false);
	});
});
