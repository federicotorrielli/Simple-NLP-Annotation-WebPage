import {data} from "./data/data";
import {initializeApp} from "firebase/app";
import {collection, CollectionReference, doc, getDoc, getFirestore, setDoc, updateDoc} from "firebase/firestore";
import React, {useState} from 'react'
import MadeByMe from "./MadeByMe";
import Disclaimer from "./Disclaimer";
import MiddleVsAdvanced from "./MiddleVsAdvanced";
import TopBanner from "./TopBanner";
import Video from "./Video";

type DataType = {
    name: string,
    answers: ("middle" | "advanced")[],
    i: number,
    dataset: string[],
    isHard: (true | false)[],
    timeDiffs: number[],
    date: Date
}

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firstore = getFirestore(app);
const col = collection(firstore, "annotations") as CollectionReference<DataType>;

function App() {
    const [name, setName] = useState("");
    const [ready, setReady] = useState(false);
    const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);
    const [middleVsAdvancedShown, setMiddleVsAdvancedShown] = useState(false);
    const [videoWatched, setVideoWatched] = useState(false);
    const [dataset, setDataset] = useState<string[] | null>([]);
    const [i, setI] = useState(0);
    const [answers, setAnswers] = useState<("middle" | "advanced")[]>([]);
    const [isHard, setIsHard] = useState<(true | false)[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isDownloaded, setIsDownloaded] = useState(false);
    const [timeBetweenQuestionsStart, setTimeBetweenQuestionsStart] = useState(new Date());
    const [timeDiffs, setTimeDiffs] = useState<number[]>([]);

    const dataSets: any = {
        1: data, // keep this here if we want more datasets
        default: data
    };

    const calculateTimeDifference = (startTime: Date, endTime: Date) => {
        // Return the time passed in seconds
        return (endTime.getTime() - startTime.getTime()) / 1000;
    }

    const recoverData = (secondName: string) => {
        // Recover and save the data to a json file
        const docRef = doc(col, secondName);
        getDoc(docRef).then((doc) => {
            if (!doc.exists()) {
                console.log("No such document!");
            } else {
                // Download data as JSON file
                const data = doc.data();
                const json = JSON.stringify(data);
                const blob = new Blob([json], {type: "application/json"});
                const href = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = href;
                link.download = secondName + ".json";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        });
    }
    const handleStart = async (event: any) => {
        if (event.key === 'Enter' || event.type === 'click') {
            if (name.length === 0) {
                return alert("Please enter your name");
            }
            const tempName = name.toLowerCase().trim();
            setName(tempName); // This is lazy so just for this time we are going to assign tempName anywhere

            if (tempName.startsWith("admin")) {
                // Recover data of the name after "admin" and a space
                const secondName = tempName.substring(6);
                recoverData(secondName);
                return;
            }

            setDataset(dataSets[tempName] || dataSets.default);
            const docRef = doc(col, tempName);
            await getDoc(docRef).then((doc) => {
                if (doc.exists()) {
                    // If the user has already answered questions, get data from firebase
                    const data = doc.data();
                    if (data?.dataset && data?.i >= data?.dataset.length) {
                        alert("Thank you for your participation, you already completed the task!");
                    } else {
                        if (data) {
                            updateProgressBar(data.i, data.dataset.length);
                            setAnswers(data.answers);
                            setTimeDiffs(data.timeDiffs);
                            setI(data.i);
                            setIsHard(data.isHard);
                            setReady(true);
                        }
                    }
                } else {
                    // This is a new user
                    setReady(true);
                }
            });
        }
        setTimeBetweenQuestionsStart(new Date());
    }

    const updateProgressBar = (ivalue: number, len: number) => {
        const progress = document.getElementById("progress-bar");
        if (progress && dataset) {
            progress.style.width = `${(ivalue + 1) / len * 100}%`;
        }
    }

    const next = async (newAnswers: ("middle" | "advanced")[]) => {
        if (!isLoading) {
            setIsLoading(true);
            const timeDiff = calculateTimeDifference(timeBetweenQuestionsStart, new Date())

            const checkbox = document.getElementById("hard-checkbox") as HTMLInputElement;
            if (dataset) {
                updateProgressBar(i, dataset.length);
                setIsDownloaded(true);
            }

            if (dataset && i < dataset.length) {
                // Check if the checkbox is checked
                const isHardChecked = checkbox.checked;
                setIsHard([...isHard, isHardChecked]);
                setTimeDiffs([...timeDiffs, timeDiff]);
                // Save the answers to firebase
                const docRef = doc(firstore, "annotations/" + name);
                await getDoc(docRef).then((docSnap) => {
                    if (!docSnap.exists()) {
                        // Create a new document
                        setDoc(docRef, {
                            name: name,
                            answers: newAnswers,
                            i: newAnswers.length,
                            dataset: dataset,
                            isHard: [...isHard, checkbox.checked],
                            timeDiffs: [...timeDiffs, timeDiff],
                            date: new Date(),
                        });
                    } else {
                        // Update the document
                        updateDoc(docRef, {
                            answers: newAnswers,
                            i: newAnswers.length,
                            isHard: [...isHard, checkbox.checked],
                            timeDiffs: [...timeDiffs, timeDiff],
                            date: new Date(),
                        });
                    }
                    setI(newAnswers.length);
                })
            }
            setTimeBetweenQuestionsStart(new Date());
            checkbox.checked = false;

            if (dataset && i + 1 >= dataset.length) {
                alert("Thank you for your participation!");
                setReady(false);
                setAnswers([]);
                setI(0);
            }

            setIsLoading(false);
        }
    }

    const onClick = (answer: ("middle" | "advanced")) => {
        const newAnswers = [...answers, answer];
        setAnswers(newAnswers);
        next(newAnswers);
    }

    return (
        !ready ?
            !disclaimerAccepted ?
                <div className="text-center mt-8 max-w-3xl mx-auto" style={{overflowY: "scroll"}}>
                    <Disclaimer/>
                    <button
                        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 shadow-lg"
                        onClick={() => setDisclaimerAccepted(true)}
                    >
                        Proceed
                    </button>
                </div>
                :
                !middleVsAdvancedShown ?
                    <div className="text-center mt-8 max-w-3xl mx-auto">
                        <MiddleVsAdvanced/>
                        <button
                            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 shadow-lg"
                            onClick={() => setMiddleVsAdvancedShown(true)}
                        >
                            Proceed
                        </button>
                    </div>
                    :
                    !videoWatched ?
                        <div className="flex flex-col items-center justify-center h-screen w-screen">
                            <Video url={"https://www.evilscript.eu/files/spiegazione-dicaro.mp4"}/>
                            <button
                                className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 shadow-lg"
                                onClick={() => setVideoWatched(!videoWatched)}
                            >
                                Skip
                            </button>
                        </div>
                        :
                        <div>
                            {<TopBanner
                                text={"Remember that with your username you can always resume the session where you left"}/>}
                            {<MadeByMe/>}
                            <div className="text-center mt-12">
                                <div className="text-4xl font-bold">Ready to get bored?</div>
                                <div className="text-2xl mt-4">Please enter your name to start</div>
                                <div>
                                    <input
                                        value={name}
                                        onChange={e => setName(e.target.value.toLowerCase())}
                                        onKeyDown={handleStart}
                                        className="rounded-lg shadow-lg p-2 border border-gray-400 mt-4"
                                        placeholder="Type your name here..."
                                    />
                                </div>
                                <div>
                                    <button
                                        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 shadow-lg"
                                        onClick={handleStart}
                                    >
                                        Start
                                    </button>
                                </div>
                            </div>
                        </div>

            : <div>
                <div className="text-center justify-center mt-12">
                    {<MadeByMe/>}
                    <h1 className="text-4xl font-bold">Basic or Advanced?</h1>
                    <p className="text-xl mt-6"
                       id="line"><span
                        className="ring-2 ring-blue-500 ring-offset-4 ring-offset-slate-50 rounded-md">Word: <b>{dataset ? dataset[i].split("|")[0].split("):")[1].split(",")[0] : ""}</b></span>
                    </p>
                </div>
                <div className="flex justify-center mt-8">
                    <button id="middle-button"
                            onClick={() => onClick("middle")}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 shadow-lg disabled:bg-gray-500"
                            disabled={isLoading}>
                        BASIC
                    </button>
                    <button id="advanced-button"
                            onClick={() => onClick("advanced")}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-4 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 shadow-lg disabled:bg-gray-500"
                            disabled={isLoading}>
                        ADVANCED
                    </button>
                </div>
                <div className="flex justify-center mt-4">
                    <p>
                        Was this <a href="#"
                                    className="text-blue-600 hover:text-blue-700 cursor-default"
                                    title="Please select this option if it is difficult for you to determine if the term is basic or advanced">hard</a> to
                        evaluate?
                    </p>
                    <input id="hard-checkbox" type="checkbox"
                           className="ml-2 h-6 w-6 rounded-full shadow checked:shadow-xl cursor-pointer"/>
                </div>
                {isDownloaded && dataset ? <div className="flex justify-center mt-8 max-w-2xl mx-auto">
                    <div id={"progress-bar"}
                         className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-l-full"
                         style={{height: 17, width: `${(i + 1) / dataset.length * 100}%`}}>
                        {Math.round((i + 1) / dataset.length * 100)}%
                    </div>
                </div> : <div></div>}
            </div>
    );
}


export default App
