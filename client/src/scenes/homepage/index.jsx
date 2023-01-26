import { Box } from "@mui/system";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSelector } from "react-redux";
import UserWidget from "../widgets/UserWidget";
import Navbar from "../navabar";
import MyPostWidget from "../widgets/MyPostWidget";
const HomePage=()=>{
    const isNonMobileScreen=useMediaQuery("(min-width:1000px)");
    const {_id,picturePath}=useSelector((state)=>state.user);
    return (
        <>
            <Navbar/>
            <Box width="100%" padding="2rem 6%" display={isNonMobileScreen? "flex":"block"} gap="0.5rem" justifyContent="space-between">
                <Box flexBasis={isNonMobileScreen ? "26%" : undefined}>
                    <UserWidget userId={_id} picturePath={picturePath}/>
                </Box>
                
                <Box flexBasis={isNonMobileScreen ? "42%" : undefined} mt={isNonMobileScreen? undefined: "2rem"}>
                    {/* <UserWidget userId={_id} picturePath={picturePath}/> */}
                    <MyPostWidget picturePath={picturePath} />
                </Box>

                {/* friend list only show on desktop screen */}
                { isNonMobileScreen&& <Box flexBasis="26%"></Box> }
            </Box>
        </>
    )
} 

export default HomePage;