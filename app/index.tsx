import { Text, View, BackHandler } from "react-native";
import WebView from "react-native-webview";
import * as Network from "expo-network";
import { useEffect, useRef, useState } from "react";
import Fontisto from "@expo/vector-icons/Fontisto";

export default function Index() {
  const [isConnected, setIsConnected]: any = useState(null);

  useEffect(() => {
    const checkNetwork = async function () {
      const networkstatus = await Network.getNetworkStateAsync();
      setIsConnected(networkstatus.isConnected);
      // console.log(networkstatus.isConnected);
    };

    checkNetwork();
  }, []);
  const webViewRef:any = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    // Handle Android back button press
    const backAction = () => {
      if (canGoBack && webViewRef.current) {
        // window.
        webViewRef.current.reload();
        webViewRef.current.goBack();
        return true; // Prevent default back button behavior
      }
      return false; // Allow the app to close if there's no web history to go back to
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove(); // Cleanup on component unmount
  }, [canGoBack]);

  return (
    <View style={{ flex: 2, paddingTop: "10%", backgroundColor: "white" }}>
      {isConnected ? (
        <WebView 
        ref={webViewRef}
        source={{ uri: "https://rtpldigital.com/products" }}
        onNavigationStateChange={(navState) => setCanGoBack(navState.canGoBack)}
        />
      ) : (
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            flexDirection: "column",
          }}
        >
          <Fontisto name="broken-link" size={45} color="black" />
          <Text style={{ marginTop: "5%", fontSize: 23 }}>
            You're <Text style={{ color: "red" }}>not</Text> connected to the
            internet.
          </Text>
        </View>
      )}
    </View>
  );
}
