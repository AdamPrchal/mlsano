import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";

const getRecipes = async () => {
	const response = await fetch("http://localhost:3000/recipes");
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	return response.json();
};

export const useRecipes = () => {
	const queryClient = useQueryClient();

	return useQuery({ queryKey: ["recipes"], queryFn: getRecipes });
};
