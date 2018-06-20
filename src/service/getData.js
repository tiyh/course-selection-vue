import fetch from '../config/fetch'
import {getStore} from '../config/mUtils'
export const listCourses = ()=> fetch('/courses',{
    method:"GET",
    mode:'no-cors',
});

export const getStudentById=(id) => {
    console.log("getStudentById user_id:"+id);
    if(!id) return null;
    return fetch('/student/'+id,{
            method:"GET",
            mode:'cors',
            headers: new Headers({
            'Authorization':"Bearer "+
            getStore("token"),
            //'Content-Type':'multipart/form-data'//Could not parse multipart servlet request;
            }),
        });
}

export const getCourseById=(id) => {
    console.log("getCourseById user_id:"+id);
    if(!id) return null;
    return fetch('/course/'+id,{
            method:"GET",
            mode:'cors',
            headers: new Headers({
            'Authorization':"Bearer "+
            getStore("token"),
            //'Content-Type':'multipart/form-data'//Could not parse multipart servlet request;
            }),
        });
}

export const chooseCourse=(studentID,courseID) => {
    console.log("chooseCourse user_id:"+studentID+"course id:"+courseID);
    if(!studentID||!courseID) return null;
    return fetch('/students/'+studentID+'/selections/'+courseID,{
            method:"GET",
            mode:'cors',
            headers: new Headers({
            'Authorization':"Bearer "+
            getStore("token"),
            //'Content-Type':'multipart/form-data'//Could not parse multipart servlet request;
            }),
        });
}