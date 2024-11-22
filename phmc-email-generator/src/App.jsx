import React, { useState } from 'react';
import './App.css';


function App() {
    const [formData, setFormData] = useState({
        jobClassification: 'Forensic Attendant',
        placeOfDeath: '',
        department: '',
        dateTime: '',
        coronerName: '',
        serialNumber: '',
        decedentName: '',
        pronouncedTimeOfDeath: '',
        synopsis: '',
        probableCauseOfDeath: '',
        mannerOfDeath: 'Natural',
        typeOfDeath: 'CK',
        decedentOOC: '',
        scenePhotos: '',
        additionalImages: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const departmentFullName = (abbreviation) => {
        switch (abbreviation) {
            case 'LSPD':
                return 'Los Santos Police Department';
            case 'LSFD':
                return 'Los Santos Fire Department';
            case 'LSSD':
                return 'Los Santos Sheriff Department';
            case 'PHMC':
                return 'Pillbox Hill Medical Center';
            case 'SANFIRE':
                return 'San Andreas Department of Forestry and Fire Protection';
            case 'SADCR':
                return 'San Andreas Department of Corrections and Rehabilitation';
            case 'LSGOV':
                return 'Los Santos City Government';
            case '911 Call':
                return 'Emergency 911 Dispatch Center';
            default:
                return '';
        }
    };

    const generateBBCode = () => {
        const {
            jobClassification,
            placeOfDeath,
            department,
            dateTime,
            coronerName,
            serialNumber,
            decedentName,
            pronouncedTimeOfDeath,
            synopsis,
            probableCauseOfDeath,
            mannerOfDeath,
            typeOfDeath,
            scenePhotos,
            additionalImages
        } = formData;

        const scenePhotosBBCode = scenePhotos.split(',').map(photo => `[img]${photo.trim()}[/img]`).join('\n');
        const additionalImagesBBCode = additionalImages.split(',').map(photo => `[img]${photo.trim()}[/img]`).join('\n');

        const bbCode = `[divbox=white][center][img]https://i.imgur.com/Hxjt4M2.png[/img][/center][/divbox]

[divbox=white][br][/br][center]DEATH INVESTIGATION REPORT[/center]
[hr][/hr]

[center][b]A. WRITTEN REPORT[/b][/center]

[list=none][color=transparent]spacer[/color]
The County Coroner's Office has been called regarding the decease that occurred at the location of [b]${placeOfDeath}[/b]. Upon receiving the call from[b] ${departmentFullName(department)}[/b], Coroner's Office dispatched a ${jobClassification} to the crime scene to conduct an investigation on the [b]${dateTime}[/b].

The ${jobClassification}, [b]${coronerName}[/b], Serial Number[b] ${serialNumber}[/b], arrived at the scene and identified the individual as[b] ${decedentName}[/b], who was pronounced dead at [b]${pronouncedTimeOfDeath}[/b]. Following an initial investigation, The ${jobClassification} came up with the following [b]synopsis[/b]: ${synopsis}

Based on the information gathered from the scene investigation and the decedent's medical history (if available), the probable cause of death was determined to be [b]${probableCauseOfDeath}[/b]. The manner of death was classified as [b]${mannerOfDeath}[/b].
[/list]

[list=none][color=transparent]spacer[/color][center][b]B. PHOTOGRAPHIC DOCUMENTARY RECORD[/b][/center]

[divbox=transparent][center][color=Black][size=85][b][u]SCENE PHOTOGRAPHY[/u][/b][/size][/center][/color][hr][/hr]
${scenePhotosBBCode}
[/divbox]

[divbox=transparent][center][color=Black][size=85][b][u](( OUT OF CHARACTER ))[/u][/b][/size][/center][/color][hr][/hr]
[size=75] This section clarifies whether or not if the player was character killed or player killed. 
In this case the player was; ${typeOfDeath}[/size]

[morgue screen, cinjuries, cdna links: 
${additionalImagesBBCode}
[/divbox]
[center][b]C. STATEMENT[/b][/center]

[divbox=transparent][center][size=85]As a ${jobClassification}, I have made detailed notes of my findings and conclusions, and these notes are available for review if necessary. However, I must note that these notes do not contain any personal opinions and are solely based on the evidence and facts available to me.

In conclusion, I hope that this report provides the necessary information required for the agency to move forward with any necessary actions. Please let me know if you require any additional information or if I can be of further assistance.

I certify that the information contained in this report is true and accurate to the best of my knowledge and belief. I have reviewed the report and ensured that all information included is complete and accurate. [/size][/divbox]

[center][b]D. PRIVACY AND CONFIDENTIALITY[/b][/center]

[divbox=transparent][center][size=85]This document from the Forensic Medicine and Pathology Department of Pillbox Hill Medical Center certifies the authenticity of the information contained within. Any unauthorized distribution or use of this information is in violation of the Health Insurance Portability and Accountability Act (HIPAA), as well as state and federal privacy laws, including but not limited to the San Andreas Confidentiality of Medical Information Act (CMIA) and the San Andreas Information Practices Act (IPA).

It is imperative that all parties handling this document respect the privacy and confidentiality of the decedent and their family. Any violation of these laws may result in legal action being taken against the responsible parties.

This document is provided for official purposes only and is not to be construed as legal advice or medical diagnosis. If additional information or clarification is needed, please contact the Forensic Medicine and Pathology Department of Pillbox Hill Medical Center.[/size][/divbox]`;

        return bbCode;
    };

    const generateTitle = () => {
        const { typeOfDeath, decedentName, decedentOOC, dateTime } = formData;
        const date = new Date(dateTime).toLocaleDateString('en-US');
        return `[${typeOfDeath}] ${decedentName} ((${decedentOOC})) - ${date}`;
    };

    return (
        <div className="App">
            <div className="container">
                <div className="form-container">
                    <h1>PHMC Email Generator</h1>
                    <button type="button" onClick={() => {
                        const title = generateTitle();
                        navigator.clipboard.writeText(title).then(() => {
                            window.open('https://phmc.gta.world/posting.php?mode=post&f=267', '_blank');
                        });
                    }}>
                        Create Death Investigation Topic
                    </button>
                    <form>
                        <label>
                            Job Classification:
                            <select name="jobClassification" value={formData.jobClassification} onChange={handleChange} required>
                                <option value="Forensic Attendant">Forensic Attendant</option>
                                <option value="Coroner Investigator">Coroner Investigator</option>
                                <option value="Medical Examiner">Medical Examiner</option>
                            </select>
                        </label>
                        <label>
                            Type of Death:
                            <select name="typeOfDeath" value={formData.typeOfDeath} onChange={handleChange} required>
                                <option value="CK">CK</option>
                                <option value="PK">PK</option>
                            </select>
                        </label>
                        <label>
                            Decedent's Name ((OOC)):
                            <input type="text" name="decedentOOC" value={formData.decedentOOC} onChange={handleChange} placeholder="John Snow" required />
                        </label>
                        <label>
                            Place of Death:
                            <input type="text" name="placeOfDeath" value={formData.placeOfDeath} onChange={handleChange} placeholder="Mirror Park" required />
                        </label>
                        <label>
                            Department:
                            <select name="department" value={formData.department} onChange={handleChange} required>
                                <option value="" disabled>Select Department</option>
                                <option value="LSFD">LSFD</option>
                                <option value="LSPD">LSPD</option>
                                <option value="LSSD">LSSD</option>
                                <option value="PHMC">PHMC</option>
                                <option value="SANFIRE">SANFIRE</option>
                                <option value="SADCR">SADCR</option>
                                <option value="LSGOV">LSGOV</option>
                                <option value="911 Call">Emergency 911 Dispatch</option>
                            </select>
                        </label>
                        <label>
                            Date and Time:
                            <input type="datetime-local" name="dateTime" value={formData.dateTime} onChange={handleChange} required />
                        </label>
                        <label>
                            Coroner's Name:
                            <input type="text" name="coronerName" value={formData.coronerName} onChange={handleChange} placeholder="Anne Carter" required />
                        </label>
                        <label>
                            Badge Number: ((/badge [Your ID]))
                            <input type="text" name="serialNumber" value={formData.serialNumber} onChange={handleChange} required />
                        </label>
                        <label>
                            Decedent's Name:
                            <input type="text" name="decedentName" value={formData.decedentName} onChange={handleChange} placeholder="Jane / John Doe" required />
                        </label>
                        <label>
                            Pronounced Time of Death:
                            <input type="datetime-local" name="pronouncedTimeOfDeath" value={formData.pronouncedTimeOfDeath} onChange={handleChange} required />
                        </label>
                        <label>
                            Synopsis:
                            <textarea name="synopsis" value={formData.synopsis} onChange={handleChange} rows="4" required></textarea>
                        </label>
                        <label>
                            Probable Cause of Death:
                            <input type="text" name="probableCauseOfDeath" value={formData.probableCauseOfDeath} onChange={handleChange} required />
                        </label>
                        <label>
                            Manner of Death:
                            <select name="mannerOfDeath" value={formData.mannerOfDeath} onChange={handleChange} required>
                                <option value="Natural">Natural</option>
                                <option value="Accident">Accident</option>
                                <option value="Suicide">Suicide</option>
                                <option value="Homicide">Homicide</option>
                                <option value="Undetermined">Undetermined</option>
                            </select>
                        </label>
                        <label>
                            Scene Photos Links (comma-separated):
                            <textarea name="scenePhotos" value={formData.scenePhotos} onChange={handleChange} rows="2" required></textarea>
                        </label>
                        <label>
                            Morgue Screen, Cinjuries, CDNA Links (comma-separated):
                            <textarea name="additionalImages" value={formData.additionalImages} onChange={handleChange} rows="2" required></textarea>
                        </label>
                    </form>
                </div>
                <div className="output-container">
                    <h2>Generated BBCode</h2>
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
            </div>
        </div>
    );
}

const Footer = () => {
    return (
        <footer style={footerStyle}>
            <div style={containerStyle}>
                <p>This is a site hosted on GitHub, the developer is Fr0sty | For uses for Pillbox Hill Medical Center. This website does not collect any personal information.</p>
            </div>
        </footer>
    );
};

const footerStyle = {
    backgroundColor: '#282c34',
    padding: '20px 0',
    color: 'white',
    textAlign: 'center',
};

const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
};

export default App;
