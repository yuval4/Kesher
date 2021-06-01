import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { FlatList } from "react-native-gesture-handler";
// import ChildImage from "./ChildImage";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface ImageData {
  id: Number;
  selected: Boolean;
  imageUri: string;
  name: string;
}
export const IMAGES_PER_ROW = 3;
const dayKey = "@c_day";
const childrenKey = "@c_list";

const getImagesData = (num: Number): ImageData[] => {
    const names = [
      "הילה ביטון",
      "מיכל לב",
      "איתמר נווה",
      "אלכסנדרה דנה גדעון",
      "דניאל גד שוורצקוף",
      "דיקלה לוי",
      "דרור חן",
      "רינת סלע",
      "תמר לוי",
      "יובל מנחם",
      "לילך פינק",
      "אייל חמו",
    ];
    const data = [];
    for (let i = 1; i <= num; i++) {
      data.push({
        id: i,
        selected: false,
        imageUri: "https://i.pravatar.cc/300",
        name: names[i],
      });
    }
    console.log(data)
    return data;
  };
  


export default function ChildImageList({ disableToggle = false, onSelect = (f: any) => f }) {
  const [childList, setChildList] = React.useState<Array<ImageData>>([]);

  React.useEffect(() => {
    (async () => {
      // todo: get from server
      const cDateData = await AsyncStorage.getItem(dayKey);
      if (cDateData !== null) {
        const data = JSON.parse(cDateData);
        await checkCdata(+data);
      } else {
        checkCdata(null);
      }
    })();
  }, []);

  // TODO: temp function
  const checkCdata = async (day: number | null) => {
    const today = new Date().getDay();
    if (day === today) {
      const cChildList: any = await AsyncStorage.getItem(childrenKey);
      setChildList([...JSON.parse(cChildList)]);
      return;
    }
    // todo get children list from server...

    const childrenList = getImagesData(11);
    setChildList(childrenList);
    await AsyncStorage.setItem(dayKey, "today");
    await AsyncStorage.setItem(dayKey, JSON.stringify(childrenList));
  };

  const toggleImageSelected = async (childData: ImageData) => {
    if(!disableToggle) {
        childData.selected = !childData.selected;
        const oldItem = childList.find((item) => item.id === childData.id);
        if (oldItem) oldItem.selected = childData.selected;
        setChildList([...childList]);
        await AsyncStorage.setItem(childrenKey, JSON.stringify([...childList]));
    }
    onSelect(childData);
  };

//   const renderItem = ({ item }: any) =>;
  return (
        <View>
            <FlatList
                data={childList}
                keyExtractor={(item: ImageData) => item.id.toString()}
                numColumns={3}
                renderItem={({ item }) =>  <ChildImage
                                                key={item.id}
                                                imageData={item}
                                                disableToggle={disableToggle}
                                                onImagePressed={(data: ImageData) => toggleImageSelected(data)}>
                                                
                                            </ChildImage>}
            />
        </View>
)}

