import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { openFile } from "../redux/reducers/fileSlice";
import { bookmarksOperation } from "../redux/reducers/bookmarkSlice";
import themes from "../config/theme";
import Icon, { icons } from "../assets/icons";

function ModuleFile(props) {
  const fileName = props.info.name;
  const fileId = props.info.id;
  const dispatch = useDispatch();

  //   Theme Operation

  const { value } = useSelector((state) => state.theme);
  const theme = value ? themes.dark : themes.light;

  //   Get the ids list and  the icons

  const { idsList } = useSelector((state) => state.bookmarks);
  const iconName = (id) =>
    idsList.includes(id) ? icons.bookmark : icons.bookmarkOutline;
  const iconColor = (id) =>
    idsList.includes(id) ? theme.primaryColor : theme.textColor;

  return (
    <View>
      <TouchableOpacity
        style={[styles.fileContainer, { borderColor: theme.primaryColor }]}
        onPress={() =>
          dispatch(openFile({ fileName: fileName, fileId: fileId }))
        }
      >
        <Text style={[styles.fileTitle, { color: theme.textColor }]}>
          {fileName}
        </Text>
        <TouchableOpacity
          style={styles.pb}
          onPress={() =>
            dispatch(
              bookmarksOperation({
                fileName: fileName,
                fileId: fileId,
              })
            )
          }
        >
          <Icon
            src={iconName(fileId)}
            color={iconColor(fileId)}
            size={22.5}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  fileContainer: {
    borderWidth: 1.5,
    borderRadius: 5,
    marginVertical: 7.5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 25,
  },
  fileTitle: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    fontSize: 12.5,
    width: "85%",
  },
  pb: {
    paddingRight: 10,
    paddingLeft: 20,
    position: "absolute",
    justifyContent: "center",
    height: "100%",
    right: 0,
  },
});

export default ModuleFile;
