export default {
	name: "restaurant",
	title: "Restaurant",
	type: "document",
	fields: [
		{
			name: "name",
			title: "Restaurant_name",
			type: "string",
			validation: (Rule) => Rule.required(),
		},
		{
			name: "short_desc",
			title: "Short_Description",
			type: "string",
			validation: (Rule) => Rule.max(200),
		},
		{
			name: "image",
			title: "Image of restaurant",
			type: "image",
		},
		{
			name: "lat",
			title: "Lat",
			type: "number",
		},
		{
			name: "long",
			title: "Long",
			type: "number",
		},
		{
			name: "address",
			title: "Restaurant address",
			type: "string",
			validation: (Rule) => Rule.required(),
		},
		{
			name: "rating",
			title: "Enter a Rating from (1-5 stars)",
			type: "number",
			validation: (Rule) =>
				Rule.required()
					.min(1)
					.max(5)
					.error("please enter a number between 1-5"),
		},
		{
			name: "type",
			title: "Category",
			type: "reference",
			validation: (Rule) => Rule.required(),
			to: [{ type: "category" }],
		},
		{
			name: "dishes",
			title: "Dishes",
			type: "array",
			of: [{ type: "reference", to: [{ type: "dish" }] }],
		},
	],
};
