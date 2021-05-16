import logo from './logo.svg';
import React, {useState} from 'react';
import './App.css';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {Button, Divider, Grid, TextField, Typography} from "@material-ui/core";
import {firestore} from "./firebaseConfig";


const useStyles = makeStyles((theme) => ({
    paper: {
        padding: 5
    },
    input: {
        margin: 10,
        width: 65,
    },
    btn: {
        backgroundColor: "#ffff",
        color: "gray",
        textTransform: "none",
        height: 40,
        marginTop: 10,
        '&:hover': {
            backgroundColor: 'lightgray',
        },
    },
    topic: {fontSize: 20, fontWeight: 700},
    time: {fontSize: 20, fontWeight: 700, marginLeft: 5},
    topicM: {fontSize: 20, fontWeight: 700,marginLeft:5},
    timeM: {fontSize: 35, fontWeight: 700, marginLeft: 5},
    timeWrapper: {display: "flex", margin: 10},
    timeWrapperM: {display: "grid", placeItems: "center", width: "100%", height: "100%",marginRight:40,marginLeft:-10},
    dividerY: {marginLeft: 10, marginRight: 10},
    dividerX: {marginTop: 17, marginBottom: 17},
}));

function findRemain(min, sec, ms, currentRemainTime) {
    const remainMs = currentRemainTime - (min * 60 * 10 + sec * 10 + ms)
    let mills = remainMs
    const mins = Math.floor(mills / 600)
    mills = mills - mins * 60 * 10
    const secs = Math.floor(mills / 10)
    mills = mills - secs * 10
    const mss = mills
    const remainString = `${('0' + mins).slice(-2)}:${('0' + secs).slice(-2)}:${('0' + mss).slice(-2)}`
    console.log({remainMs, remainString})
    return {remainMs, remainString}
}

function App() {
    const classes = useStyles();
    const [round1, setRound1] = useState("00:00:00")
    const [round2, setRound2] = useState("00:00:00")
    const [round3, setRound3] = useState("00:00:00")
    const [remainText, setRemainText] = useState("15:00:00")

    // function handleSubmit(e) {
    //     e.preventDefault()
    //     const res = findRemain(min, sec, ms, remain)
    //     setRemainText(res.remainString)
    //     setRemain(res.remainMs)
    //     switch (currentRound) {
    //         case 1:
    //             setRound1(`${('0' + min).slice(-2)}:${('0' + sec).slice(-2)}:${('0' + ms).slice(-2)}`)
    //             break;
    //         case 2:
    //             setRound2(`${('0' + min).slice(-2)}:${('0' + sec).slice(-2)}:${('0' + ms).slice(-2)}`)
    //             break;
    //         case 3:
    //             setRound3(`${('0' + min).slice(-2)}:${('0' + sec).slice(-2)}:${('0' + ms).slice(-2)}`)
    //             break;
    //         default:
    //             break;
    //         // code block
    //     }
    //     if (currentRound <= 3) {
    //         setCurrentRound(currentRound + 1)
    //         setSec(0)
    //         setMs(0)
    //         setMin(0)
    //     }
    //
    // }
    firestore.collection("TimerData").doc("round1")
        .onSnapshot((doc) => {
           setRound1(doc.data().time);
        });
    firestore.collection("TimerData").doc("round2")
        .onSnapshot((doc) => {
            setRound2(doc.data().time);
        });
    firestore.collection("TimerData").doc("round3")
        .onSnapshot((doc) => {
            setRound3(doc.data().time);
        });
    firestore.collection("TimerData").doc("remain")
        .onSnapshot((doc) => {
            setRemainText(doc.data().time);
        });

    function handleReset() {
        window.location.reload(false)
    }

    return (
        <div className="App">
            <header className="App-header">
                {/*<img src={logo} className="App-logo" alt="logo"/>*/}
                <Paper className={classes.paper} elevation={0}>
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="stretch"
                    >
                        <Grid item>
                            <div className={classes.timeWrapperM}>
                                <div style={{display: "block",textAlign:"center"}}>
                                    <Typography className={classes.timeM}>{remainText}</Typography>
                                    <Typography className={classes.topicM}>Remaining Time</Typography>
                                    <Button size="small" className={classes.btn} onClick={handleReset}>Refresh</Button>
                                </div>
                            </div>
                        </Grid>
                        <Grid item>
                            <Divider className={classes.dividerY} orientation={"vertical"}/>
                        </Grid>
                        <Grid item
                        >
                            <div style={{display: "block"}}>
                                <Divider className={classes.dividerX} orientation={"horizontal"}/>
                                <div className={classes.timeWrapper}>
                                    <Typography className={classes.topic}>Attempt 1 : </Typography>
                                    <Typography className={classes.time}> {round1}</Typography>
                                </div>
                                <Divider className={classes.dividerX} orientation={"horizontal"}/>
                                <div className={classes.timeWrapper}>
                                    <Typography className={classes.topic}>Attempt 2 : </Typography>
                                    <Typography className={classes.time}> {round2} </Typography>
                                </div>
                                <Divider className={classes.dividerX} orientation={"horizontal"}/>
                                <div className={classes.timeWrapper}>
                                    <Typography className={classes.topic}>Attempt 3 : </Typography>
                                    <Typography className={classes.time}> {round3} </Typography>
                                </div>
                                <Divider className={classes.dividerX} orientation={"horizontal"}/>
                            </div>
                        </Grid>
                    </Grid>
                </Paper>
            </header>
        </div>
    );
}

export default App;
