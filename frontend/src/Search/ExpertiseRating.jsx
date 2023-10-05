import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import RadioButtonUncheckedSharpIcon from "@mui/icons-material/RadioButtonUncheckedSharp";
import RadioButtonCheckedSharpIcon from "@mui/icons-material/RadioButtonCheckedSharp";

const labels = {
    1: 'Poor',
    2: 'Fair',
    3: 'Medium',
    4: 'Good',
    5: 'Excellent',
};

const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
        color: "#44ab06"
    }
});

export default function SurveyRating({title, value, setValue}) {
    const [hover, setHover] = React.useState(-1);
    return (
        <Box
            sx={{
                "& > legend": { ml: 3 }
            }}
        >
            <Typography component="legend">
                {title}
            </Typography>
            <Box
                sx={{
                    mb: 1,
                    ml: 3,
                    width: 200,
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
            <StyledRating
                name="search-knowledge"
                defaultValue={3}
                value={value}
                max={5}
                icon={<RadioButtonCheckedSharpIcon fontSize="inherit" />}
                emptyIcon={<RadioButtonUncheckedSharpIcon fontSize="inherit" />}
                highlightSelectedOnly
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                onChangeActive={(event, newHover) => {
                    setHover(newHover);
                }}
            />
            {value !== null && (
                <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
            )}
            </Box>
        </Box>
    );
}