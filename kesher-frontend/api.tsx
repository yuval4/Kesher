import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const URL = "http://192.168.1.56:3000";
// const URL = "http://172.20.10.5:3000";
// const URL = "http://10.76.57.97:3000";

const options = async () => {
    const token = await AsyncStorage.getItem("token");
    return {
        headers: {
            Authorization: "Bearer " + token,
        },
    };
};

export default {
    login() {
        return {
            login: (data: any) => axios.post(`${URL}/login`, { data }),
            getMe: async () => axios.get(`${URL}/getMe`, await options()),
        };
    },
    parents() {
        return {
            getAll: () => axios.get(URL),
            //   updateMotion: (id) => axios.patch(${baseURL}/convoies/${id}/motion),
            //   updateArrived: (id) => axios.patch(${baseURL}/convoies/${id}/arrived),
            //   getProps: () => axios.get(${jsonURL}/convoyProp),
            //   getBrief: () => axios.get(${jsonURL}/convoyBrief),
        };
    },
    staffs() {
        return {
            getAll: () => axios.get(URL),
        };
    },
    children() {
        return {
            createChild: (data: any) => axios.post(`${URL}/children`, { data }),
        };
    },
    schools() {
        return {
            getChildren: async (id: string) =>
                axios.get(`${URL}/schools/${id}`, await options()),
        };
    },
    reports() {
        return {
            getChildrenAttendance: async (ids: Array<String>) =>
                axios.post(
                    `${URL}/reports/attendances/`,
                    { ids },
                    await options()
                ),
            getAllChildReports: async (id: string) =>
                axios.get(`${URL}/reports/${id}`, await options()),

            updateChildAttendance: async (id: string, attendance: boolean) =>
                axios.patch(
                    `${URL}/reports/child/${id}`,
                    { attendance },
                    await options()
                ),
            addSubReportToReport: async (id: string, subReports: any) =>
                axios.patch(
                    `${URL}/reports/subreport/${id}`,
                    { subReports },
                    await options()
                ),
        };
    },
};