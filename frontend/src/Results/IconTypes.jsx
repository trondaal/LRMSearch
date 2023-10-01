import React from "react";
import MenuBookTwoToneIcon from "@mui/icons-material/MenuBookTwoTone";
import LocalMoviesTwoToneIcon from '@mui/icons-material/LocalMovies';
import PhotoTwoToneIcon from '@mui/icons-material/PhotoTwoTone';
import HeadsetTwoToneIcon from '@mui/icons-material/HeadsetTwoTone';
import MusicNoteTwoToneIcon from '@mui/icons-material/MusicNoteTwoTone';
import QueueMusicTwoToneIcon from '@mui/icons-material/QueueMusicTwoTone';
import ComputerTwoToneIcon from '@mui/icons-material/ComputerTwoTone';
import MapTwoToneIcon from '@mui/icons-material/MapTwoTone';
import QuestionMarkTwoToneIcon from '@mui/icons-material/QuestionMarkTwoTone';
import AudiotrackTwoToneIcon from '@mui/icons-material/AudiotrackTwoTone';
import GrainTwoToneIcon from '@mui/icons-material/GrainTwoTone';
import ArticleTwoToneIcon from '@mui/icons-material/ArticleTwoTone';

const IconTypes = props => {
    const { type, color } = props;
    switch (type){
        case ('Maps'):
            return <MapTwoToneIcon fontSize="large" color={color}/>;
        case ('Software'):
            return <ComputerTwoToneIcon fontSize="large" color={color}/>;
        case ('Score'):
            return <QueueMusicTwoToneIcon fontSize="large" color ={color}/>;
        case ('Performed music'):
            return <MusicNoteTwoToneIcon fontSize="large" color={color}/>;
        case ('Audio book'):
            return <HeadsetTwoToneIcon fontSize="large" color={color}/>;
        case ('Illustrations'):
            return <PhotoTwoToneIcon fontSize="large" color={color}/>;
        case ('Text'):
            return <MenuBookTwoToneIcon fontSize="large" color={color} className={"icon"}/>;
        case ('Movie (3D)'):
            return <LocalMoviesTwoToneIcon fontSize="large" color={color}/>;
        case ('Movie'):
            return <LocalMoviesTwoToneIcon fontSize="large" color={color}/>;
        case ('Music'):
            return <AudiotrackTwoToneIcon fontSize="large" className={color}/>;
        case ('Tactile text'):
            return <GrainTwoToneIcon fontSize="large" color={color}/>;
        default:
            return <QuestionMarkTwoToneIcon fontSize="large" color={color}/>;
    }
};

export default IconTypes;