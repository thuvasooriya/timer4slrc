import logo from './logo.svg';
import React, {useState} from 'react';
import './App.css';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {Button, Divider, Grid, IconButton, Snackbar, TextField, Typography} from "@material-ui/core";
import {firestore} from "./firebaseConfig";
import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles((theme) => ({
    paper: {
        padding: 5
    },
    input: {
        margin: 10,
        width: 65,
    },
    btn: {
        backgroundColor: "#4a148c",
        color: "white",
        textTransform: "none",
        height: 40,
        marginTop: 10,
        '&:hover': {
            backgroundColor: '#7b1fa2',
        },
    },
    topic: {fontSize: 17, fontWeight: 700},
    time: {fontSize: 17, fontWeight: 700, marginLeft: 5},
    topicM: {fontSize: 25, fontWeight: 700},
    timeM: {fontSize: 35, fontWeight: 700, marginLeft: 5},
    timeWrapper: {display: "flex", margin: 10},
    timeWrapperM: {display: "grid", placeItems: "center", width: "100%", height: "80%"},
    dividerY: {marginLeft: 10, marginRight: 10},
    dividerX: {marginTop: 17, marginBottom: 17},
}));

function findRemain(min, sec, ms, currentRemainTime) {
    const remainMs = currentRemainTime - (min * 60 * 100 + sec * 100 + ms)
    let mills = remainMs
    const mins = Math.floor(mills / 6000)
    mills = mills - mins * 60 * 100
    const secs = Math.floor(mills / 100)
    mills = mills - secs * 100
    const mss = mills
    const remainString = `${('0' + mins).slice(-2)}:${('0' + secs).slice(-2)}:${('0' + mss).slice(-2)}`
    console.log({remainMs, remainString})
    return {remainMs, remainString}
}

function App() {
    const classes = useStyles();
    const [min, setMin] = useState(0)
    const [sec, setSec] = useState(0)
    const [ms, setMs] = useState(0)
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [currentRound, setCurrentRound] = useState(1)
    const [round1, setRound1] = useState("00:00:00")
    const [round2, setRound2] = useState("00:00:00")
    const [round3, setRound3] = useState("00:00:00")
    const [remain, setRemain] = useState(90000)
    const [remainText, setRemainText] = useState("15:00:00")

    async function postData(docName, data) {
        firestore.collection("TimerData").doc(docName).set({
            time: data,
        })
            .then(() => {
                setOpen1(true)
            })
            .catch((error) => {
                setOpen2(true)
            });
    }


    async function handleSubmit(e) {
        console.log("fired")
        e.preventDefault()
        const res = findRemain(min, sec, ms, remain)
        setRemainText(res.remainString)
        await postData('remain', res.remainString)
        setRemain(res.remainMs)
        switch (currentRound) {
            case 1:
                setRound1(`${('0' + min).slice(-2)}:${('0' + sec).slice(-2)}:${('0' + ms).slice(-2)}`)
                await postData('round1', `${('0' + min).slice(-2)}:${('0' + sec).slice(-2)}:${('0' + ms).slice(-2)}`)
                break;
            case 2:
                setRound2(`${('0' + min).slice(-2)}:${('0' + sec).slice(-2)}:${('0' + ms).slice(-2)}`)
                await postData('round2', `${('0' + min).slice(-2)}:${('0' + sec).slice(-2)}:${('0' + ms).slice(-2)}`)
                break;
            case 3:
                setRound3(`${('0' + min).slice(-2)}:${('0' + sec).slice(-2)}:${('0' + ms).slice(-2)}`)
                await postData('round3', `${('0' + min).slice(-2)}:${('0' + sec).slice(-2)}:${('0' + ms).slice(-2)}`)
                break;
            default:
                break;
            // code block
        }

        setCurrentRound(currentRound + 1)
        setSec(0)
        setMs(0)
        setMin(0)


    }



    async function handleReset() {
        await postData('round1', `00:00:00`)
        await postData('round2', `00:00:00`)
        await postData('round3', `00:00:00`)
        await postData('remain', `15:00:00`)
        setMin(0)
        setSec(0)
        setMs(0)
        setCurrentRound(1)
        setRound1("00:00:00")
        setRound2("00:00:00")
        setRound3("00:00:00")
        setRemain(90000)
        setRemainText("15:00:00")
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen1(false);
        setOpen2(false);
    };

    return (
        <div className="App">
            <header className="App-header">
                {/*<img src={logo} className="App-logo" alt="logo"/>*/}
                <Paper className={classes.paper} elevation={0}>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="stretch"
                    >
                        <Grid item>
                            <div style={{display: "flex"}} >
                                <TextField value={min}
                                           className={classes.input}
                                           label="min"
                                           type="number"
                                           size="small"
                                           onChange={(e) => {
                                               setMin(parseInt(e.target.value))
                                           }}
                                           InputProps={{
                                               inputProps: {
                                                   max: 15, min: 0
                                               }
                                           }}
                                           required
                                           variant="outlined"/>
                                <TextField value={sec}
                                           className={classes.input}
                                           label="sec"
                                           type="number"
                                           size="small"
                                           onChange={(e) => {
                                               setSec(parseInt(e.target.value))
                                           }}
                                           InputProps={{
                                               inputProps: {
                                                   max: 59, min: 0
                                               }
                                           }}
                                           required
                                           variant="outlined"/>
                                <TextField value={ms}
                                           className={classes.input}
                                           label="s/100"
                                           type="number"
                                           size="small"
                                           onChange={(e) => {
                                               setMs(parseInt(e.target.value))
                                           }}
                                           InputProps={{
                                               inputProps: {
                                                   max: 99, min: 0
                                               }
                                           }}
                                           required
                                           variant="outlined"/>

                                {currentRound === 4 ?
                                    <Button size="small" className={classes.btn} onClick={handleReset}>Reset</Button>
                                    :
                                    <Button  size="small" className={classes.btn} onClick={handleSubmit}>Enter</Button>
                                }
                            </div>
                            <div className={classes.timeWrapperM}>
                                <div style={{display: "block"}}>
                                    <Typography className={classes.timeM}>{remainText} </Typography>
                                    <Typography className={classes.topicM}>Remaining Time</Typography>
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
            <>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    style={{width: 200, backgroundColor: "#6a1b9a"}}
                    open={open1}
                    autoHideDuration={1000}
                    onClose={handleClose}
                    message="Successful"
                    action={
                        <React.Fragment>
                            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                                <CloseIcon fontSize="small"/>
                            </IconButton>
                        </React.Fragment>
                    }
                />
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={open2}
                    autoHideDuration={1000}
                    onClose={handleClose}
                    style={{width: 200, backgroundColor: "#ad1457"}}
                    message="Error"
                    action={
                        <React.Fragment>
                            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                                <CloseIcon fontSize="small"/>
                            </IconButton>
                        </React.Fragment>
                    }
                />
            </>
        </div>
    );
}

export default App;
