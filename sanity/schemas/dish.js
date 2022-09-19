export default {
	name: "dish",
	title: "Dish",
	type: "document",
	fields: [
		{
			name: "name",
			title: "Name of dish",
			type: "string",
			validation: (Rule) => Rule.required(),
		},
		{
			name: "short_desc",
			title: "Short description",
			type: "string",
			validation: (Rule) => Rule.required().max(50),
		},
		{
			name: "price",
			title: "Price of the dish in USD",
			type: "number",
		},
		{
			name: "image",
			title: "Image of the dish",
			type: "image",
		},
	],
};
