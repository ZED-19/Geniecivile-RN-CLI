import { View } from "react-native";
import MAinContainer from "./navigation/mainContainer";
import themes from "./config/theme";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  const mode = store.getState().theme.value;
  const theme = mode ? themes.dark : themes.light;

  return (
    <View style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <MAinContainer />
        </PersistGate>
      </Provider>
    </View>
  );
}

export default App;
