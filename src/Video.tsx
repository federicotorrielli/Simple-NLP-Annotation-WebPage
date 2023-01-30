function Video({url}: { url: string }) {
    return (
        <video
            className="border border-solid border-blue-500 rounded-md h-1/2 w-1/2 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 shadow-lg"
            controls={true}>
            <source src={url} type="video/mp4"/>
        </video>
    )
}

export default Video;
