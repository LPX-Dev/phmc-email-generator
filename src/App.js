/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import './App.css';
import myImage from './dmec_christmas.png';


function App() {
    const [formData, setFormData] = useState({
        jobClassification: '',
        department: '',
        coronerName: '',
        coronerNumber: '',
        coronerDiscord: '',
        copName: '',
        synopsis: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const generateBBCode = () => {
        const {
            jobClassification,
            coronerDiscord,
            coronerNumber,
            department,
            coronerName,
            copName,
            synopsis,
        } = formData;

        const bbCode = `[center][img]https://i.imgur.com/ItaoQkO.png[/img][/center]

[hr][/hr]

TO: ${copName} - ${department}
FROM: ${coronerName}@phmc.health
SUBJECT: Death Report Paperwork

For the attention of: [b]${department}[/b] - [b] ${copName}[/b]

This report has been written by ${jobClassification} ${coronerName}, you can find the enclosed documents attached to this email. If you require an autopsy, please follow this link and follow the instructions: [url=https://phmc.gta.world/viewforum.php?f=265]Autopsy Portal[/url].

If you have further enquiries, feel free to reach out to the following individual:
[list][*]  ${coronerName}
[*] Phone Number: ${coronerNumber}
[*] (( Discord: ${coronerDiscord} ))[/list]

[altspoiler=Forensic and Pathology Report]
${synopsis}

[code]
${synopsis}
[/code]
[/altspoiler]



Kind regards
[b]${jobClassification}[/b] - [b]${coronerName}[/b]
Pillbox Hill Medical Center - Pathology  and Forensic Medicine

[size=75]The content of this email is intended for the person or entity to which it is addressed only. This email may contain confidential information. If you are not the person to whom this message is addressed, be aware that any use, reproduction, or distribution of this message is strictly prohibited. If you received this in error, please contact the sender and immediately delete this email and any attachments.[/size]`
        return bbCode;
    };
                    <div className="output-container">
                    <h2>Generated Email Code</h2>
                    <div className="bbcode-output">
                        <pre>{generateBBCode()}</pre>
                    </div>
                    <h4>Generated Email</h4>
                    <button type="button" onClick={() => {
                        const title = generateTitle();
                        navigator.clipboard.writeText(title).then(() => {
                            //alert('Title copied to clipboard!');
                        });
                    }}>Copy Title</button>
                    <button type="button" onClick={() => {
                        const bbCode = generateBBCode();
                        navigator.clipboard.writeText(bbCode).then(() => {
                            //alert('BBCode copied to clipboard!');
                        });
                    }}>Copy Email BBCode</button>
                </div>

    const generateTitle = () => {
        const { typeOfDeath, copName, dateTime } = formData;
        const date = new Date(dateTime).toLocaleDateString('en-US');
        return `[${typeOfDeath}] ${copName} - ${date}`;
    };

    return (
        <div className="App">
            <div className="container">
                <div className="form-container">
                    <h2>Office of Pathology and Forensic Email Generator </h2>
                    <a href="https://github.com/lpx-dev/phmc-email-generator" target="_blank" rel="noopener noreferrer">
                    <h5>This website is fully open source and was made by Fr0sty, you can report bugs in the PHMC Discord.</h5>
                    </a>
                    <details>
                        <summary>Change Log - 1.4</summary>
                        <ul>
                            <li>Christmas is here! </li>
                            <li> - frosty</li>
                        </ul>
                    </details>  

                    <img src={myImage} alt="My Image" width={685} height={300} />
                    <button type="button" onClick={() => {
                        const title = generateTitle();
                        navigator.clipboard.writeText(title).then(() => {
                            window.open('https://phmc.gta.world/viewforum.php?f=267', '_blank');
                        });
                    }}>
                      PHMC Death Reports
                    </button>

                    <button type="button" onClick={() => {
                        const title = generateTitle();
                        navigator.clipboard.writeText(title).then(() => {
                            window.open('https://phmc.gta.world/ucp.php?i=ucp_pm&mode=compose', '_blank');
                        });
                    }}>
                        Create Forum DM
                    </button>

                    <form>
                        <label>
                            Officer Name:
                            <input type="text" name="copName" value={formData.copName} onChange={handleChange} placeholder="Robert Garcia" required />
                        </label>
                        <label>
                            Officer Department:
                            <select name="department" value={formData.department} onChange={handleChange} required>
                                <option value="" disabled>Select Department</option>
                                <option value="LSFD">LSFD</option>
                                <option value="LSPD">LSPD</option>
                                <option value="LSSD">LSSD</option>
                                <option value="PHMC">PHMC</option>
                                <option value="SANFIRE">SANFIRE</option>
                                <option value="SADCR">SADCR</option>
                                <option value="LSGOV">LSGOV</option>
                            </select>
                        </label>
                        <label>
                            Coroner's Name:
                            <input type="text" name="coronerName" value={formData.coronerName} onChange={handleChange} placeholder="Anne Carter" required />
                        </label>
                        <label>
                            Coroner's Rank:
                            <select name="jobClassification" value={formData.jobClassification} onChange={handleChange} required>
                                <option value="Forensic Attendant">Forensic Attendant</option>
                                <option value="Supervising Forensic Attendant">Supervising Forensic Attendant</option>
                                <option value="Coroner Investigator">Coroner Investigator</option>
                                <option value="Supervising Coroner Investigator">Supervising Coroner Investigator</option>
                                <option value="Medical Examiner">Medical Examiner</option>
                                <option value="Supervising Medical Examiner">Supervising Medical Examiner</option>
                                <option value="Deputy Chief Medical Examiner">Deputy Chief Medical Examiner</option>
                                <option value="Chief Medical Examiner">Chief Medical Examiner</option>
                            </select>
                        </label>
                        <label>
                            Coroner Contact Number:
                            <input type="text" name="coronerNumber" value={formData.coronerNumber} onChange={handleChange} placeholder="1234567890" required />
                        </label>
                        <label>
                            Coroner Discord Name:
                            <input type="text" name="coronerDiscord" value={formData.coronerDiscord} onChange={handleChange} placeholder="ItsFr0sty" required />
                        </label>
                        <label>
                            Paste Death Report BBCode:
                            <textarea name="synopsis" value={formData.synopsis} onChange={handleChange} rows="4" placeholder="Paste the full BBCode of your Death Investigation Report in here." required></textarea>
                        </label>
                    </form>
                </div>
                <div className="output-container">
                    <h2>Generated Email Code</h2>
                    <div className="bbcode-output">
                        <pre>{generateBBCode()}</pre>
                    </div>
                    <h4>Generated Email</h4>
                    <button type="button" onClick={() => {
                        const bbCode = generateBBCode();
                        navigator.clipboard.writeText(bbCode).then(() => {
                            //alert('BBCode copied to clipboard!');
                        });
                    }}>Copy Email BBCode</button>

                </div>
            </div>
        </div>
    );
}

export default App;
