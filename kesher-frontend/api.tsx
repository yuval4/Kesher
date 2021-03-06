import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const URL = "http://192.168.1.56:3000"; // this computer
// const URL = "http://172.20.10.5:3000"; // my phone
// const URL = "http://10.76.57.97:3000";
// const URL = "http://139.177.182.246:3000"; // server

const options = async () => {
    const token = await AsyncStorage.getItem("token");
    return {
        headers: {
            Authorization: "Bearer " + token,
        },
    };
};

export default {
    URL: URL,
    login() {
        return {
            login: (data: any) => axios.post(`${URL}/login`, { data }),
            getMe: async () => axios.get(`${URL}/getMe`, await options()),
        };
    },
    parents() {
        return {
            getAll: () => axios.get(URL),
            createParent: async (data: any, childId: any) =>
                axios.post(
                    `${URL}/parents`,
                    { data, childId },
                    await options()
                ),
            getChildrenList: async (id: string) =>
                axios.get(`${URL}/parents/children/${id}`, await options()),
        };
    },
    staffs() {
        return {
            getAll: () => axios.get(URL),
        };
    },
    children() {
        return {
            createChild: async (data: any) =>
                axios.post(`${URL}/children`, data, await options()),
        };
    },
    schools() {
        return {
            getChildren: async (id: string) =>
                axios.get(`${URL}/schools/${id}`, await options()),
            addChildToSchool: async (schoolId: any, childId: any) =>
                axios.patch(
                    `${URL}/schools/children`,
                    { schoolId, childId },
                    await options()
                ),
            getSchoolEvents: async (id: string) =>
                axios.get(`${URL}/schools/events/${id}`, await options()),
            addNewEvent: async (schoolId: string, event: any) =>
                axios.patch(
                    `${URL}/schools/events/${schoolId}`,
                    { event },
                    await options()
                ),
        };
    },
    reports() {
        return {
            createNewReport: async (id: string) =>
                axios.post(`${URL}/newreports/${id}`, await options()),
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
            addCommentToReport: async (ReportId: string, comment: any) =>
                axios.patch(
                    `${URL}/reports/comment/${ReportId}`,
                    { comment },
                    await options()
                ),
            uploadImage: async (data: any) =>
                axios.post(`${URL}/reports/image`, data, await options()),
        };
    },
};
