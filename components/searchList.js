import { StyleSheet, View, Text, FlatList } from "react-native";
import { FlashList } from "@shopify/flash-list";
import themes from "../config/theme";
import { useSelector } from "react-redux";
import SearchResult from "./searchResult";
import EmbedFile from "./embedFile";
import NotFoundView from "./notFound";

function SearchList(props) {
  const { value } = useSelector((state) => state.theme);
  const theme = value == true ? themes.dark : themes.light;

  const { searchDisplay } = useSelector((state) => state.search);

  return (
    <View style={[styles.container, { display: searchDisplay }]}>
      <FlashList
        data={props.data}
        renderItem={(item) => <SearchResult info={item} />}
        keyExtractor={(item, index) => `${index}-${item.id}`}
        estimatedItemSize={200}
        ListEmptyComponent={() => <NotFoundView />}
      />
      <EmbedFile />
    </View>
  );
}

export default SearchList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
});
