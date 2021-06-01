import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AttendanceScreen from '../screens/teacher/AttendanceScreen';
import globalStyles from '../assets/globalStyles';
import ChildrenListReportScreen from '../screens/teacher/childrenListReportScreen';
import ReportStack from './reportStack';

const TopTab = createMaterialTopTabNavigator();
export default function TopTabs () {

    return (
        <TopTab.Navigator
            tabBarOptions={{
                activeTintColor: 'white',
                inactiveTintColor: globalStyles.color.lightPurple,
                labelStyle: { fontFamily: globalStyles.font.semiBold, fontSize: 22, marginTop: -11
                },
                indicatorStyle: {backgroundColor: globalStyles.color.purple},
                style: { backgroundColor: globalStyles.color.mediumPurplel, height: 35},    
            }} 
            initialRouteName='דיווח יומי' 
        >
            <TopTab.Screen name="דיווח יומי" component={ReportStack} />  

            <TopTab.Screen name="עדכון נוכחות" component={AttendanceScreen} />
        
        </TopTab.Navigator>
    );
}