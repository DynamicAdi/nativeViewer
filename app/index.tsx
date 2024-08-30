import { Text, View } from "react-native";
import WebView from "react-native-webview";

export default function Index() {
  return (
    <View style={{flex: 2, paddingTop: '10%', backgroundColor: 'white'}}>
      <WebView source={{ uri: " https://rtpldigital.com" }}/>
  </View>
  );
}
