import React, { useState } from "react";
import { useEffect } from "react";
import { ScrollView } from "react-native";
import client, { urlFor } from "../sanityClient";
import CategoryCard from "./CategoryCard";

const Categories = () => {
	const [categories, setCategories] = useState([]);
	useEffect(() => {
		client.fetch(`*[_type == "category"]`).then((data) => setCategories(data));
	}, []);
	return (
		<ScrollView
			contentContainerStyle={{
				paddingHorizontal: 15,
				paddingTop: 10,
			}}
			horizontal
			showsHorizontalScrollIndicator={false}>
			{categories?.map((category) => (
				<CategoryCard
					key={category._id}
					imgUrl={urlFor(category.image).url()}
					title={category.name}
				/>
			))}
		</ScrollView>
	);
};

export default Categories;
