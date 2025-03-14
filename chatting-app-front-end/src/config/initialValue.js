import dayjs from "dayjs"

export const logInValues = { user_email: "", user_pass: "" }

export const timeRequestValues = { time: "", date: "", subject: "" }

export const updateUserData = {
    user_fname: "",
    user_lname: "",
    user_fathername: "",
}

export const updateUserDataAdmin = {
    user_fname: "",
    user_lname: "",
    user_fathername: "",
    user_email: "",
    user_phone: "",
    user_roll_no: "",
    user_track: "",
    user_DOA: "",
    // user_address: ""
}

export const addAnnouncement = {
    announ_title: "",
    announ_description: "",
    isVisible: false,
    announ_date: ""
}

export const addTimeRequest = {
    tir_subject: "Reading",
    tir_time: "",
    tir_date: dayjs().format("YYYY-MM-DD"),
}

export const customerCare = {
    customer_name: "",
    customer_address: "",
    customer_email: "",
    customer_phone: ""
}

export const initialHolidayValue = {
    holiday_name: "",
    holiday_type: "",
    holiday_date: ""
}