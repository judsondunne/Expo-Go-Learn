import { Tabs } from "expo-router"

export default () => {
    return (
        <Tabs screenOptions={{ headerShown: false}}>
            <Tabs.Screen name="home" options={{ headerShown: false}}/>
            <Tabs.Screen name="post" options={{ headerShown: false}}/>
            <Tabs.Screen name="map" options={{ headerShown: false}}/>
            <Tabs.Screen name="togo" options={{ headerShown: false}}/>
            <Tabs.Screen name="profile" options={{ headerShown: false}}/>
        </Tabs>
    )
}