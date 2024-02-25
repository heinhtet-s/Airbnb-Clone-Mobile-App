import { View } from "react-native";
import React, { useMemo, useState } from "react";
import listingsData from "@/assets/data/airbnb-listings.json";
import listingsDataGeo from "@/assets/data/airbnb-listings.geo.json";
import { Stack } from "expo-router";
import ExploreHeader from "@/components/ExploreHeader";
import { StatusBar } from "expo-status-bar";
import Listings from "@/components/Listing";
import ListingsBottomSheet from "@/components/ListingsBottomSheet";

const Page = () => {
  const items = useMemo(() => listingsData as any, []);
  const getoItems = useMemo(() => listingsDataGeo, []);
  const [category, setCategory] = useState<string>("Tiny homes");

  const onDataChanged = (category: string) => {
    setCategory(category);
  };

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
        }}
      />
      <ListingsBottomSheet listings={items} category={category} />
    </View>
  );
};

export default Page;
