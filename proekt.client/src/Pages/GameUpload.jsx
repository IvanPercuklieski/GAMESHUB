import { useState } from 'react';
import AuthorizeView, { AuthorizedUser } from '../Components/AuthorizeView';
import Header from '../Components/Header';

function GameUpload() {
    const [file, setFile] = useState(null);
    const [coverPhoto, setCoverPhoto] = useState(null); 
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [gameHeight, setGameHeight] = useState("");
    const [gameWidth, setGameWidth] = useState("");
    const [uploading, setUploading] = useState(false);


    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        if (selectedFile) {
            setTitle(selectedFile.name.replace(/\.[^/.]+$/, "")); 
        }
    };

    
    const handleCoverPhotoChange = (e) => {
        const selectedCoverPhoto = e.target.files[0];
        setCoverPhoto(selectedCoverPhoto);
    };

    
    const handleUpload = async () => {
        if (!file || !coverPhoto) return alert("Please select both a game file and a cover photo!");
        if (!gameHeight || !gameWidth || !description) return alert("Please fill in all fields!");

        const formData = new FormData();
        formData.append("file", file);
        formData.append("coverPhoto", coverPhoto);  
        formData.append("title", title);
        formData.append("description", description);
        formData.append("gameHeight", Number(gameHeight)); 
        formData.append("gameWidth", Number(gameWidth)); 

        setUploading(true);

        try {
            const response = await fetch("/api/GameUpload/gameupload", {
                method: "POST",
                body: formData
            });

            const result = await response.text();
            console.log(result);

            if (!response.ok) throw new Error(result);

            alert("Game uploaded successfully!");
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Upload failed!");
        } finally {
            setUploading(false);
        }
    };

    return (
        <AuthorizeView unauthorizedContent={
            <>
                <Header />
                <h1>You need to log in to upload games!</h1>
            </>
        }>
            <Header />
            <div style={{ maxWidth: "500px", margin: "auto", padding: "20px", textAlign: "center" }}>
                <h2>Upload Your Game</h2>
                <p>Logged in as: <AuthorizedUser value="email" /></p>

                <input type="file" accept=".zip" onChange={handleFileChange} /><br />
                <input type="text" value={title} readOnly placeholder="Game Title (ZIP Name)" /><br />
                <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} /><br />
                <input type="number" placeholder="Game Height" value={gameHeight} onChange={(e) => setGameHeight(e.target.value)} /><br />
                <input type="number" placeholder="Game Width" value={gameWidth} onChange={(e) => setGameWidth(e.target.value)} /><br />
                <input type="file" accept="image/*" onChange={handleCoverPhotoChange} /><br />

                <button onClick={handleUpload} disabled={uploading} style={{ marginTop: "10px" }}>
                    {uploading ? "Uploading..." : "Upload ZIP and Cover Photo"}
                </button>
            </div>
        </AuthorizeView>
    );
}

export default GameUpload;
