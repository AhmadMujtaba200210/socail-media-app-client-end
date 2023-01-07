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
import {setLogin} from "../../state"