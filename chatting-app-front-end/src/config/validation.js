import * as Yup from "yup";

export const LogInValidation = Yup.object({
    user_email: Yup.string().matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|net)$/, "Email must be a valid email").required('Email is required'),
    user_pass: Yup.string().trim().matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&*+=!])(?!.*\s).{8,25}$/, "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character and must be 8-25 characters long").required("Required"),
});

export const addRoleValidation = Yup.object({
    user_email: Yup.string().matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|net)$/, "Email must be a valid email").required('Email is required'),
})

export const updateProfileValidation = Yup.object({
    user_fname: Yup.string().trim().required('First name must be required').min(2, "First name must be at least 2 characters"),
    user_fathername: Yup.string().trim().required('Father name must be requires').min(2, "Father's name must be at least 2 characters"),
    user_lname: Yup.string().trim().required('Last name must be required'),
    // user_phone: Yup.string()
    //     .test(
    //         "is-numeric",
    //         "Phone number can only contain numbers",
    //         (value) => /^\d+$/.test(value)
    //     )
    //     .matches(/^[0-9]{10}$/, {
    //         message: "Phone number must be exactly 10 digits",
    //         excludeEmptyString: true,
    //     })
    //     .required("Phone number is required"),
    // user_email: Yup.string().trim().matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|net)$/, "Email must be a valid email").required('Email is required'),
    // user_address: Yup.string().trim().required('Address must be required'),
})

export const updateProfileValidationAdmin = Yup.object({
    user_fname: Yup.string().trim().required('First name must be required').min(2, "First name must be at least 2 characters"),
    user_fathername: Yup.string().trim().required('Father name must be requires').min(2, "Father's name must be at least 2 characters"),
    user_lname: Yup.string().trim().required('Last name must be required'),
    user_phone: Yup.string()
        .test(
            "is-numeric",
            "Phone number can only contain numbers",
            (value) => /^\d+$/.test(value)
        )
        .matches(/^[0-9]{10}$/, {
            message: "Phone number must be exactly 10 digits",
            excludeEmptyString: true,
        })
        .required("Phone number is required"),
    user_email: Yup.string().trim().matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|net)$/, "Email must be a valid email").required('Email is required'),
    // user_roll_no: "",
    // user_track: "",
    // user_DOA: "",
})

export const customerCareValidation = Yup.object({
    customer_name: Yup.string().trim().required('First name must be required').min(2, "First name must be at least 2 characters"),
    customer_address: Yup.string().trim().required('Address must be required'),
    customer_email: Yup.string().trim().matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|net)$/, "Email must be a valid email").required('Email is required'),
    customer_phone: Yup.string()
        .test(
            "is-numeric",
            "Phone number can only contain numbers",
            (value) => /^\d+$/.test(value)
        )
        .matches(/^[0-9]{10}$/, {
            message: "Phone number must be exactly 10 digits",
            excludeEmptyString: true,
        })
        .required("Phone number is required"),
})

export const holidayValidation = Yup.object({
    holiday_name: Yup.string().trim().required("Holiday name is required").min(3, "Holiday Name must be at least 3 characters"),
    holiday_type: Yup.string().trim().required("Holiday type is required").min(3, "Holiday Type must be at least 3 characters"),
    holiday_date: Yup.string().required("Holiday date is required"),
})

export const queryValidation = Yup.object({
    query_question: Yup.string().trim().required("Query question is required").min(3, "Query question must be at least 3 characters"),
})

export const queryAdminValidation = Yup.object({
    query_answer: Yup.string().trim().required("Query answer is required").min(3, "Query answer must be at least 3 characters"),
})

export const examValidationSchema = Yup.object().shape({
    exam_name: Yup.string().required('Exam name is required'),
    exam_total_marks: Yup.number().required('Total marks are required').positive('Marks must be a positive number'),
    exam_passing_marks: Yup.number().required('Passing marks are required').min(1, 'Passing marks must be at least 1'),
    exam_start_time: Yup.string().required('Start time is required'),
    exam_total_time: Yup.string().required('Total time is required'),
    exam_date: Yup.date().required('Exam date is required').typeError('Invalid date format'),
});


export const emailValidation = Yup.object({
    user_email: Yup.string().matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|net)$/, "Email must be a valid email").required('Email is required'),

});

export const passwordValidation = Yup.object({
    user_pass: Yup.string().trim().matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&*+=!])(?!.*\s).{8,25}$/, "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character and must be 8-25 characters long").required("Required"),
});

export const passwordValidationSchema = Yup.object({
    new_password: Yup
        .string()
        .trim()
        .required("Password is required")
        .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&*+=!])(?!.*\s).{8,25}$/, "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character and must be 8-25 characters long"),
    conf_password: Yup
        .string()
        .required("Confirm Password is required")
        .oneOf([Yup.ref("new_password"), null], "Passwords must match"),
});



export const validationSchemaScorcard = Yup.object().shape({
    subjects: Yup.array().of(
        Yup.object().shape({
            details: Yup.object().shape({
                score_subject: Yup.string().required("Subject ID is required"),
                score_percentage: Yup.number()
                    .min(0, "Percentage must be at least 0%")
                    .max(100, "Percentage must be at most 100%")
                    .required("Percentage is required"),
                score_sub_subject: Yup.array()
                    .of(
                        Yup.object().shape({
                            name: Yup.string().required("Sub-subject name is required"),
                            percentage: Yup.number()
                                .min(0, "Must be at least 0%")
                                .max(100, "Must be at most 100%")
                                .required("Percentage is required"),
                        })
                    )
                    .test(
                        "total-percentage",
                        "The total percentage of all sub-subjects must be 100",
                        (score_sub_subject) => {
                            const totalPercentage = score_sub_subject?.reduce(
                                (total, sub) => total + (sub.percentage || 0),
                                0
                            );
                            return totalPercentage === 100;
                        }
                    ),
            }),
        })
    ).test(
        "total-subject-percentage",
        "The total score percentage of all subjects must be 100",
        (subjects) => {
            const totalPercentage = subjects?.reduce(
                (total, subject) => total + (subject.details.score_percentage || 0),
                0
            );
            return totalPercentage === 100;
        }
    ),
});
