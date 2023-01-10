import { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik"; // the form library added through npm
import * as yup from "yup"; // a form validation library added through npm
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state"
import Dropzone from "react-dropzone"; // so we can drop a file like image 
import FlexBetween from "../../components/FlexBetween";
// when we validate input value if it is not according to rules as I set then it will show error
// here we used yup library for the form validation 
const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
    picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
});

const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: "",
};

const initialValuesLogin = {
    email: "",
    password: "",
};

const Form = () => {
    const [pageType, setPageType] = useState("login");
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const isLogin = pageType === "login";  // setting a variable of true or false like boolean
    const isRegister = pageType === "register"; // setting a variable of true or false like

    const register=async(values,onSubmitProps)=>{
        // creating the form as object to store data as objects in database including images,
        // note: we are storing data in object form while taking as string form only because we have to store images as well 
        const formData = new FormData();
        for(let value in values){
            formData.append(value,values[value]);
        }
        formData.append("picturePath",values.picture.name);

        const savedUserResponse=await fetch(
            "http://localhost:3001/auth/register",
            {
                method: "POST",
                body: formData,
            }
        );

        const savedUser=await savedUserResponse.json();
        onSubmitProps.resetForm();
        
            console.log(savedUser);
        if(savedUser){
            setPageType("login");
        }
    };

    const login=async(values,onSubmitProps)=>{
        const loggedInResponse=await fetch(
            "http://localhost:3001/auth/login",
            {
                method: "POST",
                headers:{"Content-Type": "application/json"},
                body: JSON.stringify(values),
            }
        );
        const loggedIn=await loggedInResponse.json();
        onSubmitProps.resetForm();

        // this will maintain the state of the application once we logged in using redux
        if(loggedIn){
            dispatch(
                setLogin({
                    user: loggedIn.user,
                    token: loggedIn.token,
                })
            );
            navigate("/home");
        }
    }

    const handleFormSubmit = async (values, onSubmitProps) => {
        if (isLogin) await login(values, onSubmitProps);
        if (isRegister) await register(values, onSubmitProps);
     }; // the parameters will come from Formik 
    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
            validationSchema={isLogin ? loginSchema : registerSchema}
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm,
            }) => (
                <form onSubmit={handleSubmit}>
                    <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        // what we are doing here? Here, if any div under this Box if it goes to mobile screen size
                        // the following defined properties will be affected on whole Box
                        sx={{
                            "&>div": {
                                gridColumn: isNonMobile ? undefined : "span 4",
                            }
                        }}
                    >
                        {isRegister && (
                            <>
                                <TextField
                                    label="First Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.firstName}
                                    name="firstName"
                                    error={Boolean(touched.firstName)&&Boolean(errors.firstName)} // the error will display if it is touched and having any error
                                    helperText={touched.firstName&& errors.firstName} // it will display helper message for error if there is any error
                                    sx={{
                                        gridColumn:"span 2"
                                    }}
                                />

                                    <TextField
                                    label="Last Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.lastName}
                                    name="lastName"
                                    error={Boolean(touched.lastName)&&Boolean(errors.lastName)} // the error will display if it is touched and having any error
                                    helperText={touched.lastName&& errors.lastName} // it will display helper message for error if there is any error
                                    sx={{
                                        gridColumn:"span 2"
                                    }}
                                />
                                
                                <TextField
                                    label="Location"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.location}
                                    name="location"
                                    error={Boolean(touched.location)&&Boolean(errors.location)} // the error will display if it is touched and having any error
                                    helperText={touched.location&& errors.location} // it will display helper message for error if there is any error
                                    sx={{
                                        gridColumn:"span 4"
                                    }}
                                />
                                
                                <TextField
                                    label="Occupation"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.occupation}
                                    name="occupation"
                                    error={Boolean(touched.occupation)&&Boolean(errors.occupation)} // the error will display if it is touched and having any error
                                    helperText={touched.occupation&& errors.occupation} // it will display helper message for error if there is any error
                                    sx={{
                                        gridColumn:"span 4"
                                    }}
                                />
                                <Box
                                    gridColumn="span 4"
                                    border={`1px solid ${palette.neutral.medium}`}
                                    borderRadius="5px"
                                    p="1rem"
                                >
                                    <Dropzone
                                        acceptedFiles=".jpg,.jpeg,.png"
                                        multiple={false}
                                        onDrop={(acceptedFiles)=>{
                                            setFieldValue("picture",acceptedFiles[0])
                                        }}
                                    >
                                        {({
                                            getRootProps,
                                            getInputProps,
                                        })=>(
                                            <Box
                                            {...getRootProps()}
                                            border={`2px dashed ${palette.primary.main}`}
                                            p="1rem"
                                            sx={{"&:hover":{cursor:"pointer"}}}
                                            >
                                                <input {...getInputProps()}/>
                                                {!values.picture?(
                                                    <p>Add Picture Here</p>
                                                ):(
                                                    <FlexBetween>
                                                        <Typography>{values.picture.name}</Typography>
                                                        <EditOutlinedIcon/>
                                                    </FlexBetween>
                                                )}
                                            </Box>
                                        )}
                                    </Dropzone>
                                </Box>
                            </>
                        )}
                        
                        <TextField
                                    label="Email"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.email}
                                    name="email"
                                    error={Boolean(touched.email)&&Boolean(errors.email)} // the error will display if it is touched and having any error
                                    helperText={touched.email&& errors.email} // it will display helper message for error if there is any error
                                    sx={{
                                        gridColumn:"span 4"
                                    }}
                                />
                                
                                <TextField
                                    label="Password"
                                    type="password"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.password}
                                    name="password"
                                    error={Boolean(touched.password)&&Boolean(errors.password)} // the error will display if it is touched and having any error
                                    helperText={touched.password&& errors.password} // it will display helper message for error if there is any error
                                    sx={{
                                        gridColumn:"span 4"
                                    }}
                                />
                    </Box>
                    <Box>
                        <Button
                            fullWidth
                            type="submit"
                            sx={{
                                m:"2rem 0",
                                p:"1rem",
                                backgroundColor: palette.primary.main,
                                color: palette.background.alt,
                                "&:hover":{color: palette.primary.main},
                            }}
                        >
                            {isLogin? "LOGIN":"REGISTER"}
                        </Button>
                        <Typography
                            onClick={()=>{
                                setPageType(isLogin? "register":"login");
                                resetForm();
                            }}
                            sx={{
                                textDecoration:"underline",
                                color: palette.primary.main,
                                "&:hover":{
                                    cursor: "pointer",
                                    color: palette.primary.light,
                                }
                            }}
                        >
                            {isLogin? "Don't have an account? Sign up here.":"Already have an account? Login here."}
                        </Typography>
                    </Box>
                </form>
            )}
        </Formik>
    )
}

export default Form;