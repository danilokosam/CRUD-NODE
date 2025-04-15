import { createProductSchema } from "../schema/productSchema.js";

describe("createProductSchema", () => {
  const validData = {
    body: {
      name: "Test Product",
      description: "A test product description",
      price: 99.99,
      productCode: "PROD-123",
    },
  };

  const invalidData = {
    body: {
      name: "",
      description: "A",
      price: -10,
      productCode: "INVALID",
    },
  };

  test("should pass with valid data", async () => {
    const result = await createProductSchema.safeParseAsync(validData);
    expect(result.success).toBe(true);
    expect(result.data).toEqual(validData);
  });

  test("should fail with invalid data", async () => {
    const result = await createProductSchema.safeParseAsync(invalidData);
    expect(result.success).toBe(false);
    expect(result.error.errors).toContainEqual(
      expect.objectContaining({
        path: ["body", "name"],
        message: "Name must be at least 1 character long",
      })
    );
    expect(result.error.errors).toContainEqual(
      expect.objectContaining({
        path: ["body", "price"],
        message: "Price cannot be negative",
      })
    );
    expect(result.error.errors).toContainEqual(
      expect.objectContaining({
        path: ["body", "productCode"],
        message:
          "Product code must start with 'PROD-' followed by alphanumeric characters",
      })
    );
  });

  test("should handle optional availability", async () => {
    const data = {
      body: {
        name: "Test Product",
        description: "Description",
        price: 50,
        productCode: "PROD-456",
        availability: 10,
      },
    };
    const result = await createProductSchema.safeParseAsync(data);
    expect(result.success).toBe(true);
    expect(result.data.body.availability).toBe(10);

    // With undefined availability
    const dataWithoutAvailability = { ...data, body: { ...data.body, availability: undefined } };
    const result2 = await createProductSchema.safeParseAsync(dataWithoutAvailability);
    expect(result2.success).toBe(true);
    expect(result2.data.body.availability).toBeUndefined();
  });
});